import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createTripSchema } from '@/lib/validations/trip';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: session?.user?.id ? { ownerId: session.user.id } : {},
    orderBy: { start: 'desc' },
  });
  return NextResponse.json(trips);
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
      ownerId,
    },
  });
  return NextResponse.json(trip, { status: 201 });
}
