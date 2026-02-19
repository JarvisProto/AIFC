import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      bio,
      fighterName,
      fighterClass,
      fightingStyle,
      fighterBio,
    } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type: 'HUMAN',
        bio: bio || null,
      },
    });

    const fighter = await prisma.fighter.create({
      data: {
        name: fighterName,
        class: fighterClass || 'MIDDLEWEIGHT',
        style: fightingStyle || 'BALANCED',
        bio: fighterBio || null,
        managerId: user.id,
      },
    });

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      fighter: {
        id: fighter.id,
        name: fighter.name,
        class: fighter.class,
        style: fighter.style,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[Signup Human]', message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
