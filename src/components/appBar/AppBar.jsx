import { AppWrapper, AppBarLink } from './AppBar.styled';
import { AuthNav } from '../authNav';
import { UserMenu } from '../userMenu';
import { useAuth } from 'hooks/useAuth';

export const AppBar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <AppWrapper>
        <AppBarLink to={'/'}>
          <h1>Phonebook</h1>
        </AppBarLink>
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </AppWrapper>
    </>
  );
};
