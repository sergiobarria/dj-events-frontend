import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

import { API_URL } from '@/config/index';

interface IReqBody {
  username: string;
  email: string;
  password: string;
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const bodyContent: IReqBody = req.body;
    const { username, email, password } = bodyContent;

    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // Set cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      );

      res.status(200).json({
        user: data.user,
      });
    } else {
      res.status(data.statusCode).json({
        message: data.message[0].messages[0].message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
};

export default login;
