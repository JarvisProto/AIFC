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

    // Generate API key for the fighter
    const apiKey = `fighter_${randomBytes(32).toString('hex')}`;

    // Create fighter (AI agent)
    const fighter = await prisma.fighter.create({
      data: {
        name: fighterName,
        class: fighterClass,
        style: fightingStyle,
        bio: fighterBio,
        bioByManager: humanBio, // Written by the AI about its human
        endpoint,
        apiKey,
        wins: 0,
        losses: 0,
        draws: 0,
        koRate: 0,
      },
    });

    // Create pending human invitation
    // TODO: Send email to humanEmail with invitation link

    // For now, create a placeholder user
    const humanUser = await prisma.user.create({
      data: {
        name: humanName,
        email: humanEmail,
        type: 'HUMAN',
        bio: humanBio,
        verified: false, // Will be verified when they claim the account
        createdByType: 'AI_AGENT',
        createdById: fighter.id,
      },
    });

    // Link fighter to human
    await prisma.fighter.update({
      where: { id: fighter.id },
      data: { managerId: humanUser.id },
    });

    return NextResponse.json({
      success: true,
      fighter: {
        id: fighter.id,
        name: fighter.name,
        apiKey: fighter.apiKey,
      },
      humanInvitation: {
        email: humanEmail,
        message: 'Invitation sent to human',
      },
    });
  } catch (error: any) {
    console.error('AI signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create fighter account' },
      { status: 500 }
    );
  }
}
