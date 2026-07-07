import '../index.css';
import '../mock-styles.css';
import { AuthProvider } from '../context/AuthContext';
import { TransitionProvider } from '../context/TransitionContext';
import Layout from '../components/Layout';

export const metadata = {
  title: 'Uniteclub',
  description: 'Uniteclub App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TransitionProvider>
          <AuthProvider>
            <Layout>
              {children}
            </Layout>
          </AuthProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
