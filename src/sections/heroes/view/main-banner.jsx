import React, { useContext, useState, lazy } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import { Grid, TextField, Box, FormControlLabel, Switch, Alert, Collapse } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ToastContext } from 'src/context/ToastContext';
import IframeModal from 'src/components/iframe/IframeModal';
import FileUploadInput from 'src/components/Inputs/FileUploadInput';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { useLastMainQuery, useUpdateMainMutation, useCreateMainMutation } from 'src/redux/endpoints/main';
import { MainValidation } from 'src/logic/Validation/mainValidation';
import { objectToFormData } from 'src/utils/objectToFormData';
import { removeStringFileKeys } from 'src/utils/removeStringFileKeys';
import { Controller } from 'react-hook-form';
import ServerErrorAlert from 'src/components/ServerErrorAlert';

// Import reusable components
import SectionTitle from '../components/SectionTitle';
import { useCreateBannerMutation, useLastBannerQuery, useUpdateBannerMutation } from 'src/redux/endpoints/banner';
import { BannerValidation } from 'src/logic/Validation/bannerValidation';

// ---------------------------------------------------------------------

export default function BannerPage() {
  const { showToast } = useContext(ToastContext);
  const [updateBanner, { data, isLoading, isSuccess, error, isError }] = useUpdateBannerMutation();
  const [addBanner, { data: createdData, isLoading: creating, isSuccess: isItSuccessfulyCreated, error: creationError, isError: isCreateError }] = useCreateBannerMutation();
  const { data: lastBanner, isLoading: lastBannerLoading, refetch } = useLastBannerQuery()

  const { controller, displayError } = new BannerValidation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors: yupErrors },
  } = controller();

  const onSubmit = async (values) => {


    console.log('getDataOnly: ', values);

    if (!lastBannerLoading) {
      if (lastBanner) {
        updateBanner({ id: lastBanner?.id, body: values });
      } else {
        addBanner(values);
      }
    } else {
      showToast('Please wait for the data to load')
    }
  };

  // -----------------------------------------------------------------------
  React.useEffect(() => {
    if (yupErrors) {
      console.log('yup-errors: ', yupErrors);
    }
  }, [yupErrors])

  React.useEffect(() => {
    if (creationError) {
      console.log('server-errors: ', creationError);

    }
  }, [creationError])

  // -----------------------------------------------------------------------

  React.useEffect(() => {
    if (error) {
      console.log('error: ', error);
      displayError(error)
      ServerErrorAlert(error)
    }
  }, [error])

  React.useEffect(() => {
    // ----------
    reset({ banner_page: 'Main' })
    // ----------
  }, [])

  React.useEffect(() => {
    if (error) {
      console.log('error: ', error);
      displayError(error)
    }
  }, [error])

  React.useEffect(() => {
    if (lastBanner) {
      reset(lastBanner);
      console.log('last-banner: ', lastBanner);

    }
  }, [lastBanner])

  React.useEffect(() => {
    console.log('data: ', data);

    if (data?.success === true) {
      console.log('data: ', data);
      showToast('Successfully updated', 'success')
      refetch()
    } else {
      console.log('data: ', data);
      showToast(data?.message, 'error')
    }
  }, [data])

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Banner Section</Typography>
        </Stack>
        <ServerErrorAlert errors={[error, creationError]} />
        <form id="form-banner" method="POST" onSubmit={handleSubmit(onSubmit)} style={{ width: `100%` }}>
          <Stack spacing={5}>

            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Banner</Typography>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={value === undefined ? true : !!value}
                          onChange={(e) => {
                            onChange(e.target.checked)
                            setValue('is_active', e.target.checked ? true : false)
                          }
                          }
                        />
                      }
                      label="Active"
                    />
                  )}
                />
              </Box>

              <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={12} md={12}>
                  <TextField
                    disabled
                    value={'Main'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Banner Page"
                    {...InputErrorAttributes({ inputName: 'banner_page', yupError: yupErrors })}
                  />
                </Grid>
              </Grid>

              <SectionTitle
                title="Banner Width & Height"
                register={register}
                yupErrors={yupErrors}
                titleLabel="Banner Height"
                subtitleLabel="Banner Width"
                titleField="banner_height_size"
                subtitleField="banner_width_size"
              />

              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label="Banner Content"
                  {...register('content')}
                  {...InputErrorAttributes({ inputName: 'content', yupError: yupErrors })}
                />
              </Grid>

            </Card>

            <Button form="form-banner" disabled={isLoading || lastBannerLoading} variant='contained' type="submit">
              Update Banner
            </Button>
          </Stack>
        </form>

      </Container >

      <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />

    </>
  );
}