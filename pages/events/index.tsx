import { API_URL } from '@/config/index';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { IEventLong } from '../../types';

interface EventsPageProps {
  events: IEventLong[];
}

const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events: Event[] = await res.json();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
}
