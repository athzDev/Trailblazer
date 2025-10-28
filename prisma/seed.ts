import { PrismaClient } from '@prisma/client';
import { addDays, addHours } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst({
    where: { email: 'demo@trailblazer.app' },
  });

  if (existing) {
    console.info('Seed data already exists. Skipping.');
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: 'demo@trailblazer.app',
      name: 'Demo Traveler',
      image: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0',
    },
  });

  const baseTrips = [
    {
      title: 'Paris Getaway',
      destination: ['Paris', 'France'],
      start: addDays(new Date(), 14),
      end: addDays(new Date(), 20),
      currency: 'EUR',
      travelers: 2,
      coverUrl:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Kyoto Autumn Escape',
      destination: ['Kyoto', 'Japan'],
      start: addDays(new Date(), 60),
      end: addDays(new Date(), 68),
      currency: 'JPY',
      travelers: 1,
      coverUrl:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    },
  ];

  for (const trip of baseTrips) {
    const createdTrip = await prisma.trip.create({
      data: {
        ownerId: user.id,
        ...trip,
      },
    });

    const days = await Promise.all(
      Array.from({ length: 3 }).map((_, idx) =>
        prisma.day.create({
          data: {
            tripId: createdTrip.id,
            date: addDays(createdTrip.start, idx),
          },
        })
      )
    );

    for (const [index, day] of days.entries()) {
      await prisma.activity.createMany({
        data: [
          {
            dayId: day.id,
            title: 'Breakfast at local cafe',
            start: addHours(day.date, 9),
            end: addHours(day.date, 10),
            tags: ['food'],
            order: 0,
          },
          {
            dayId: day.id,
            title: index === 0 ? 'City walking tour' : 'Museum visit',
            start: addHours(day.date, 11),
            end: addHours(day.date, 13),
            tags: ['culture'],
            order: 1,
          },
          {
            dayId: day.id,
            title: 'Dinner reservation',
            start: addHours(day.date, 19),
            end: addHours(day.date, 21),
            tags: ['food'],
            order: 2,
          },
        ],
      });

      await prisma.place.createMany({
        data: [
          {
            tripId: createdTrip.id,
            name: 'Iconic Landmark',
            lat: 48.8584,
            lon: 2.2945,
            category: 'sight',
          },
          {
            tripId: createdTrip.id,
            name: 'Local Bistro',
            lat: 48.8566,
            lon: 2.3522,
            category: 'food',
          },
        ],
      });

      await prisma.expense.createMany({
        data: [
          {
            tripId: createdTrip.id,
            title: 'Hotel night',
            amountCents: 22000,
            currency: createdTrip.currency,
            category: 'lodging',
            date: day.date,
          },
          {
            tripId: createdTrip.id,
            title: 'Dinner',
            amountCents: 8000,
            currency: createdTrip.currency,
            category: 'food',
            date: day.date,
          },
        ],
      });

      await prisma.packingItem.createMany({
        data: [
          { tripId: createdTrip.id, label: 'Passport', suggested: true },
          { tripId: createdTrip.id, label: 'Comfortable shoes', suggested: true },
          { tripId: createdTrip.id, label: 'Camera', suggested: false },
        ],
      });
    }
  }

  console.info('Seed data generated.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
