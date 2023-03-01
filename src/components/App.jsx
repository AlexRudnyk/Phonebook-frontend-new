import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import { LoginPage } from 'pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { ContactsPage } from 'pages/contactsPage';

export const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ContactsPage />} redirectTo="login" />
            <Route path="signup" element={<RegisterPage />} redirectTo="/" />
            <Route path="login" element={<LoginPage />} redirectTo="/" />
          </Route>
        </Routes>
      </div>
    </>
  );
};
