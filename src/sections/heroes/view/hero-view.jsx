import React, { useContext, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import { Grid, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ToastContext } from 'src/context/ToastContext';
import IframeModal from 'src/components/iframe/IframeModal';
import FileUploadInput from 'src/components/Inputs/FileUploadInput';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { useLastHeroQuery, useUpdateHeroMutation } from 'src/redux/endpoints/hero';
import { HeroValidation } from 'src/logic/Validation/heroValidation';

// ----------------------------------------------------------------------


export default function HeroPage() {
  const { showToast } = useContext(ToastContext);
  const [updateHero, { data, isLoading, isSuccess, error, isError }] = useUpdateHeroMutation();
  const { data: lastHero, isLoading: lastHeroLoading, refetch } = useLastHeroQuery()

  const { controller, displayError } = new HeroValidation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors: yupErrors },
  } = controller();

  const onSubmit = async (values) => {
    let getDataOnly = {
      ...values
    }

    console.log('getDataOnly: ', getDataOnly);


    if (getDataOnly?.id) {
      updateHero({ id: getDataOnly?.id, body: getDataOnly });
    } else {
      showToast('Please provide or wait for the data to load')
    }
  };

  // -----------------------------------------------------------------------

  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = "https://oxygenarabia.com"; // Replace with your desired URL

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    if (error) {
      console.log('error: ', error);
      displayError(error)
    }
  }, [error])

  React.useEffect(() => {
    if (lastHero) {
      reset(lastHero);
      setValue('image', '')
      setValue('sm_img', '')
    }
  }, [lastHero])

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

  // watch((value) => console.log('watch-value: ', value)
  // )

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        <Stack direction="column" alignItems="start" justifyContent="space-between">
          <Typography variant="h4">Home</Typography>
          <Typography variant="caption" color="textSecondary" mt={2}>
            The Home section is the landing page of the website. Here you can update the hero section content.
          </Typography>
        </Stack>

        <Button variant="contained" onClick={handleOpenModal} color="error" startIcon={<Iconify icon="fluent:live-24-filled" />}>
          Live
        </Button>
        <IframeModal
          open={modalOpen}
          onClose={handleCloseModal}
          src={iframeUrl}
          title="Contacts Iframe"
        />
      </Stack>
      <Card sx={{ p: 3 }}>
        <form method="POST" onSubmit={handleSubmit(onSubmit)} style={{ width: `100%` }}>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              {/* Section 1 Images */}
              <Grid item xs={12} sm={6} md={6}>
                {lastHero?.image && (
                  <FileUploadInput
                    // {...register('image')}
                    label={'Change Image'}
                    name={'image'}
                    title={'Image'}
                    setValue={setValue}
                    showUrl={lastHero?.image}
                    error={{
                      ...InputErrorAttributes({ inputName: 'image', yupError: yupErrors }),
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                {lastHero?.sm_img && (
                  <FileUploadInput
                    // {...register('sm_img')}
                    label={'Change small screen image'}
                    name={'sm_img'}
                    title={'Small Image'}
                    setValue={setValue}
                    showUrl={lastHero?.sm_img}
                    error={{
                      ...InputErrorAttributes({ inputName: 'sm_img', yupError: yupErrors }),
                    }}
                  />
                )}
              </Grid>

            </Grid>

            {/* Hero Section */}
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('title')}
              label="Title"
              {...InputErrorAttributes({ inputName: 'title', yupError: yupErrors })}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('subtitle')}
              label="Subtitle"
              {...InputErrorAttributes({ inputName: 'subtitle', yupError: yupErrors })}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('button_text')}
              label="Button Text"
              {...InputErrorAttributes({ inputName: 'button_text', yupError: yupErrors })}
            />



            <Button disabled={isLoading || lastHeroLoading} variant='contained' type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}