import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
    // 1. Get Authorization header
    const authHeader = request.headers.get('authorization');

    // 2. Check if header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Unauthorized: Missing or invalid token' },
            { status: 401 }
        );
    }

    // 3. Extract token
    const token = authHeader.split(' ')[1];

    // 4. Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
        return NextResponse.json(
            { error: 'Forbidden: Invalid or expired token' },
            { status: 403 }
        );
    }

    // 5. Success
    return NextResponse.json({
        message: 'Dashboard data',
        user: decoded
    });
}
