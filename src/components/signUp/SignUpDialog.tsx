import { Dialog } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toastMessage from '~/components/parts/toast/ToastMessage';
import { SignUpForm } from '~/components/signUp/SignUpForm';
import { useUser } from '~/hooks/api/user';
import { getCurrentUser, signUpByEmail } from '~/lib/api/user';

type FormData = {
  email: string;
  password: string;
};

type SignUpDialogProps = {
  afterSignUpAction?: () => void;
  openSignUpModal: boolean;
  closeSignUpModalHandler: () => void;
  handleMoveLogin: () => void;
};

const SignUpDialog: React.FC<SignUpDialogProps> = (props) => {
  const {
    openSignUpModal,
    afterSignUpAction,
    closeSignUpModalHandler,
    handleMoveLogin,
  } = props;
  const { mutateUser, user, isLoading } = useUser({
    isRequiredAuth: false,
  });
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data: FormData) => {
    const { email, password } = data;
    try {
      await signUpByEmail({ email, password });
      const user = await getCurrentUser();
      await mutateUser(user, false);
      closeSignUpModalHandler();
      if (afterSignUpAction) {
        afterSignUpAction();
      }
      toastMessage({
        type: 'success',
        message: 'success to sign up.',
      });
    } catch (e) {
      console.error(e);
      toastMessage({
        type: 'error',
        message: 'failed to sign up.',
      });
    }
  });

  useEffect(() => {
    if (user && !isLoading) {
      closeSignUpModalHandler();
    }
  }, [user, isLoading, closeSignUpModalHandler]);

  return (
    <Dialog open={openSignUpModal}>
      <div style={{ margin: '20px' }}>
        <SignUpForm
          onSubmit={onSubmit}
          register={register}
          isValid={isValid}
          handleMoveLogin={handleMoveLogin}
        />
      </div>
    </Dialog>
  );
};

export default SignUpDialog;
