import { AuthForm } from 'components/authForm';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export const LoginPage = () => {
  const handleLogin = async values => {};

  return (
    <>
      <AuthForm onSubmit={handleLogin} btnText={'Login'} />
      <Link to="signup">Don't have an account? Please, sign up</Link>
    </>
  );
};
