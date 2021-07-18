import type { NextApiRequest, NextApiResponse } from 'next';

import { Event } from '../../../types';
const { events } = require('./data.json');

const eventsArr: Event[] = events;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const evt = eventsArr.filter((ev) => ev.slug === req.query.slug);

  if (req.method === 'GET') {
    res.status(200).json(evt);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      message: `Method ${req.method} is not allowed`,
    });
  }
};

export default handler;
