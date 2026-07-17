import '../index.css';
import '../mock-styles.css';

import { TransitionProvider } from '../context/TransitionContext';
import Layout from '../components/Layout';
import IntroVideo from '../components/IntroVideo';

import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
});

export const metadata = {
  metadataBase: new URL('https://www.uniteclub.in'),
  title: 'Uniteclub | Exclusive Events, Workshops & Community by Union Living',
  description: "Unlock a year of unforgettable experiences. Join Uniteclub for exclusive access to curated parties, creator-led workshops, wellness events, and a vibrant community.",
  icons: {
    icon: '/Unite-logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>
        <TransitionProvider>
            <IntroVideo />
            <Layout>
              {children}
            </Layout>
        </TransitionProvider>
      </body>
    </html>
  );
}
