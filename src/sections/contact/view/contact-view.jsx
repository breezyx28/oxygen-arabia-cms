import React, { useContext, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useCreateContactMutation, useLastContactQuery, useUpdateContactMutation } from 'src/redux/endpoints/contacts';
import ContactModal from 'src/components/modals/forms/contact';
import { ContactValidation } from 'src/logic/Validation/contactValidation';
import convertToFormData from 'src/helper/ConvertToFormData';
import { Box, Grid, TextField } from '@mui/material';
import FileUploadInput from 'src/components/Inputs/FileUploadInput';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import IframeModal from 'src/components/iframe/IframeModal';
import Iconify from 'src/components/iconify';
import { ToastContext } from 'src/context/ToastContext';

// ----------------------------------------------------------------------

export default function ContactsPage() {
  const { showToast } = useContext(ToastContext);

  const { data: lastContact, isLoading: contactLoading, refetch } = useLastContactQuery();
  const [contact, { data, isLoading, isSuccess, error, isError }] = useUpdateContactMutation();

  const { controller, displayError } = new ContactValidation();
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
    let converted = { id: lastContact?.id, ...values };
    contact(converted);
  };

  // -----------------------------------------------------------------------

  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = "https://oxygenarabia.com/contact-us"; // Replace with your desired URL

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    if (lastContact) {
      reset(lastContact);
    }
  }, [lastContact])

  React.useEffect(() => {
    if (data) {
      showToast('Successfully updated', 'success')
      refetch()
    }
  }, [data])


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        <Stack direction="column" alignItems="start" justifyContent="space-between">
          <Typography variant="h4">Contacts</Typography>
          <Typography variant="caption" color="textSecondary" mt={2}>
            Update your contact information here.
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

            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('address')}
              label="Address"
              {...InputErrorAttributes({ inputName: 'address', yupError: yupErrors })}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              type="tel"
              {...register('phone')}
              label="Phone"
              {...InputErrorAttributes({ inputName: 'phone', yupError: yupErrors })}
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

            <Button disabled={isLoading || contactLoading} variant='contained' type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
