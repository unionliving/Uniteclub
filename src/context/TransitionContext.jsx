import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext();

export function useTransitionNavigate() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionNavigate must be used within a TransitionProvider');
  }
  return context;
}

export function TransitionProvider({ children }) {
  const navigate = useNavigate();

  const transitionTo = (url, options) => {
    if (typeof url === 'number') {
      navigate(url);
    } else {
      navigate(url, options);
    }
  };

  return (
    <TransitionContext.Provider value={transitionTo}>
      {children}
    </TransitionContext.Provider>
  );
}
