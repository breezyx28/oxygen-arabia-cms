import React, { useContext, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import convertToFormData from 'src/helper/ConvertToFormData';
import { Box, Grid, TextField } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import FileUploadInput from 'src/components/Inputs/FileUploadInput';
import { AboutPageDetailsValidation } from 'src/logic/Validation/aboutPageDetailsValidation';
import IframeModal from 'src/components/iframe/IframeModal';
import { useLastAboutPageDetailQuery, useUpdateAboutPageDetailsMutation } from 'src/redux/endpoints/aboutPageDetails';
import Iconify from 'src/components/iconify';
import { ToastContext } from 'src/context/ToastContext';

// ----------------------------------------------------------------------



export default function AboutPageDetailsPage() {
  const { showToast } = useContext(ToastContext);
  const [about, { data, isLoading, isSuccess, error, isError }] = useUpdateAboutPageDetailsMutation();
  const { data: lastAboutPageDetail, isLoading: lastAboutLoading, refetch } = useLastAboutPageDetailQuery()

  const { controller, displayError } = new AboutPageDetailsValidation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: yupErrors },
  } = controller();

  const onSubmit = async (values) => {
    let getDataOnly = {
      ...values,
      section_1_img_1: values?.section_1_img_1 ? values?.section_1_img_1 : null,
      section_1_img_2: values?.section_1_img_2 ? values?.section_1_img_2 : null,
      section_1_img_3: values?.section_1_img_3 ? values?.section_1_img_3 : null,
      section_2_img: values?.section_2_img ? values?.section_2_img : null
    }

    if (getDataOnly?.id) {
      about({ id: getDataOnly?.id, body: getDataOnly });
    } else {
      showToast('Please provide or wait for the data to load')
    }
  };

  // -----------------------------------------------------------------------

  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = "https://oxygenarabia.com/about-us"; // Replace with your desired URL

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
    if (lastAboutPageDetail) {
      reset(lastAboutPageDetail);
    }
  }, [lastAboutPageDetail])

  React.useEffect(() => {
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
          <Typography variant="h4">About Page Details</Typography>
          <Typography variant="caption" color="textSecondary" mt={2}>
            About page details were you can update the content of the page.
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
              <Grid item xs={12} sm={6} md={3}>
                {lastAboutPageDetail?.section_1_img_1 && (
                  <FileUploadInput
                    // {...register('section_1_img_1')}
                    label={'Change Section 1 Image 1'}
                    name={'section_1_img_1'}
                    title={'Section 1 Image 1'}
                    setValue={setValue}
                    showUrl={lastAboutPageDetail?.section_1_img_1}
                    error={{
                      ...InputErrorAttributes({ inputName: 'section_1_img_1', yupError: yupErrors }),
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                {lastAboutPageDetail?.section_1_img_2 && (
                  <FileUploadInput
                    // {...register('section_1_img_2')}
                    label={'Change Section 1 Image 2'}
                    name={'section_1_img_2'}
                    title={'Section 1 Image 2'}
                    setValue={setValue}
                    showUrl={lastAboutPageDetail?.section_1_img_2}
                    error={{
                      ...InputErrorAttributes({ inputName: 'section_1_img_2', yupError: yupErrors }),
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                {lastAboutPageDetail?.section_1_img_3 && (
                  <FileUploadInput
                    // {...register('section_1_img_3')}
                    label={'Change Section 1 Image 3'}
                    name={'section_1_img_3'}
                    title={'Section 1 Image 3'}
                    setValue={setValue}
                    showUrl={lastAboutPageDetail?.section_1_img_3}
                    error={{
                      ...InputErrorAttributes({ inputName: 'section_1_img_3', yupError: yupErrors }),
                    }}
                  />
                )}
              </Grid>

              {/* Section 2 Image */}
              <Grid item xs={12} sm={6} md={3}>
                {lastAboutPageDetail?.section_2_img && (
                  <FileUploadInput
                    // {...register('section_2_img')}
                    label={'Change Section 2 Image'}
                    name={'section_2_img'}
                    title={'Section 2 Image'}
                    setValue={setValue}
                    showUrl={lastAboutPageDetail?.section_2_img}
                    error={{
                      ...InputErrorAttributes({ inputName: 'section_2_img', yupError: yupErrors }),
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
              {...register('hero_title')}
              label="Panner Title"
              {...InputErrorAttributes({ inputName: 'hero_title', yupError: yupErrors })}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('hero_subtitle')}
              label="Panner Subtitle"
              {...InputErrorAttributes({ inputName: 'hero_subtitle', yupError: yupErrors })}
            />

            {/* Section 1 */}
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('section_1_title')}
              label="Section 1 Title"
              {...InputErrorAttributes({ inputName: 'section_1_title', yupError: yupErrors })}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('section_1_description')}
              label="Section 1 Description"
              {...InputErrorAttributes({ inputName: 'section_1_description', yupError: yupErrors })}
            />

            {/* Section 2 Part 1 */}
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('section_2_part_1_title')}
              label="Section 2 Part 1 Title"
              {...InputErrorAttributes({ inputName: 'section_2_part_1_title', yupError: yupErrors })}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('section_2_part_1_description')}
              label="Section 2 Part 1 Description"
              {...InputErrorAttributes({ inputName: 'section_2_part_1_description', yupError: yupErrors })}
            />

            {/* Section 2 Part 2 */}
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('section_2_part_2_title')}
              label="Section 2 Part 2 Title"
              {...InputErrorAttributes({ inputName: 'section_2_part_2_title', yupError: yupErrors })}
            />
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true, // This keeps the label always above the input
              }}
              {...register('section_2_part_2_description')}
              label="Section 2 Part 2 Description"
              {...InputErrorAttributes({ inputName: 'section_2_part_2_description', yupError: yupErrors })}
            />

            <Button disabled={isLoading || lastAboutLoading} variant='contained' type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}