import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';

const SectionTitle = ({
    title,
    subtitle,
    register,
    yupErrors,
    titleLabel = 'Title',
    subtitleLabel = 'Subtitle',
    titleField = 'title',
    subtitleField = 'subtitle'
}) => {
    return (
        <>
            <Typography variant="h6">{title}</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...register(titleField)}
                        label={titleLabel}
                        {...InputErrorAttributes({ inputName: titleField, yupError: yupErrors })}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...register(subtitleField)}
                        label={subtitleLabel}
                        // multiline
                        // rows={2}
                        {...InputErrorAttributes({ inputName: subtitleField, yupError: yupErrors })}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default SectionTitle; 