import React, { useContext, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ContactModal from 'src/components/modals/forms/contact';
import convertToFormData from 'src/helper/ConvertToFormData';
import { TextField } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { useLastProjectPageDetailQuery, useUpdateProjectPageDetailsMutation } from 'src/redux/endpoints/projectPageDetails';
import { ProjectPageDetailsValidation } from 'src/logic/Validation/projectPageDetailsValidation';
import IframeModal from 'src/components/iframe/IframeModal';
import { ToastContext } from 'src/context/ToastContext';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProjectPageDetailsPage() {
  const [updateProjectPageDetails, { data, isLoading, isSuccess, error, isError }] = useUpdateProjectPageDetailsMutation();

  const { showToast } = useContext(ToastContext);
  const { data: lastProjectPageDetail, isLoading: ProjectPageLoading, isSuccess: ProjectPageSuccess, error: ProjectPageError } = useLastProjectPageDetailQuery();


  const { controller, displayError } = new ProjectPageDetailsValidation();
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
    let converted = { id: lastProjectPageDetail?.id, ...values };
    updateProjectPageDetails(converted);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = "https://oxygenarabia.com/projects"; // Replace with your desired URL

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    if (lastProjectPageDetail) {
      reset(lastProjectPageDetail);
    }
  }, [lastProjectPageDetail])

  React.useEffect(() => {
    if (data) {
      showToast('Successfully updated', 'success')
    }
  }, [data])

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        <Stack direction="column" alignItems="start" justifyContent="space-between">
          <Typography variant="h4">Project Page Details</Typography>
          <Typography variant="caption" color="textSecondary" mt={2}>
            Update Project page details texts (after update click <strong>Live</strong> button to see the updates).
          </Typography>
        </Stack>
        <Button variant="contained" onClick={handleOpenModal} color="error" startIcon={<Iconify icon="fluent:live-24-filled" />}>
          Live
        </Button>
        <IframeModal
          open={modalOpen}
          onClose={handleCloseModal}
          src={iframeUrl}
          title="Project Details Iframe"
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
              {...register('title')}
              label="Panner Title"
              {...InputErrorAttributes({ inputName: 'title', yupError: yupErrors })}
            />
            <TextField
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              fullWidth
              {...register('subtitle')}
              label="Panner Subtitle"
              {...InputErrorAttributes({ inputName: 'subtitle', yupError: yupErrors })}
            />

            {/* Card */}
            <TextField
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              fullWidth
              {...register('description')}
              label="Card Title"
              {...InputErrorAttributes({ inputName: 'description', yupError: yupErrors })}
            />

            <Button variant='contained' type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
