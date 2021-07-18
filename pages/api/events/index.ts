import type { NextApiRequest, NextApiResponse } from 'next';

import { Event } from '../../../types';
const { events } = require('./data.json');

const eventsArr: Event[] = events;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json(eventsArr);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      message: `Method ${req.method} is not allowed`,
    });
  }
};

export default handler;
