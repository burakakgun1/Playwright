import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <header>
        <h1>Emlak Otomasyon - CI Test</h1>
        <nav>
          {/* Matches page.getByRole('link', { name: 'Giriş Yap' }) */}
          <Link href="/login" data-testid="login-link">Giriş Yap</Link>
        </nav>
      </header>
      <section>
        <h2>Hayalinizdeki Evi Keşfedin</h2>
        <p>En iyi kiralık ve satılık gayrimenkuller.</p>
      </section>
    </main>
  );
}
