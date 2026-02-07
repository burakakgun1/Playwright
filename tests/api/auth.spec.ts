import { test, expect } from '@playwright/test';

test.describe('API Authentication Tests', () => {
    let accessToken: string;

    // 1. Get Token (Before All)
    test.beforeAll(async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: 'test@example.com',
                password: 'password123'
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        accessToken = body.accessToken;
        expect(accessToken).toBeTruthy();
    });

    // Login Testleri
    test('Given valid credentials, when login is called, then returns access token', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: 'test@example.com',
                password: 'password123'
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.accessToken).toBeDefined();
    });

    test('Given invalid password, when login is called, then returns 401 Unauthorized', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: 'test@example.com',
                password: 'wrongpassword'
            }
        });
        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.error).toBe('Wrong email or password');
    });

    test('Given missing body, when login is called, then returns 401 Unauthorized', async ({ request }) => {
        const response = await request.post('/api/login', {
            data: {
                email: 'test@example.com'
            }
        });
        expect(response.status()).toBe(401);
    });

    // Protected Endpoint Testleri (/api/dashboard)
    test('Given no token, when dashboard is requested, then returns 401 Unauthorized', async ({ request }) => {
        const response = await request.get('/api/dashboard');
        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.error).toContain('Unauthorized');
    });

    test('Given invalid token, when dashboard is requested, then returns 403 Forbidden', async ({ request }) => {
        const response = await request.get('/api/dashboard', {
            headers: {
                'Authorization': 'Bearer invalid_token_123'
            }
        });
        expect(response.status()).toBe(403);
        const body = await response.json();
        expect(body.error).toContain('Forbidden');
    });

    test('Given valid token, when dashboard is requested, then returns 200 OK and data', async ({ request }) => {
        const response = await request.get('/api/dashboard', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.message).toBe('Dashboard data');
        expect(body.user.email).toBe('test@example.com');
    });
});
