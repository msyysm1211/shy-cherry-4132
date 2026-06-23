export const metadata = {
  title: 'PCG Test — Next.js 14',
  description: 'Next.js 14 compatibility test for pages-cache-gateway',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <strong>PCG Test — Next.js 14</strong>
          <nav style={{ marginTop: '0.5rem' }}>
            <a href="/">Home</a> | <a href="/about">About</a> |{' '}
            <a href="/dynamic">Dynamic</a> | <a href="/blog">Blog</a> |{' '}
            <a href="/ppr-test">PPR</a> | <a href="/image-test">Image</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
