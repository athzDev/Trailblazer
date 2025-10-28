import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { reorderActivities } from '@/lib/itinerary';

export async function POST(request: NextRequest, { params }: { params: { tripId: string } }) {
  const body = await request.json();
  const { dayId, fromIndex, toIndex } = body as { dayId: string; fromIndex: number; toIndex: number };
  if (!dayId) {
    return NextResponse.json({ error: 'Missing dayId' }, { status: 400 });
  }
  const day = await prisma.day.findFirst({
    where: { id: dayId, tripId: params.tripId },
    include: { activities: { orderBy: { order: 'asc' } } },
  });
  if (!day) return NextResponse.json({ error: 'Day not found' }, { status: 404 });

  const reordered = reorderActivities(day.activities, fromIndex, toIndex);
  await Promise.all(
    reordered.map((activity) =>
      prisma.activity.update({
        where: { id: activity.id },
        data: { order: activity.order },
      })
    )
  );
  return NextResponse.json({ success: true });
}
