import { formatISO } from 'date-fns';
import { Activity, Trip } from '@prisma/client';

export function buildIcs(trip: Trip & { activities: Activity[] }) {
  const events = trip.activities
    .map((activity) => {
      if (!activity.start || !activity.end) return null;
      return `BEGIN:VEVENT\nSUMMARY:${escapeText(activity.title)}\nDTSTART:${formatDate(activity.start)}\nDTEND:${formatDate(activity.end)}\nEND:VEVENT`;
    })
    .filter(Boolean)
    .join('\n');

  return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Trailblazer//Travel Planner//EN\n${events}\nEND:VCALENDAR`;
}

function formatDate(date: Date) {
  return formatISO(date).replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeText(text: string) {
  return text.replace(/\\n/g, '\\n').replace(/,/g, '\\,');
}
