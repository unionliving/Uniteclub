import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollRestoration() {
  const location = useLocation();
  const navType = useNavigationType();
  const scrollPositions = useRef({}); 
  
  const lastPathname = useRef(location.pathname);
  const lastScrollY = useRef(0);

  // Set browser's native scroll restoration to manual
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Track scroll position continuously
  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle page transitions and restore/reset scroll positions
  useEffect(() => {
    const isDetailPage = 
      location.pathname.startsWith('/event/') || 
      location.pathname.startsWith('/pillar/') ||
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname === '/forgot-password' ||
      location.pathname === '/verify-email';

    // 1. Save scroll position of the previous page
    if (lastPathname.current !== location.pathname) {
      scrollPositions.current[lastPathname.current] = lastScrollY.current;
    }

    // 2. Handle active tab click (same path click)
    const isSamePath = location.pathname === lastPathname.current;
    if (isSamePath && (navType === 'PUSH' || navType === 'REPLACE')) {
      scrollPositions.current[location.pathname] = 0;
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      lastScrollY.current = 0;
      return () => clearTimeout(timer);
    }

    // 3. Determine target scroll position
    let targetScroll = 0;
    if (!isDetailPage) {
      const savedPosition = scrollPositions.current[location.pathname];
      if (savedPosition !== undefined) {
        targetScroll = savedPosition;
      }
    }

    // 4. Perform the scroll
    const timer = setTimeout(() => {
      window.scrollTo(0, targetScroll);
    }, 50);

    // 5. Update refs for next change
    lastPathname.current = location.pathname;
    lastScrollY.current = targetScroll;

    return () => clearTimeout(timer);
  }, [location.pathname, location.key, navType]);

  return null;
}
