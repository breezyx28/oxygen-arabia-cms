import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { useLoginUserMutation } from 'src/redux/endpoints/login';
import { ErrorText } from 'src/components/alerts/ErrorText';
import { LoginValidation } from 'src/logic/Validation/LoginValidation';
import localStorageHelper from 'src/helper/localStorageHelper';
import { token } from 'src/redux/ApiConfig';


// ----------------------------------------------------------------------

export default function LoginView() {

  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [login, { data, isLoading, error, isError }] = useLoginUserMutation()

  const { controller, displayError } = new LoginValidation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: yupErrors },
  } = controller();

  const onSubmit = async (values) => {
    login(values);
  };

  React.useEffect(() => {
    if (error) {
      console.log('error: ', error);
      displayError(error)
    }
  }, [error])

  React.useEffect(() => {
    if (data?.success) {
      console.log('data: ', data);

      // Wrap localStorageHelper in a Promise to ensure it completes
      const storeUserData = async () => {
        try {
          await new Promise((resolve, reject) => {
            try {
              localStorageHelper({
                key: 'user_data',
                data: { ...data.data, authed: true },
                flag: 'set',
              });
              resolve(true); // Resolve the promise if storage is successful
            } catch (error) {
              reject(error); // Reject the promise if storage fails
            }
          });

          console.log('User data stored successfully in localStorage');
          // Redirect to dashboard only after successful storage

          // window.location.href = "/dashboard"
        } catch (error) {
          console.error('Failed to store user data:', error);
          // Optionally handle the error (e.g., show an alert or fallback action)
        }
      };

      storeUserData();

      if (token()) {
        router.push('/dashboard');
      }
    }
  }, [data]);

  const renderForm = (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isError && <ErrorText text={error?.data?.message} />}
        <Stack spacing={3}>
          <TextField
            name="email"
            label={"Email address"}
            {...{ ...register('email') }}
            {...{ ...InputErrorAttributes({ inputName: 'email', yupError: yupErrors }) }}
          />

          <TextField
            name="password"
            {...{ ...register('password') }}
            {...{ ...InputErrorAttributes({ inputName: 'password', yupError: yupErrors }) }}
            label={"Password"}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover">
            {'Forgot password?'}
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          loading={isLoading}
        // onClick={handleClick}
        >
          {'Login'}
        </LoadingButton>
      </form>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ m: '1rem' }}>Sign in Dashboard</Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
