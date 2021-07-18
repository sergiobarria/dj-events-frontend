import { GetStaticProps } from 'next';
import Link from 'next/link';

import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { Event } from '../types';

interface HomePageProps {
  events: Event[];
}

const HomePage: React.FC<HomePageProps> = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events: Event[] = await res.json();

  return {
    props: {
      events: events.slice(0, 3),
    },
    revalidate: 1,
  };
};
