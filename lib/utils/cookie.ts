import { NextResponse, NextRequest } from 'next/server';


export const setCookie = (res: NextResponse, name: string, value: string, options = {}) => {
  res.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    ...options,
  });
};


export const getCookie = (req: NextRequest, name: string) => {
  return req.cookies.get(name);
};

export const clearCookie = (res: NextResponse, name: string) => {
  res.cookies.delete(name);
};
