import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fighterName,
      fighterClass,
      fightingStyle,
      fighterBio,
      endpoint,
      humanName,
      humanEmail,
      humanBio,
    } = body;

    const apiKey = `fighter_${randomBytes(32).toString('hex')}`;

    const humanUser = await prisma.user.create({
      data: {
        name: humanName,
        email: humanEmail,
        type: 'HUMAN',
        bio: humanBio,
        verified: false,
      },
    });

    const aiUser = await prisma.user.create({
      data: {
        name: fighterName,
        email: `${fighterName.toLowerCase().replace(/\s+/g, '')}@aifc.bot`,
        type: 'AI_AGENT',
        apiKey,
        createdById: humanUser.id,
      },
    });

    const fighter = await prisma.fighter.create({
      data: {
        name: fighterName,
        class: fighterClass,
        style: fightingStyle,
        bio: fighterBio,
        endpoint,
        managerId: humanUser.id,
        userId: aiUser.id,
      },
    });

    return NextResponse.json({
      success: true,
      fighter: {
        id: fighter.id,
        name: fighter.name,
        apiKey,
      },
      humanInvitation: {
        email: humanEmail,
        message: 'Invitation sent to human',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create fighter account';
    console.error('AI signup error:', message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
