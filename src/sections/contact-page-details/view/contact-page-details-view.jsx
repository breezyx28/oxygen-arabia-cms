import React, { useContext, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { ContactPageDetailsValidation } from 'src/logic/Validation/contactPageDetailsValidation';
import IframeModal from 'src/components/iframe/IframeModal';
import Iconify from 'src/components/iconify';
import { useLastContactPageDetailQuery, useUpdateContactPageDetailsMutation } from 'src/redux/endpoints/contactPageDetails';
import { ToastContext } from 'src/context/ToastContext';

// ----------------------------------------------------------------------

export default function ContactPageDetailsPage() {
  const { showToast } = useContext(ToastContext);

  const [updateContactDetails, { data, isLoading, isSuccess, error, isError }] = useUpdateContactPageDetailsMutation();
  const { data: lastContactPageDetail, isLoading: contactPageLoading, isSuccess: contactPageSuccess, error: contactPageError } = useLastContactPageDetailQuery();

  const { controller, displayError } = new ContactPageDetailsValidation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: yupErrors },
  } = controller();

  React.useEffect(() => {
    if (error) {
      console.log('error: ', error);
      displayError(error)
    }
  }, [error])


  const onSubmit = async (values) => {
    let converted = { id: lastContactPageDetail?.id, ...values };
    updateContactDetails(converted);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = "https://oxygenarabia.com/contact-us"; // Replace with your desired URL

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    if (lastContactPageDetail) {
      reset(lastContactPageDetail);
    }
  }, [lastContactPageDetail])

  React.useEffect(() => {
    if (data) {
      showToast('Successfully updated', 'success')
    }
  }, [data])


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        <Stack direction="column" alignItems="start" justifyContent="space-between">
          <Typography variant="h4">Contact Page Details</Typography>
          <Typography variant="caption" color="textSecondary" mt={2}>
            Update Contact page texts (after update click <strong>Live</strong> button to see the updates).
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

            {/* Hero */}
            <TextField
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              fullWidth
              {...register('hero_title')}
              label="Panner Title"
              {...InputErrorAttributes({ inputName: 'hero_title', yupError: yupErrors })}
            />
            <TextField
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              fullWidth
              {...register('hero_subtitle')}
              label="Panner Subtitle"
              {...InputErrorAttributes({ inputName: 'hero_subtitle', yupError: yupErrors })}
            />

            {/* Card */}
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('card_title')}
              label="Card Title"
              {...InputErrorAttributes({ inputName: 'card_title', yupError: yupErrors })}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('card_subtitle')}
              label="Card Subtitle"
              {...InputErrorAttributes({ inputName: 'card_subtitle', yupError: yupErrors })}
            />


            {/* Form */}
            <Grid container spacing={1} justifyContent={'center'} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This keeps the label always above the input
                  }}
                  {...register('form_firstname_label')}
                  label="Form Firstname Label"
                  {...InputErrorAttributes({ inputName: 'form_firstname_label', yupError: yupErrors })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This keeps the label always above the input
                  }}
                  {...register('form_firstname_placeholder')}
                  label="Form Firstname Placeholder"
                  {...InputErrorAttributes({ inputName: 'form_firstname_placeholder', yupError: yupErrors })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} justifyContent={'center'} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This keeps the label always above the input
                  }}
                  {...register('form_lastname_label')}
                  label="Form lastname Label"
                  {...InputErrorAttributes({ inputName: 'form_lastname_label', yupError: yupErrors })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This keeps the label always above the input
                  }}
                  {...register('form_lastname_placeholder')}
                  label="Form lastname Placeholder"
                  {...InputErrorAttributes({ inputName: 'form_lastname_placeholder', yupError: yupErrors })}
                />
              </Grid>
            </Grid>


            <Grid container spacing={1} justifyContent={'center'} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This keeps the label always above the input
                  }}
                  {...register('form_email_label')}
                  label="Form Email Label"
                  {...InputErrorAttributes({ inputName: 'form_email_label', yupError: yupErrors })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This keeps the label always above the input
                  }}
                  {...register('form_email_placeholder')}
                  label="Form Email Placeholder"
                  {...InputErrorAttributes({ inputName: 'form_email_placeholder', yupError: yupErrors })}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} justifyContent={'center'} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This keeps the label always above the input
                  }}
                  {...register('form_message_label')}
                  label="Form Message Label"
                  {...InputErrorAttributes({ inputName: 'form_message_label', yupError: yupErrors })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This keeps the label always above the input
                  }}
                  {...register('form_message_placeholder')}
                  label="Form Message Placeholder"
                  {...InputErrorAttributes({ inputName: 'form_message_placeholder', yupError: yupErrors })}
                />
              </Grid>
            </Grid>


            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('form_button_text')}
              label="Form Button Text"
              {...InputErrorAttributes({ inputName: 'form_button_text', yupError: yupErrors })}
            />


            <Button disabled={isLoading || contactPageLoading} variant='contained' type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
