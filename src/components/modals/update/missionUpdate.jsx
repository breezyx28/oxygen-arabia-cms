import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { Stack, TextField } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { useAllMissionsQuery, useGetMissionQuery, useUpdateMissionMutation } from 'src/redux/endpoints/missions';

import { UpdateMissionValidation } from 'src/logic/Validation/update/missionValidation';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function MissionUpdateModal({ id }) {
  const [open, setOpen] = React.useState(false);

  const [updateMission, { data, isLoading, isSuccess, error, isError }] = useUpdateMissionMutation();
  const { data: missions, isLoading: missionsLoading } = useGetMissionQuery({
    id
  });

  const { refetch } = useAllMissionsQuery();

  const { controller, displayError } = new UpdateMissionValidation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: yupErrors },
  } = controller();

  const onSubmit = async (values) => {
    console.log('form-values: ', values);
    updateMission(values);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (isSuccess) {
      console.log('data');
      refetch()
      handleClose();
    }
  }, [data]);

  React.useEffect(() => {
    if (missions) {
      console.log('missions: ', missions);

      reset(missions);
    }
  }, [missions])


  return (
    <React.Fragment>
      <span style={{ width: '100%' }} onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
        Edit
      </span>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Mission Section
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
        <DialogContent dividers sx={{ width: `100%` }}>
          <form method="POST" onSubmit={handleSubmit(onSubmit)} style={{
            width: `100%`,
          }}>
            <Stack spacing={3}>

              <TextField
                fullWidth
                {...register('title')}
                label="Title"
                {...InputErrorAttributes({ inputName: 'title', yupError: yupErrors })}
              />
              <TextField
                fullWidth
                {...register('description')}
                label="Description"
                {...InputErrorAttributes({ inputName: 'description', yupError: yupErrors })}
              />
            </Stack>
            <Button
              type="submit"
              id="mission-form"
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
              document.getElementById('mission-form').click();
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