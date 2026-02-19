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

    // Generate invite code for fighter
    const inviteCode = randomBytes(16).toString('hex');

    // Create manager and fighter
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        bio,
        type: 'HUMAN',
        fighters: {
          create: {
            name: fighterName,
            class: fighterClass,
            style: fightingStyle,
            bio: fighterBio,
            inviteCode,
          },
        },
      },
      include: {
        fighters: true,
      },
    });

    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      fighter: user.fighters[0],
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
