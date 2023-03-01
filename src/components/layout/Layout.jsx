import { AppBar } from 'components/appBar/AppBar';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Container } from './Layout.stayled';

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <Container>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Container>
    </div>
  );
};
