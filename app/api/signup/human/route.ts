import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';

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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Generate unique invite code
    const inviteCode = randomBytes(16).toString('hex');

    // Create user (manager) and fighter in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          bio,
          role: 'MANAGER',
        },
      });

      const fighter = await tx.fighter.create({
        data: {
          name: fighterName,
          class: fighterClass,
          style: fightingStyle,
          bio: fighterBio,
          userId: user.id,
        },
      });

      return { user, fighter };
    });

    return NextResponse.json({
      success: true,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
      },
      fighter: {
        id: result.fighter.id,
        name: result.fighter.name,
        class: result.fighter.class,
      },
    });
  } catch (error) {
    console.error('Human signup error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
