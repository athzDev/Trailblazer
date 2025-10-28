import { redirect } from 'next/navigation';

export default function TripRedirect({ params }: { params: { id: string } }) {
  redirect(`/app/trips/${params.id}/overview`);
}
