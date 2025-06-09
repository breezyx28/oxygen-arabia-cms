import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { Box, Grid, Stack, TextField } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { ProjectValidation } from 'src/logic/Validation/ProjectValidation';
import { useAllServicesQuery, useCreateServiceMutation } from 'src/redux/endpoints/services';
import { useCreateSubserviceMutation } from 'src/redux/endpoints/sub-services';
import { SubserviceValidation } from 'src/logic/Validation/SubserviceValidation';
import SelectInput from 'src/components/Inputs/SelectInput';
import FileUploadInput from 'src/components/Inputs/FileUploadInput';
import convertToFormData from 'src/helper/ConvertToFormData';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function SubserviceModal() {
  const [open, setOpen] = React.useState(false);
  const [selectService, setSelectService] = React.useState('');
  const [imageUpload, setImageUpload] = React.useState(null);

  const [addSubservice, { data, isLoading, isSuccess, error, isError }] = useCreateSubserviceMutation();
  const {
    data: services,
    isLoading: servicesLoading,
    isFetching: servicesIsFetching,
    isSuccess: servicesSuccess,
    error: servicesError,
    isError: servicesIsError,
  } = useAllServicesQuery({});

  const { controller, displayError } = new SubserviceValidation();
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
    let converted = convertToFormData(values);
    addSubservice(converted);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (isSuccess) {
      reset()
      handleClose();
    }
  }, [data]);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}
      >
        Create Subservice
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Subservice Section
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>


              <Grid item xs={8} md={8}>
                <SelectInput
                  {...{ ...register('service_id') }}
                  label="Select service"
                  name="service_id"
                  title="Services"
                  items={services?.data ?? [{ id: 1, name: 'Service' }]}
                  value={selectService}
                  setValue={setSelectService}
                  error={{
                    ...InputErrorAttributes({ inputName: 'service_id', yupError: yupErrors }),
                  }}
                />
              </Grid>

              <Box sx={{ flexGrow: 1, gap: 4 }}>

                <Grid container spacing={1} justifyContent={'center'} alignItems="center">
                  <FileUploadInput
                    // {...{ ...register('image') }}
                    label={'Upload Subservice Image'}
                    name={'image'}
                    title={'Subservice Image'}
                    setValue={setValue}
                    error={{
                      ...InputErrorAttributes({ inputName: 'image', yupError: yupErrors }),
                    }}
                  />
                </Grid>
              </Box>

              <TextField
                fullWidth
                {...{ ...register('title') }}
                name="title"
                label="Title"
                {...{ ...InputErrorAttributes({ inputName: 'title', yupError: yupErrors }) }}
              />

              {/* subtitle */}
              <TextField
                {...{ ...register('subtitle') }}
                fullWidth
                multiline
                maxRows={4}
                name="subtitle"
                label="Subtitle"
                {...{ ...InputErrorAttributes({ inputName: 'subtitle', yupError: yupErrors }) }}
              />

              {/* description */}
              <TextField
                {...{ ...register('description') }}
                fullWidth
                multiline
                maxRows={4}
                name="description"
                label="Description"
                {...{ ...InputErrorAttributes({ inputName: 'description', yupError: yupErrors }) }}
              />
              {/* card description */}
              <TextField
                {...{ ...register('card_description') }}
                fullWidth
                multiline
                maxRows={4}
                name="card_description"
                label="Card Description"
                {...{ ...InputErrorAttributes({ inputName: 'card_description', yupError: yupErrors }) }}
              />
              <Box sx={{ flexGrow: 1, gap: 4 }}>

                <Grid container spacing={1} justifyContent={'center'} alignItems="center">
                  <FileUploadInput
                    label={'Upload Card Image'}
                    name={'card_image'}
                    title={'Card Image'}
                    setValue={setValue}
                    error={{
                      ...InputErrorAttributes({ inputName: 'card_image', yupError: yupErrors }),
                    }}
                  />
                </Grid>
              </Box>
            </Stack>

            <Button
              type="submit"
              id="service-form"
              style={{
                display: 'none',
              }}
              autoFocus
            >
              Submit
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              document.getElementById('service-form').click();
              //   handleClose() close the modal
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

const CloseIcon = () => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="#697686"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m5 5 14 14M5 19 19 5" />
  </svg>
);
