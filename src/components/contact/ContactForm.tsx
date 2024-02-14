import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import Container from '~/components/parts/common/Container';
import toastMessage from '~/components/parts/toast/ToastMessage';
import { useUser } from '~/hooks/api/user';
import { createContact } from '~/lib/api/contact';

type FormData = {
  email: string;
  name: string;
  description: string;
};

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>();
  const { user } = useUser({ isRequiredAuth: false });

  const onSubmit = handleSubmit(async (data: FormData) => {
    const { email, name, description } = data;
    try {
      await createContact({ email, name, description });
      toastMessage({
        type: 'success',
        message: 'success to create contact.',
      });
      reset();
    } catch (error) {
      console.error({ error });
      if (error instanceof Error) {
        toastMessage({
          type: 'error',
          message: error.message || 'failed to create contact.',
        });
      }
    }
  });

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ mt: 3, width: '100%' }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                label="name *"
                type="text"
                {...register('name', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="email *"
                type="email"
                defaultValue={user?.email || ''}
                {...register('email', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                label="description *"
                type="text"
                multiline
                rows={10}
                {...register('description', { required: true })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
