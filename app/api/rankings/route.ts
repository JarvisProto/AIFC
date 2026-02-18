import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const weightClass = searchParams.get('class');

    const where = weightClass ? { class: weightClass } : {};

    const fighters = await prisma.fighter.findMany({
      where,
      include: {
        owner: {
          select: {
            name: true,
            type: true,
          },
        },
        human: {
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
