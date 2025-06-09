import React, { useContext, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Box, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import Iconify from 'src/components/iconify';
import { ToastContext } from 'src/context/ToastContext';
import { useGetCurrentUserQuery, useUpdateProfileMutation } from 'src/redux/endpoints/profile';
import { ProfileValidation } from 'src/logic/Validation/profileValidation';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const { showToast } = useContext(ToastContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data: currentInfo, isLoading: currentUserLoading, refetch } = useGetCurrentUserQuery();
  const [updateProfile, { data, isLoading, isSuccess, error, isError }] = useUpdateProfileMutation();

  const { controller, displayError } = new ProfileValidation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: yupErrors },
  } = controller();

  React.useEffect(() => {
    if (error) {
      console.log('error: ', error);
      displayError(error)
    }
  }, [error])

  const onSubmit = async (values) => {
    const { confirmPassword, ...rest } = values;
    updateProfile(rest);
  };

  // -----------------------------------------------------------------------

  React.useEffect(() => {
    if (currentInfo) {
      reset(currentInfo);
    }
  }, [currentInfo])

  React.useEffect(() => {
    if (data) {
      showToast('Successfully updated', 'success')
      refetch()
    }
  }, [data])


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Profile</Typography>
      </Stack>

      <Card sx={{ p: 3 }}>
        <form method="POST" onSubmit={handleSubmit(onSubmit)} style={{ width: `100%` }}>
          <Stack spacing={3}>

            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('name')}
              label="Name"
              {...InputErrorAttributes({ inputName: 'name', yupError: yupErrors })}
            />

            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              type="email"
              {...register('email')}
              label="Email"
              {...InputErrorAttributes({ inputName: 'email', yupError: yupErrors })}
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
            <TextField
              name="password_confirmation"
              {...{ ...register('password_confirmation') }}
              {...{ ...InputErrorAttributes({ inputName: 'password_confirmation', yupError: yupErrors }) }}
              label={"Confirm Password"}
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button disabled={isLoading || currentUserLoading} variant='contained' type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
