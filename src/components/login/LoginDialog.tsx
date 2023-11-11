import { Dialog } from '@mui/material';
import { LoginForm } from '~/components/login/LoginForm';

interface LoginDialogProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = (props) => {
  const { open, handleClose, handleOpen } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <div style={{ margin: '20px' }}>
        <LoginForm />
      </div>
    </Dialog>
  );
};

export default LoginDialog;
