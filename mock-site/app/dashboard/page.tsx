'use client';

import { useState } from 'react';

export default function DashboardPage() {
    const [actionTaken, setActionTaken] = useState(false);

    return (
        <div style={{ padding: '2rem' }}>
            <h1 data-testid="welcome-message">Hoşgeldin</h1>

            {!actionTaken ? (
                <button
                    data-testid="action-btn"
                    onClick={() => setActionTaken(true)}
                    style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
                >
                    Aksiyon Al
                </button>
            ) : (
                <div
                    data-testid="success-message"
                    style={{ color: 'green', marginTop: '1rem', fontWeight: 'bold' }}
                >
                    İşlem Başarılı
                </div>
            )}
        </div>
    );
}
