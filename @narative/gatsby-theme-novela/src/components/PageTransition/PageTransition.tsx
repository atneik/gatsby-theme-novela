import React from 'react';
import styled from '@emotion/styled';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return <TransitionContainer>{children}</TransitionContainer>;
};

export default PageTransition;

const TransitionContainer = styled.div`
  animation: fade-in 300ms var(--ease-in-out-quad) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
