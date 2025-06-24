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
import { useLastMainQuery, useUpdateMainMutation, useCreateMainMutation } from 'src/redux/endpoints/main';
import { MainValidation } from 'src/logic/Validation/mainValidation';
import { objectToFormData } from 'src/utils/objectToFormData';
import { removeStringFileKeys } from 'src/utils/removeStringFileKeys';

// Import reusable components
import CardInput from '../components/CardInput';
import MultiInputs from '../components/MultiInputs';
import SliderItem from '../components/SliderItem';
import SectionTitle from '../components/SectionTitle';
import ImageUpload from '../components/ImageUpload';
import SingleFileUpload from '../components/SingleFileUpload';
import MultiFileUpload from '../components/MultiFileUpload';

// ----------------------------------------------------------------------

export default function MainPage() {
  const { showToast } = useContext(ToastContext);
  const [updateMain, { data, isLoading, isSuccess, error, isError }] = useUpdateMainMutation();
  const [addMain, { data: createdData, isLoading: creating, isSuccess: isItSuccessfulyCreated, error: creationError, isError: isCreateError }] = useCreateMainMutation();
  const { data: lastMain, isLoading: lastMainLoading, refetch } = useLastMainQuery()

  const { controller, displayError } = new MainValidation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors: yupErrors },
  } = controller();

  const onSubmit = async (values) => {
    let getDataOnly = {
      ...values,
    }

    let excludedData = [
      'hero_cover',
      'hero_slider_imgs',
      'section_2_icons',
      'section_3_card_1_icon',
      'section_3_card_2_icon',
      'section_3_card_3_icon',
      'section_4_cover',
      'section_5_card_img',
      //  'section_6_slider.*.icon' // you can use this form of data
    ];

    console.log('getDataOnly: ', getDataOnly);

    if (!lastMainLoading) {
      if (lastMain) {
        let newFiltered = removeStringFileKeys(excludedData, getDataOnly)
        console.log('after-filter: ', newFiltered);

        updateMain({ id: lastMain?.id, body: objectToFormData(newFiltered) });
      } else {
        addMain(objectToFormData(getDataOnly));
      }
    } else {
      showToast('Please wait for the data to load')
    }
  };

  // -----------------------------------------------------------------------

  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = "https://oxygenarabia.com";

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
    if (lastMain) {
      reset(lastMain);
      console.log('last-main: ', lastMain);

    }
  }, [lastMain])

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
          <Typography variant="h4">Home</Typography>
          <Typography variant="caption" color="textSecondary" mt={2}>
            The Main section is the landing page of the website. Here you can update the main page content.
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
      <form method="POST" onSubmit={handleSubmit(onSubmit)} style={{ width: `100%` }}>
        <Stack spacing={5}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Hero Section</Typography>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <SingleFileUpload
                label={'Change Image'}
                name={'hero_cover'}
                title={'Hero Cover'}
                setValue={setValue}
                showUrl={lastMain?.hero_cover}
                error={{
                  ...InputErrorAttributes({ inputName: 'hero_cover', yupError: yupErrors }),
                }}
              />
            </Grid>
            <SectionTitle
              title=""
              register={register}
              yupErrors={yupErrors}
              titleField="hero_title"
              subtitleField="hero_subtitle"
              titleLabel="Hero Title"
              subtitleLabel="Hero Subtitle"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('hero_cta_title')}
                  label="Hero CTA Title"
                  {...InputErrorAttributes({ inputName: 'hero_cta_title', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('hero_cta_link')}
                  label="Hero CTA Link (URL)"
                  type="url"
                  {...InputErrorAttributes({ inputName: 'hero_cta_link', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Hero Card 1</Typography>


                <CardInput
                  defaultValue={lastMain?.hero_card_1 ?? null}
                  setValue={setValue}
                  inputName={"hero_card_1"}
                  yupErrors={yupErrors}
                  addButtonText="Add Hero Card 1 Item"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('hero_slider_title')}
                  label="Hero Slider Title"
                  {...InputErrorAttributes({ inputName: 'hero_slider_title', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Hero Card 2</Typography>


                <CardInput
                  defaultValue={lastMain?.hero_card_2 ?? null}
                  setValue={setValue}
                  inputName={"hero_card_2"}
                  yupErrors={yupErrors}
                  addButtonText="Add Hero Card 2 Item"
                />
              </Grid>

              <Grid item xs={12}>
                <MultiFileUpload
                  defaultValue={lastMain?.hero_slider_imgs ?? null}
                  inputName={'hero_slider_imgs'}
                  setValue={setValue}
                  yupErrors={yupErrors}
                  label="Add Hero Slider Image"
                  title="Hero Slider Images"
                  errorField="hero_slider_imgs"
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Section 1</Typography>
            <SectionTitle
              title=""
              register={register}
              yupErrors={yupErrors}
              titleField="section_1_title"
              subtitleField="section_1_subtitle"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_1_title')}
                  label="Card 1 Title"
                  {...InputErrorAttributes({ inputName: 'section_1_card_1_title', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_1_subtitle')}
                  label="Card 1 Subtitle"
                  {...InputErrorAttributes({ inputName: 'section_1_card_1_subtitle', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_1_cta')}
                  label="Card 1 CTA Link"
                  type="url"
                  {...InputErrorAttributes({ inputName: 'section_1_card_1_cta', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_2_title')}
                  label="Card 2 Title"
                  {...InputErrorAttributes({ inputName: 'section_1_card_2_title', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_2_subtitle')}
                  label="Card 2 Subtitle"
                  {...InputErrorAttributes({ inputName: 'section_1_card_2_subtitle', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_2_cta')}
                  label="Card 2 CTA Link"
                  type="url"
                  {...InputErrorAttributes({ inputName: 'section_1_card_2_cta', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_3_title')}
                  label="Card 3 Title"
                  {...InputErrorAttributes({ inputName: 'section_1_card_3_title', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_3_subtitle')}
                  label="Card 3 Subtitle"
                  {...InputErrorAttributes({ inputName: 'section_1_card_3_subtitle', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_1_card_3_cta')}
                  label="Card 3 CTA Link"
                  type="url"
                  {...InputErrorAttributes({ inputName: 'section_1_card_3_cta', yupError: yupErrors })}
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Section 2</Typography>
            <SectionTitle
              title=""
              register={register}
              yupErrors={yupErrors}
              titleField="section_2_title"
              subtitleField="section_2_subtitle"
            />

            <Grid container spacing={2}>
              <Grid item xs={12}>

                <MultiFileUpload
                  defaultValue={lastMain?.section_2_icons ?? null}
                  inputName={'section_2_icons'}
                  setValue={setValue}
                  yupErrors={yupErrors}
                  label="Add Section 2 Icon"
                  title="Section 2 Icons"
                  errorField="section_2_icons"
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Section 3</Typography>

            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('section_3_title')}
              label="Section 3 Title"
              {...InputErrorAttributes({ inputName: 'section_3_title', yupError: yupErrors })}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <SingleFileUpload
                  label={'Card 1 Icon'}
                  name={'section_3_card_1_icon'}
                  title={'Card 1 Icon'}
                  setValue={setValue}
                  showUrl={lastMain?.section_3_card_1_icon}
                  error={{
                    ...InputErrorAttributes({ inputName: 'section_3_card_1_icon', yupError: yupErrors }),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_3_card_1_title')}
                  label="Card 1 Title"
                  {...InputErrorAttributes({ inputName: 'section_3_card_1_title', yupError: yupErrors })}
                />

              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_3_card_1_cta')}
                  label="Card 1 CTA Link"
                  type="url"
                  {...InputErrorAttributes({ inputName: 'section_3_card_1_cta', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Card 1 Features</Typography>
                <MultiInputs
                  defaultValue={lastMain?.section_3_card_1_features ?? null}
                  inputName={'section_3_card_1_features'}
                  setValue={setValue}
                  yupErrors={yupErrors}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <SingleFileUpload
                  label={'Card 2 Icon'}
                  name={'section_3_card_2_icon'}
                  title={'Card 2 Icon'}
                  setValue={setValue}
                  showUrl={lastMain?.section_3_card_2_icon}
                  error={{
                    ...InputErrorAttributes({ inputName: 'section_3_card_2_icon', yupError: yupErrors }),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_3_card_2_title')}
                  label="Card 2 Title"
                  {...InputErrorAttributes({ inputName: 'section_3_card_2_title', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_3_card_2_cta')}
                  label="Card 2 CTA Link"
                  type="url"
                  {...InputErrorAttributes({ inputName: 'section_3_card_2_cta', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Card 2 Features</Typography>

                <MultiInputs
                  defaultValue={lastMain?.section_3_card_2_features ?? null}
                  inputName={'section_3_card_2_features'}
                  setValue={setValue}
                  yupErrors={yupErrors}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <SingleFileUpload
                  label={'Card 3 Icon'}
                  name={'section_3_card_3_icon'}
                  title={'Card 3 Icon'}
                  setValue={setValue}
                  showUrl={lastMain?.section_3_card_3_icon}
                  error={{
                    ...InputErrorAttributes({ inputName: 'section_3_card_3_icon', yupError: yupErrors }),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_3_card_3_title')}
                  label="Card 3 Title"
                  {...InputErrorAttributes({ inputName: 'section_3_card_3_title', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_3_card_3_cta')}
                  label="Card 3 CTA Link"
                  type="url"
                  {...InputErrorAttributes({ inputName: 'section_3_card_3_cta', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Card 3 Features</Typography>

                <MultiInputs
                  defaultValue={lastMain?.section_3_card_3_features ?? null}
                  inputName={'section_3_card_3_features'}
                  setValue={setValue}
                  yupErrors={yupErrors}
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Section 4</Typography>
            <Grid item xs={12} md={6} mb={3}>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('section_4_title')}
                label={'Section 4 Title'}
                {...InputErrorAttributes({ inputName: 'section_4_title', yupError: yupErrors })}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SingleFileUpload
                  label={'Section 4 Cover'}
                  name={'section_4_cover'}
                  title={'Section 4 Cover'}
                  setValue={setValue}
                  showUrl={lastMain?.section_4_cover}
                  error={{
                    ...InputErrorAttributes({ inputName: 'section_4_cover', yupError: yupErrors }),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_4_cta_title')}
                  label="Section 4 CTA Title"
                  {...InputErrorAttributes({ inputName: 'section_4_cta_title', yupError: yupErrors })}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register('section_4_cta_link')}
                  label="Section 4 CTA Link"
                  type="url"
                  {...InputErrorAttributes({ inputName: 'section_4_cta_link', yupError: yupErrors })}
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Section 5</Typography>

            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('section_5_title')}
              label="Section 5 Title"
              {...InputErrorAttributes({ inputName: 'section_5_title', yupError: yupErrors })}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>

                <SingleFileUpload
                  label="Section 5 Card Image"
                  name={'section_5_card_img'}
                  title="Section 5 Card Image"
                  setValue={setValue}
                  showUrl={lastMain?.section_5_card_img}
                  error={{
                    ...InputErrorAttributes({ inputName: 'section_5_card_img', yupError: yupErrors }),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Section 5 Card</Typography>
                <CardInput
                  defaultValue={lastMain?.section_5_card_card ?? null}
                  setValue={setValue}
                  inputName={"section_5_card_card"}
                  yupErrors={yupErrors}
                  addButtonText="Add Card Item"
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Section 6</Typography>
            <SectionTitle
              title=""
              register={register}
              yupErrors={yupErrors}
              titleField="section_6_title"
              subtitleField="section_6_subtitle"
            />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Section 6 Slider Items</Typography>
                <SliderItem
                  defaultValue={lastMain?.section_6_slider ?? null}
                  setValue={setValue}
                  inputName={'section_6_slider'}
                  yupErrors={yupErrors}
                />
              </Grid>
            </Grid>
          </Card>

          <Button disabled={isLoading || lastMainLoading} variant='contained' type="submit">
            Update
          </Button>
        </Stack>
      </form>
    </Container>
  );
}