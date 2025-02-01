/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: { userId: string }; // Or define user type more precisely
  }
}
