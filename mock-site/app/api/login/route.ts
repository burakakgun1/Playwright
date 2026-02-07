import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    console.log(`[API] Login attempt: ${email} / ***`);

    // Valid admin credentials (email format supported)
    if ((email === 'admin' || email === 'admin@example.com' || email === 'test@example.com') &&
        (password === '123456' || password === 'password123')) {

        // Generate JWT Token
        const token = signToken({ email });

        return NextResponse.json({
            success: true,
            accessToken: token
        });
    }

    // Default to failure for any other credentials (including random ones)
    return NextResponse.json(
        { error: 'Wrong email or password' },
        { status: 401 }
    );
}
