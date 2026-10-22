// @ts-ignore CSS imports are handled by the Next.js bundler.
import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Pwa from '../components/Pwa';

export const metadata: Metadata = {
  title: 'RideShare AAB',
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sq">
      <head />
      <body>
        <Pwa />
        {children}
      </body>
    </html>
  );
}
