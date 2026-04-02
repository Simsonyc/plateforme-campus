import SessionProvider from '../interfaces/web/components/SessionProvider';
import NavBar from '../interfaces/web/components/NavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>
        <SessionProvider>
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}