import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '虎ノ門スタイル プレミアム総合病院',
  description: '誠実な医療で、皆様の明日を支える',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      {/* 
        虎ノ門 Aesthetic: base styles applied at body level. 
        antialiased and generic font tracking for a clean look. 
      */}
      <body className="bg-[#F8F9FA] text-[#003366] antialiased flex flex-col min-h-screen">

        {/* Authoritative 2-tier Global Header */}
        <Header />

        {/* Main Content Area - Full width document flow */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Authoritative Deep Navy Footer */}
        <Footer />

      </body>
    </html>
  );
}
