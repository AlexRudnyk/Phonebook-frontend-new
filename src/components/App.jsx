import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout';
import { LoginPage } from 'pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { ContactsPage } from 'pages/contactsPage';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/operations';
import { PrivateRoute } from './privateRoute/PrivateRoute';
import { RestrictedRoute } from './restrictedRoute/RestrictedRoute';

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute component={ContactsPage} redirectTo="login" />
              }
            />
            <Route
              path="signup"
              element={
                <RestrictedRoute component={RegisterPage} redirectTo="/" />
              }
            />
            <Route
              path="login"
              element={<RestrictedRoute component={LoginPage} redirectTo="/" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    )
  );
};
