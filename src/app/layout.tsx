import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppStateProvider } from '@/context/AppStateContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { GlobalSearchModal } from '@/components/layout/GlobalSearchModal';
import { EmergencyBanner } from '@/components/ui/EmergencyBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Lugari Digital Infrastructure — lugari.ke',
    template: '%s | Lugari Digital Infrastructure',
  },
  description: 'Hyperlocal digital platform connecting residents, development projects, jobs, businesses, schools, and civic infrastructure in Lugari Sub-County.',
  keywords: ['Lugari', 'Lumakanda', 'Mautuma', 'NG-CDF', 'Kakamega', 'Bursaries', 'Jobs', 'Projects'],
  openGraph: {
    title: 'Lugari Digital Infrastructure',
    description: 'Hyperlocal digital infrastructure connecting residents, projects, and opportunities in Lugari.',
    url: 'https://lugari.ke',
    siteName: 'Lugari.ke',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans antialiased">
        <AppStateProvider>
          <EmergencyBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
          <GlobalSearchModal />
        </AppStateProvider>
      </body>
    </html>
  );
}
