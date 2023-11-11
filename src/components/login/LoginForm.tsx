import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Container from '~/components/parts/common/Container';
import { ROUTER_PATH } from '~/constants/router-path';
import { useUser } from '~/hooks/api/user';
import { getCurrentUser, loginByEmail } from '~/lib/api/user';

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { mutateUser, user, isLoading } = useUser({
    isRequiredAuth: false,
  });
  const router = useRouter();
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
      router.push(ROUTER_PATH.HOME);
    } catch (e) {
      alert('Login failed. Please check your email and password.');
    }
  });

  useEffect(() => {
    if (user && !isLoading) {
      router.push(ROUTER_PATH.HOME);
    }
  }, [user, isLoading]);

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="email"
                type="email"
                {...register('email', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                label="password"
                type="password"
                {...register('password', { required: true })}
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
            continue
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={ROUTER_PATH.PASSWORD_RESET} variant="body2">
                forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
