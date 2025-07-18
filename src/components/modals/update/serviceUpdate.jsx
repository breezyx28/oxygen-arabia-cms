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
import { useAllServicesQuery, useCreateServiceMutation, useGetServiceQuery, useUpdateServiceMutation } from 'src/redux/endpoints/services';
import { ServiceValidation } from 'src/logic/Validation/ServiceValidation';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ServiceUpdateModal({ id }) {
    const [open, setOpen] = React.useState(false);

    const { refetch } = useAllServicesQuery()
    const { data: services, isLoading: servicesLoading } = useGetServiceQuery({
        id
    })
    const [updateService, { data, isLoading, isSuccess, error, isError }] = useUpdateServiceMutation();

    const { controller, displayError } = new ServiceValidation();
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
        updateService(values);
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
        if (services) {
            console.log('services: ', services);

            reset(services);
            //   setValue('logo', '')
        }
    }, [services])

    return (
        <React.Fragment>
            <span style={{ width: '100%' }} onClick={handleClickOpen}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                Edit
            </span>

            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Update Service Section
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
                            <TextField
                                fullWidth
                                {...{ ...register('name') }}
                                name="name"
                                label="Service name"
                                {...{ ...InputErrorAttributes({ inputName: 'name', yupError: yupErrors }) }}
                            />

                            <TextField
                                fullWidth
                                {...{ ...register('description') }}
                                name="description"
                                label="Service description"
                                {...{ ...InputErrorAttributes({ inputName: 'description', yupError: yupErrors }) }}
                            />

                            <TextField
                                fullWidth
                                {...{ ...register('page_title') }}
                                name="page_title"
                                label="Service Page  Title"
                                {...{ ...InputErrorAttributes({ inputName: 'page_title', yupError: yupErrors }) }}
                            />

                            <TextField
                                fullWidth
                                {...{ ...register('page_subtitle') }}
                                name="page_subtitle"
                                label="Service Page Subtitle"
                                {...{ ...InputErrorAttributes({ inputName: 'page_subtitle', yupError: yupErrors }) }}
                            />

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
                        Update changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export const CloseIcon = () => (
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
