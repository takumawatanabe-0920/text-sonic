import { Dialog } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '~/components/login/LoginForm';
import toastMessage from '~/components/parts/toast/ToastMessage';
import { useUser } from '~/hooks/api/user';
import { getCurrentUser, loginByEmail } from '~/lib/api/user';

type FormData = {
  email: string;
  password: string;
};

type LoginDialogProps = {
  isRequiredAuth: boolean;
  afterLoginAction?: () => void;
  handleMoveSignUp: () => void;
};

const LoginDialog: React.FC<LoginDialogProps> = (props) => {
  const { isRequiredAuth, afterLoginAction, handleMoveSignUp } = props;
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
      if (afterLoginAction) {
        afterLoginAction();
      }
      toastMessage({
        type: 'success',
        message: 'success to login.',
      });
    } catch (e) {
      console.error(e);
      toastMessage({
        type: 'error',
        message: 'failed to login.',
      });
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
        <LoginForm
          onSubmit={onSubmit}
          register={register}
          isValid={isValid}
          handleMoveSignUp={handleMoveSignUp}
        />
      </div>
    </Dialog>
  );
};

export default LoginDialog;
