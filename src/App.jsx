import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import OurStory from './pages/OurStory';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import Pillar from './pages/Pillar';
import EventDetail from './pages/EventDetail';
import Membership from './pages/Membership';
import CurtainLoader from './components/CurtainLoader';
import ScrollRestoration from './components/ScrollRestoration';
import { AuthProvider } from './context/AuthContext';
import { TransitionProvider } from './context/TransitionContext';
import './index.css';
import './mock-styles.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <ScrollRestoration />
      {loading && <CurtainLoader onComplete={() => setLoading(false)} />}
      <TransitionProvider>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/pillar/:id" element={<Pillar />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/membership" element={<Membership />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
