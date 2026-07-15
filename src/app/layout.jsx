import '../index.css';
import '../mock-styles.css';
import { AuthProvider } from '../context/AuthContext';
import { TransitionProvider } from '../context/TransitionContext';
import Layout from '../components/Layout';
import IntroVideo from '../components/IntroVideo';

export const metadata = {
  title: 'Uniteclub',
  description: 'Uniteclub App',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TransitionProvider>
          <AuthProvider>
            <IntroVideo />
            <Layout>
              {children}
            </Layout>
          </AuthProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
