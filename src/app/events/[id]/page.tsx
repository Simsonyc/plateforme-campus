import EventDetailPage from '../../../interfaces/web/features/EventDetailPage';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventDetailPage eventId={id} />;
}