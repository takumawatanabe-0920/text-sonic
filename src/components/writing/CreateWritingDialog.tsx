import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import toastMessage from '~/components/parts/toast/ToastMessage';
import { useUser } from '~/hooks/api/user';
import { useWritings } from '~/hooks/api/writing';
import { createWriting, getWritings } from '~/lib/api/writing';

interface WritingDialogProps {
  open: boolean;
  handleClose: () => void;
  userId?: string | undefined;
}

type FormData = {
  title: string;
  description: string;
};

const CreateWritingDialog: React.FC<WritingDialogProps> = (props) => {
  const { open, handleClose, userId } = props;
  const { mutate: mutateWritings } = useWritings({ userId });
  const { user } = useUser({ isRequiredAuth: false });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data: FormData) => {
    const { title, description } = data;
    try {
      await createWriting({ title, description });
      toastMessage({
        type: 'success',
        message: 'success to create script.',
      });
      const __writings = await getWritings({ userId: user?.id });
      await mutateWritings(__writings, false);
      handleClose();
    } catch (error) {
      console.error({ error });
      if (error instanceof Error) {
        toastMessage({
          type: 'error',
          message: error.message || 'failed to create script.',
        });
      }
    }
  });

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogInnerContainer>
        <DialogHeader>
          <DialogTitle id="form-dialog-title" style={{ padding: 0 }}>
            Create Script
          </DialogTitle>
          <CloseButton onClick={handleClose}>
            <Close color="inherit" />
          </CloseButton>
        </DialogHeader>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                label="title *"
                type="title"
                {...register('title', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                label="description *"
                type="description"
                multiline
                rows={10}
                {...register('description', { required: true })}
              />
            </Grid>
          </Grid>
          <CareInfo>
            * Less than 1000 characters. Around 150 ~ 200 words. <br />
            * When using specialized words, there is a risk that the transcript
            may not generate correctly. <br />
            ex. café {`->`} coffee <br />
          </CareInfo>
          <ButtonsContainer>
            <StyledButton
              color="error"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </StyledButton>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isValid}
            >
              Submit
            </Button>
          </ButtonsContainer>
        </Box>
      </DialogInnerContainer>
    </Dialog>
  );
};

const CareInfo = styled.div`
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const DialogInnerContainer = styled.div`
  padding: 16px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  padding: 16px 0;
  // leftによせる
  margin-left: auto;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-right: 10px !important;
`;

export default CreateWritingDialog;
