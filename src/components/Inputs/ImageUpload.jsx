import React from 'react';
import { Grid, Card, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import FileUploadInput from 'src/components/Inputs/FileUploadInput';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';

const ImageUpload = ({
    images,
    setImages,
    yupErrors,
    label = 'Add Image',
    title = 'Images',
    multiple = false,
    errorField = 'images'
}) => {
    const removeArrayItem = (array, setArray, index) => {
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
    };

    const getImageUrl = (img) => {
        if (typeof img === 'string') return img;
        if (img instanceof File) return URL.createObjectURL(img);
        return '';
    };

    return (
        <>
            <FileUploadInput
                label={label}
                name={errorField}
                title={title}
                setValue={(name, value) => {

                    if (multiple) {
                        setImages([...images, value]);
                    } else {
                        setImages([value]);
                    }
                }}
                multiple={multiple}
                error={{
                    ...InputErrorAttributes({ inputName: errorField, yupError: yupErrors }),
                }}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {images.map((img, index) => (
                    <Grid item xs={6} md={3} key={index}>
                        <Card sx={{ p: 1, position: 'relative' }}>
                            <img
                                src={getImageUrl(img)}
                                alt={`Image ${index}`}
                                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                            />
                            <Button
                                size="small"
                                color="error"
                                sx={{ position: 'absolute', top: 5, right: 5, minWidth: 'auto', p: 0.5 }}
                                onClick={() => removeArrayItem(images, setImages, index)}
                            >
                                <Iconify icon="mdi:delete" width={16} />
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ImageUpload; 