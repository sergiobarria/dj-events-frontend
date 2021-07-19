import { GetServerSideProps } from 'next';

import { API_URL, PER_PAGE } from '@/config/index';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { IEventLong } from '../../types';
import Pagination from '@/components/Pagination';

interface EventsPageProps {
  events: IEventLong[];
  page: number;
  total: number;
}

const EventsPage: React.FC<EventsPageProps> = ({ events, page, total }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
};

export default EventsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page || 1;
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events: Event[] = await eventRes.json();

  return {
    props: {
      events,
      page: +page,
      total,
    },
  };
};
