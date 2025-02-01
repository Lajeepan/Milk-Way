// src/app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from '../../lib/utils/cookie';
import { verifyToken } from '../../lib/utils/jwt';

const ROLE_ACCESS: { [key: string]: string[] } = {
  '/admin': ['admin'],
  '/seller': ['seller', 'admin'],
  '/buyer': ['buyer', 'seller', 'admin'],
};

export function middleware(req: NextRequest) {
  const token = getCookie(req, 'token') as unknown as string;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const verified = verifyToken(token) as { role: string };

  if (!verified) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Check if the user has the correct role for the requested path
  const requiredRoles = ROLE_ACCESS[url.pathname];
  if (requiredRoles && !requiredRoles.includes(verified.role)) {
    url.pathname = '/unauthorized'; // Redirect to an unauthorized page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
