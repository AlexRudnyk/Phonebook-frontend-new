import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import { AuthForm } from 'components/authForm';

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleRegister = values => {
    dispatch(register(values));
  };

  return <AuthForm onSubmit={handleRegister} btnText={'Signup'} />;
};
