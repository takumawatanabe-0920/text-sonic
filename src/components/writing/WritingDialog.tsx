import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

interface WritingDialogProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

const WritingDialog: React.FC<WritingDialogProps> = (props) => {
  const { open, handleClose, handleOpen } = props;

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

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
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <ButtonsContainer>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleOpen}>
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
