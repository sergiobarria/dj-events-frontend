import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { parseCookies } from 'helpers';
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify';

import { IEventLong } from 'types';
import styles from '@/styles/DashboardEvent.module.css';
import DashboardEvent from '@/components/DashoardEvent';

interface IDashboardProps {
  events: IEventLong[];
  token: string;
}

const DashboardPage: React.FC<IDashboardProps> = ({ events, token }) => {
  const router = useRouter();

  const deleteEvent = async (id: number) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My events</h3>
        <ToastContainer />

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events: IEventLong[] = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
};
