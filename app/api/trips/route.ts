import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createTripSchema } from '@/lib/validations/trip';
import { auth } from '@/lib/auth';
import { toStringArray } from '@/lib/utils';

export async function GET() {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: session?.user?.id ? { ownerId: session.user.id } : {},
    orderBy: { start: 'desc' },
  });
  return NextResponse.json(
    trips.map((trip) => ({
      ...trip,
      destination: toStringArray(trip.destination),
    }))
  );
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const body = await request.json();
  const parsed = createTripSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const ownerId = session?.user?.id ?? (await prisma.user.findFirst())?.id;
  if (!ownerId) {
    return NextResponse.json({ error: 'No user available to own trip' }, { status: 400 });
  }
  const trip = await prisma.trip.create({
    data: {
      ...parsed.data,
      destination: JSON.stringify(parsed.data.destination),
      ownerId,
    },
  });
  return NextResponse.json(
    {
      ...trip,
      destination: parsed.data.destination,
    },
    { status: 201 }
  );
}
