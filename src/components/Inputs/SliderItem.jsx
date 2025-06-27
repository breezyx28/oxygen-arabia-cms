import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';
import FileUploadInput from 'src/components/Inputs/FileUploadInput';

const SliderItem = ({
    defaultValue = null,
    inputName,
    setValue,
    yupErrors,
    addButtonText = 'Add Slider Item'
}) => {
    const [items, setItems] = useState(defaultValue ?? []);

    React.useMemo(() => {
        if (defaultValue) setItems(defaultValue)
    }, [defaultValue])

    const addArrayItem = (array, setArray, defaultItem = {}) => {
        setArray([...array, defaultItem]);
        setValue(inputName, [...array, defaultItem])
    };

    const removeArrayItem = (array, setArray, index) => {
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
        setValue(inputName, newArray)
    };

    const updateArrayItem = (array, setArray, index, field, value) => {
        const newArray = [...array];
        newArray[index] = { ...newArray[index], [field]: value };
        setArray(newArray);
        setValue(inputName, newArray)
    };

    return (
        <>
            {items.map((item, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            select
                            label="Type"
                            value={item.type || 'img'}
                            onChange={(e) => updateArrayItem(items, setItems, index, 'type', e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                            {...InputErrorAttributes({ inputName: `${inputName}[${index}].type`, yupError: yupErrors })}
                        >
                            <option value="img">Image</option>
                            <option value="text">Text</option>
                        </TextField>
                    </Grid>

                    {item.type === 'img' ? (
                        <Grid item xs={12} md={4}>
                            <FileUploadInput
                                label={'Icon'}
                                name={`slider_${index}_icon`}
                                title={'Icon'}
                                setValue={(name, value) => updateArrayItem(items, setItems, index, 'icon', value)}
                                showUrl={item.icon}
                                error={{
                                    ...InputErrorAttributes({ inputName: `${inputName}[${index}].icon`, yupError: yupErrors }),
                                }}
                            />
                        </Grid>
                    ) : (
                        <>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    label="Text 1 Title"
                                    value={item.text_1_title || ''}
                                    onChange={(e) => updateArrayItem(items, setItems, index, 'text_1_title', e.target.value)}
                                    {...InputErrorAttributes({ inputName: `${inputName}[${index}].text_1_title`, yupError: yupErrors })}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    label="Text 1 Subtitle"
                                    value={item.text_1_subtitle || ''}
                                    onChange={(e) => updateArrayItem(items, setItems, index, 'text_1_subtitle', e.target.value)}
                                    {...InputErrorAttributes({ inputName: `${inputName}[${index}].text_1_subtitle`, yupError: yupErrors })}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    label="Text 2 Title"
                                    value={item.text_2_title || ''}
                                    onChange={(e) => updateArrayItem(items, setItems, index, 'text_2_title', e.target.value)}
                                    {...InputErrorAttributes({ inputName: `${inputName}[${index}].text_2_title`, yupError: yupErrors })}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    label="Text 2 Subtitle"
                                    value={item.text_2_subtitle || ''}
                                    onChange={(e) => updateArrayItem(items, setItems, index, 'text_2_subtitle', e.target.value)}
                                    {...InputErrorAttributes({ inputName: `${inputName}[${index}].text_2_subtitle`, yupError: yupErrors })}
                                />
                            </Grid>
                        </>
                    )}

                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            label="CTA Title"
                            value={item.cta_title || ''}
                            onChange={(e) => updateArrayItem(items, setItems, index, 'cta_title', e.target.value)}
                            {...InputErrorAttributes({ inputName: `${inputName}[${index}].cta_title`, yupError: yupErrors })}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            label="CTA Link"
                            value={item.cta_link || ''}
                            onChange={(e) => updateArrayItem(items, setItems, index, 'cta_link', e.target.value)}
                            {...InputErrorAttributes({ inputName: `${inputName}[${index}].cta_link`, yupError: yupErrors })}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeArrayItem(items, setItems, index)}
                        >
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                onClick={() => addArrayItem(items, setItems, {
                    type: 'img',
                    icon: '',
                    text_1_title: '',
                    text_1_subtitle: '',
                    text_2_title: '',
                    text_2_subtitle: '',
                    cta_title: '',
                    cta_link: ''
                })}
                sx={{ mt: 1 }}
            >
                {addButtonText}
            </Button>
        </>
    );
};

export default SliderItem; 