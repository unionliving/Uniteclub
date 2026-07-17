import '../index.css';
import '../mock-styles.css';

import { TransitionProvider } from '../context/TransitionContext';
import Layout from '../components/Layout';
import IntroVideo from '../components/IntroVideo';

import { Playfair_Display, Montserrat } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  metadataBase: new URL('https://www.uniteclub.in'),
  title: "Unite Club | Exclusive Events, Workshops & Member Benefits Across India",
    description: "Discover Unite, a premium membership offering exclusive events, creative workshops, wellness experiences and member-only brand rewards across India's leading cities."
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
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
