'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                // Matches page.locator('text=/wrong email or password|hatalı|invalid/i')
                setError(data.error || 'Login failed');
            } else {
                alert('Giriş Başarılı!');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block' }}>Email:</label>
                    {/* Matches input[name="email"] */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        data-testid="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block' }}>Şifre:</label>
                    {/* Matches input[name="password"] */}
                    <input
                        type="password"
                        id="password"
                        name="password"
                        data-testid="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '0.5rem' }}
                    />
                </div>
                {/* Matches button[type="submit"] */}
                <button type="submit" data-testid="submit-btn" style={{ padding: '0.5rem 1rem' }}>Giriş Yap</button>
            </form>

            {error && (
                <div data-testid="error-message" style={{ color: 'red', marginTop: '1rem' }}>
                    {error}
                </div>
            )}
        </div>
    );
}
