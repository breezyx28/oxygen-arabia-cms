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
import FileUploadInput from 'src/components/Inputs/FileUploadInput';
import convertToFormData from 'src/helper/ConvertToFormData';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { ProjectValidation } from 'src/logic/Validation/ProjectValidation';
import { useAllProjectsQuery, useCreateProjectMutation, useGetProjectQuery, useUpdateProjectMutation } from 'src/redux/endpoints/projects';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ProjectUpdateModal({ id }) {
    const [open, setOpen] = React.useState(false);

    const { refetch } = useAllProjectsQuery()
    const { data: projects, isLoading: projectsLoading } = useGetProjectQuery({
        id
    })

    const [updateProject, { data, isLoading, isSuccess, error, isError }] = useUpdateProjectMutation();

    const { controller, displayError } = new ProjectValidation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors: yupErrors },
    } = controller();

    const onSubmit = async (values) => {
        let converted = convertToFormData(values);
        updateProject({ id, body: converted });
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
        if (projects) {
            console.log('services: ', projects);

            reset(projects);
            setValue('image', '')
        }
    }, [projects])

    return (
        <React.Fragment>
            <span style={{ width: '100%' }} onClick={handleClickOpen}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                Edit
            </span>

            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Update Project Section
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

                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1} justifyContent={'center'} alignItems="center">
                                    {projects?.image && <FileUploadInput
                                        label={'Upload Project Image'}
                                        name={'image'}
                                        title={'Project Image'}
                                        setValue={setValue}
                                        error={{
                                            ...InputErrorAttributes({ inputName: 'image', yupError: yupErrors }),
                                        }}
                                        showUrl={projects?.image}
                                    />}

                                </Grid>
                            </Box>

                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={6} md={6}>
                                        <TextField
                                            fullWidth
                                            {...{ ...register('title') }}
                                            name="title"
                                            label="Project title"
                                            {...{ ...InputErrorAttributes({ inputName: 'title', yupError: yupErrors }) }}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={6}>
                                        <TextField
                                            fullWidth
                                            {...{ ...register('subtitle') }}
                                            name="subtitle"
                                            label="Project subtitle"
                                            {...{ ...InputErrorAttributes({ inputName: 'subtitle', yupError: yupErrors }) }}
                                        />

                                    </Grid>
                                </Grid>
                            </Box>

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

                        </Stack>

                        <Button
                            type="submit"
                            id="project-form"
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
                            document.getElementById('project-form').click();
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
