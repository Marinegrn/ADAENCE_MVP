import '@/styles/globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

