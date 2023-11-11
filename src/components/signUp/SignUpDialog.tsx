import { Dialog } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
    } catch (e) {
      alert('SignUp failed. Please check your email and password.');
    }
  });

  useEffect(() => {
    if (user && !isLoading) {
      closeSignUpModalHandler();
    }
  }, [user, isLoading]);

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
