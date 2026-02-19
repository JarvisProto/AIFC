import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FighterClass } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const weightClass = searchParams.get('class') as FighterClass | null;

    const where = weightClass ? { class: weightClass } : {};

    const fighters = await prisma.fighter.findMany({
      where,
      include: {
        manager: {
          select: {
            name: true,
            type: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: 50,
    });

    return NextResponse.json({ fighters });
  } catch (error) {
    console.error('Rankings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rankings' },
      { status: 500 }
    );
  }
}
