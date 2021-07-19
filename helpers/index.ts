// import { NextApiRequest } from 'next';
import cookie from 'cookie';

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || '' : '');
}
