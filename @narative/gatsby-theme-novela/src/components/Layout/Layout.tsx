import React, { useEffect } from 'react';
import { WindowLocation } from '@reach/router';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { useColorMode } from 'theme-ui';

import NavigationFooter from '@components/Navigation/Navigation.Footer';
import NavigationHeader from '@components/Navigation/Navigation.Header';
import PageTransition from '@components/PageTransition/PageTransition';
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context';

import { globalStyles } from '@styles';

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
interface LayoutProps {
  children: React.ReactNode;
  location?: WindowLocation;
}

const Layout: React.FC<LayoutProps> = ({ children, location }) => {
  const [colorMode] = useColorMode();
  const pathname =
    location?.pathname ||
    (typeof window !== 'undefined' ? window.location.pathname : '');

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);

  return (
    <ArticlesContextProvider>
      <Container>
        <Global styles={globalStyles} />
        <SkipToContent href="#main-content">Skip to content</SkipToContent>
        <NavigationHeader />
        <MainContent id="main-content">
          <PageTransition key={pathname}>{children}</PageTransition>
        </MainContent>
        <NavigationFooter />
      </Container>
    </ArticlesContextProvider>
  );
}

export default Layout;

const Container = styled.div`
  position: relative;
  background: ${p => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};
  min-height: 100vh;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
`;

const SkipToContent = styled.a`
  position: absolute;
  left: 16px;
  top: 8px;
  z-index: 999;
  padding: 8px 12px;
  border-radius: 4px;
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  transform: translateY(-150%);
  transition: transform 0.2s var(--ease-in-out-quad);

  &:focus {
    transform: translateY(0);
  }
`;
