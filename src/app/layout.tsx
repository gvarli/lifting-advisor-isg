import type { Metadata, Viewport } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/i18n-context';
import { AppLayout } from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'Kaldırma Ekipmanları & İSG Mühendislik Danışmanı',
  description: 'Tüm sektörler ve saha rolleri için Çevrimdışı Öncelikli Kaldırma Ekipmanı Mühendislik Portalı',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/icon-192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#F59E0B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-[#0b0f19] text-slate-100 min-h-screen">
        <I18nProvider>
          <AppLayout>{children}</AppLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
