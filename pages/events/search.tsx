import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import qs from 'qs';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { IEventLong } from '../../types';

interface EventsPageProps {
  events: IEventLong[];
  term?: string;
}

const SearchPage: React.FC<EventsPageProps> = ({ events }) => {
  const router = useRouter();

  return (
    <Layout title='Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for: {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { term } = context.query;

  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}`);
  const events: Event[] = await res.json();

  return {
    props: {
      events,
    },
  };
};
