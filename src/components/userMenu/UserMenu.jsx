// import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/operations';
import { toast } from 'react-toastify';
import { Container, UserMenuText } from './UserMenu.styled';
import { Button } from './UserMenu.styled';

export const UserMenu = () => {
  const dispatch = useDispatch();
  // const { user } = useAuth();

  const handleLogOut = () => {
    dispatch(logout());
    toast.info('Good bye, see you next time!');
  };

  return (
    <Container>
      <UserMenuText>Welcome</UserMenuText>
      <Button type="button" onClick={handleLogOut}>
        Logout
      </Button>
    </Container>
  );
};
