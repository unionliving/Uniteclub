"use client";
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

const TransitionContext = createContext();

export function useTransitionNavigate() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionNavigate must be used within a TransitionProvider');
  }
  return context;
}

export function TransitionProvider({ children }) {
  const router = useRouter();

  const transitionTo = (url, options) => {
    if (typeof url === 'number') {
      if (url === -1) router.back();
      // other number navigations are not directly supported by useRouter, just defaulting to push for now or ignored.
    } else {
      router.push(url);
    }
  };

  return (
    <TransitionContext.Provider value={transitionTo}>
      {children}
    </TransitionContext.Provider>
  );
}
