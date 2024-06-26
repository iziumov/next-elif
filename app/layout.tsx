import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Header, Modal } from '@/components';

const roboto = Roboto({ style: ['normal'], subsets: ['cyrillic'], weight: '400' });

export const metadata: Metadata = {
  title: 'ELIF TASK',
  description: 'Elif task Events Registration App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="min-h-screen max-w-screen-xl mx-auto flex flex-col">
          <Header />
          <Modal />
          <div className="flex-grow mt-2">{children}</div>
        </div>
      </body>
    </html>
  );
}
