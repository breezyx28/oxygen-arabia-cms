import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import { Grid, TextField, Box, FormControlLabel, Switch } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ToastContext } from 'src/context/ToastContext';
import IframeModal from 'src/components/iframe/IframeModal';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import { objectToFormData } from 'src/utils/objectToFormData';
import { removeStringFileKeys } from 'src/utils/removeStringFileKeys';
import { Controller } from 'react-hook-form';
import SectionTitle from 'src/components/Inputs/SectionTitle';
import SingleFileUpload from 'src/components/Inputs/SingleFileUpload';
import MultiInputs from 'src/components/Inputs/MultiInputs';
import { FormValidation } from 'src/logic/Validation/formValidation';
import { useCreateFormMutation, useLastFormQuery, useUpdateFormMutation } from 'src/redux/endpoints/form';
import ErrorsAlert from 'src/components/ServerErrorAlert';

// ----------------------------------------------------------------------

export default function FormComponent() {
    const { showToast } = useContext(ToastContext);
    const [updateForm, { data, isLoading, isSuccess, error, isError }] = useUpdateFormMutation();
    const [addForm, { data: createdData, isLoading: creating, isSuccess: isItSuccessfulyCreated, error: creationError, isError: isCreateError }] = useCreateFormMutation();
    const { data: lastForm, isLoading: lastFormLoading, refetch } = useLastFormQuery()

    const { controller, displayError } = new FormValidation();
    const {
        register,
        handleSubmit: FormSubmitHandler,
        ServerErrorAlert,
        reset,
        setValue,
        watch,
        control,
        formState: { errors: yupErrors },
    } = controller();

    const onSubmitForm = async (values) => {

        const excludedData = [
            'form_person_img',
        ];

        console.log('values: ', values);

        if (!lastFormLoading) {
            if (lastForm) {
                let newFiltered = removeStringFileKeys(excludedData, values)
                console.log('after-filter: ', newFiltered);

                updateForm({ id: lastForm?.id, body: objectToFormData(newFiltered) });
            } else {
                addForm(objectToFormData(values));
            }
        } else {
            showToast('Please wait for the data to load')
        }
    };

    React.useEffect(() => {
        // ----------
        reset({ page_name: 'Main' })
        // ----------
    }, [])
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
        if (lastForm) {
            reset(lastForm);
            console.log('last-form: ', lastForm);
        }
    }, [lastForm])

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
                    <Typography variant="h4">Form</Typography>
                    <Typography variant="caption" color="textSecondary" mt={2}>
                        Fill this form with it's relative page to be connected to.
                    </Typography>
                </Stack>
            </Stack>
            <ErrorsAlert errors={[error, creationError]} />
            <form id="form-form" method="POST" onSubmit={FormSubmitHandler(onSubmitForm)} style={{ width: `100%` }}>
                <Stack spacing={5}>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 3 }}>Form Section</Typography>
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

                        <Grid container spacing={2}>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    disabled
                                    value={'Main'}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    // {...register('page_name')}
                                    label="Page Name"
                                    {...InputErrorAttributes({ inputName: 'page_name', yupError: yupErrors })}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    {...register('form_header_title')}
                                    label="Header Title"
                                    {...InputErrorAttributes({ inputName: 'form_header_title', yupError: yupErrors })}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    {...register('form_person_qoute')}
                                    label="Person Qoute"
                                    {...InputErrorAttributes({ inputName: 'form_person_qoute', yupError: yupErrors })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    {...register('form_person_name')}
                                    label="Person Name"
                                    {...InputErrorAttributes({ inputName: 'form_person_name', yupError: yupErrors })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    {...register('form_person_position')}
                                    label="Person Position"
                                    {...InputErrorAttributes({ inputName: 'form_person_position', yupError: yupErrors })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>

                                <TextField
                                    fullWidth
                                    select
                                    label="Type"
                                    // value={'rtl'}
                                    {...register('form_direction')}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    {...InputErrorAttributes({ inputName: 'form_direction', yupError: yupErrors })}
                                >
                                    <option selected disabled>Select Form Direction</option>
                                    <option value="rtl">Right-To-Left</option>
                                    <option value="ltr">Left-To-Right</option>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sx={{ mb: 3 }}>
                                <SingleFileUpload
                                    label={'Change Person Image'}
                                    name={'form_person_img'}
                                    title={'Person Image'}
                                    setValue={setValue}
                                    showUrl={lastForm?.form_person_img}
                                    error={{
                                        ...InputErrorAttributes({ inputName: 'form_person_img', yupError: yupErrors }),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Card>

                    {/* First Name */}
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">First Name</Typography>
                        </Box>

                        <SectionTitle
                            title=""
                            register={register}
                            yupErrors={yupErrors}
                            titleField="input_first_name_label"
                            subtitleField="input_first_name_placeholder"
                            titleLabel="First Name Label"
                            subtitleLabel="First Name Input Placeholder"
                        />
                    </Card>

                    {/* Last Name */}
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">Last Name</Typography>
                        </Box>

                        <SectionTitle
                            title=""
                            register={register}
                            yupErrors={yupErrors}
                            titleField="input_last_name_label"
                            subtitleField="input_last_name_placeholder"
                            titleLabel="Last Name Label"
                            subtitleLabel="Last Name Input Placeholder"
                        />

                    </Card>

                    {/* Email */}
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">Email</Typography>
                        </Box>

                        <SectionTitle
                            title=""
                            register={register}
                            yupErrors={yupErrors}
                            titleField="input_email_label"
                            subtitleField="input_email_placeholder"
                            titleLabel="Email Name Label"
                            subtitleLabel="Email Name Input Placeholder"
                        />

                    </Card>

                    {/* Phone */}
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">Phone</Typography>
                        </Box>
                        <SectionTitle
                            title=""
                            register={register}
                            yupErrors={yupErrors}
                            titleField="input_phone_label"
                            subtitleField="input_phone_placeholder"
                            titleLabel="Phone Label"
                            subtitleLabel="Phone Input Placeholder"
                        />


                    </Card>

                    {/* Company */}
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">Company</Typography>
                        </Box>
                        <SectionTitle
                            title=""
                            register={register}
                            yupErrors={yupErrors}
                            titleField="input_company_name_label"
                            subtitleField="input_company_name_placeholder"
                            titleLabel="Company Name Label"
                            subtitleLabel="Company Name Placeholder"
                        />

                        <SectionTitle
                            title=""
                            register={register}
                            yupErrors={yupErrors}
                            titleField="input_company_size_label"
                            subtitleField="input_company_size_placeholder"
                            titleLabel="Company Size Label"
                            subtitleLabel="Company Size Placeholder"
                        />


                    </Card>

                    <Card sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">Most Interests</Typography>
                        </Box>

                        <TextField
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register('option_most_interested_label')}
                            label="Most Interseted Label"
                            {...InputErrorAttributes({ inputName: 'option_most_interested_label', yupError: yupErrors })}
                        />

                        <MultiInputs
                            inputLabel='Type an option'
                            addButtonText={"Add new List Option"}
                            defaultValue={lastForm?.option_most_interested_options ?? null}
                            inputName={'option_most_interested_options'}
                            setValue={setValue}
                            yupErrors={yupErrors}
                        />


                    </Card>

                    <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start', rowGap: '1rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">Button & Footer</Typography>
                        </Box>
                        <TextField
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register('form_btn_title')}
                            label="Button Title"
                            {...InputErrorAttributes({ inputName: 'form_btn_title', yupError: yupErrors })}
                        />
                        <TextField
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register('form_footer')}
                            label="Form Footer"
                            {...InputErrorAttributes({ inputName: 'form_footer', yupError: yupErrors })}
                        />
                    </Card>

                    <Button form="form-form" id="form-form-btn" disabled={isLoading || lastFormLoading} variant='contained' type="submit">
                        Update Form
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}