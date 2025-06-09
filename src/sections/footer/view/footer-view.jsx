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
import { useLastFooterQuery, useUpdateFooterMutation } from 'src/redux/endpoints/footer';
import { FooterValidation } from 'src/logic/Validation/footerValidation';

// ----------------------------------------------------------------------


export default function FooterPage() {
  const { showToast } = useContext(ToastContext);
  const [updateFooter, { data, isLoading, isSuccess, error, isError }] = useUpdateFooterMutation();
  const { data: lastFooter, isLoading: lastFooterLoading, refetch } = useLastFooterQuery()

  const { controller, displayError } = new FooterValidation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: yupErrors },
  } = controller();

  const onSubmit = async (values) => {
    let getDataOnly = {
      ...values
    }

    console.log('getDataOnly: ', getDataOnly);


    if (getDataOnly?.id) {
      updateFooter({ id: getDataOnly?.id, body: getDataOnly });
    } else {
      showToast('Please provide or wait for the data to load')
    }
  };

  // -----------------------------------------------------------------------

  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = "https://oxygenarabia.com#footer"; // Replace with your desired URL

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
    if (lastFooter) {
      reset(lastFooter);
    }
  }, [lastFooter])

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
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        <Stack direction="column" alignItems="start" justifyContent="space-between">
          <Typography variant="h4">Footer</Typography>
          <Typography variant="caption" color="textSecondary" mt={2}>
            Update your footer copyrights text and date
          </Typography>
        </Stack>

        <Button variant="contained" onClick={handleOpenModal} color="error" startIcon={<Iconify icon="fluent:live-24-filled" />}>
          Live
        </Button>
        <IframeModal
          open={modalOpen}
          onClose={handleCloseModal}
          src={iframeUrl}
          title="Footer Iframe"
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
              {...register('copyrights')}
              label="Copyrights"
              {...InputErrorAttributes({ inputName: 'copyrights', yupError: yupErrors })}
            />

            <Button disabled={isLoading || lastFooterLoading} variant='contained' type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}