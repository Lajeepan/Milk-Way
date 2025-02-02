import { NextResponse } from 'next/server';
import { verifyToken } from '../utils/jwt'; // Assuming you have a verifyToken function in this path

interface DecodedToken {
  role: string;
  // Add other properties if needed
}

export const roleAuth = (requiredRoles: string[]) => async (req: Request) => {
  const token = req.headers.get('Authorization')?.split(' ')[1]; // Get the token from headers

  if (!token) {
    return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
  }

  try {
    const decoded = (await verifyToken(token)) as DecodedToken; // Decode JWT token with type casting
    if (!requiredRoles.includes(decoded.role)) {
      return NextResponse.json(
        { error: 'Access Denied. You don\'t have the necessary permissions.' },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: 'Authorized' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    console.error('Error during roleAuth:', error);
  }
};
