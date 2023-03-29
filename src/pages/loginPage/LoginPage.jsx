import { AuthForm } from 'components/authForm';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/operations';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Проверкадеплоя на гитхаб

export const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = values => {
    dispatch(login(values));
  };

  return (
    <>
      <AuthForm onSubmit={handleLogin} btnText={'Login'} />
      <Link to="/signup">Don't have an account? Please, sign up</Link>
    </>
  );
};
