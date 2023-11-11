import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import toastMessage from '~/components/parts/toast/ToastMessage';
import { createWriting } from '~/lib/api/writing';

interface WritingDialogProps {
  open: boolean;
  handleClose: () => void;
}

const WritingDialog: React.FC<WritingDialogProps> = (props) => {
  const { open, handleClose } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateWriting = async () => {
    try {
      await createWriting({ title, description });
      toastMessage({
        type: 'success',
        message: 'success to create writing.',
      });
    } catch (e) {
      console.error(e);
    } finally {
      handleClose();
      toastMessage({
        type: 'error',
        message: 'failed to create writing.',
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Register Writing</DialogTitle>
      <div style={{ margin: '20px' }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="description"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="textarea"
          fullWidth
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonsContainer>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleCreateWriting}>
            Submit
          </Button>
        </ButtonsContainer>
      </div>
    </Dialog>
  );
};

const ButtonsContainer = styled.div`
  display: flex;
  padding: 16px 0;
`;

export default WritingDialog;
