import React, { useState } from 'react';
import LoginDialog from '~/components/login/LoginDialog';
import SignUpDialog from '~/components/signUp/SignUpDialog';

type LoginManagerProps = {
  afterLoginAction: () => void;
  afterSignUpAction: () => void;
  isRequiredAuth: boolean;
};

const LoginManager: React.FC<LoginManagerProps> = (props) => {
  const { afterLoginAction, afterSignUpAction, isRequiredAuth } = props;
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const handleCloseSignUpModalHandler = () => {
    setOpenSignUpModal(false);
  };

  const handleMoveSignUp = () => {
    setOpenSignUpModal(true);
  };

  const handleMoveLogin = () => {
    setOpenSignUpModal(false);
  };

  return (
    <>
      <LoginDialog
        isRequiredAuth={isRequiredAuth}
        afterLoginAction={afterLoginAction}
        handleMoveSignUp={handleMoveSignUp}
      />
      <SignUpDialog
        afterSignUpAction={afterSignUpAction}
        openSignUpModal={openSignUpModal}
        closeSignUpModalHandler={handleCloseSignUpModalHandler}
        handleMoveLogin={handleMoveLogin}
      />
    </>
  );
};

export default LoginManager;
