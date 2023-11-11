import { Dialog } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '~/components/login/LoginForm';
import { useUser } from '~/hooks/api/user';
import { getCurrentUser, loginByEmail } from '~/lib/api/user';

type FormData = {
  email: string;
  password: string;
};

type LoginDialogProps = {
  isRequiredAuth: boolean;
  loginedAction?: () => void;
};

const LoginDialog: React.FC<LoginDialogProps> = (props) => {
  const { isRequiredAuth, loginedAction } = props;
  const {
    mutateUser,
    user,
    isLoading,
    openLoginModal,
    closeLoginModalHandler,
  } = useUser({
    isRequiredAuth,
  });
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data: FormData) => {
    const { email, password } = data;
    try {
      await loginByEmail({ email, password });
      const user = await getCurrentUser();
      await mutateUser(user, false);
      closeLoginModalHandler();
      if (loginedAction) {
        loginedAction();
      }
    } catch (e) {
      alert('Login failed. Please check your email and password.');
    }
  });

  useEffect(() => {
    if (user && !isLoading) {
      closeLoginModalHandler();
    }
  }, [user, isLoading]);

  return (
    <Dialog open={openLoginModal}>
      <div style={{ margin: '20px' }}>
        <LoginForm onSubmit={onSubmit} register={register} isValid={isValid} />
      </div>
    </Dialog>
  );
};

export default LoginDialog;
