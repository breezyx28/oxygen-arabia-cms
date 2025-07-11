import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';

const CardInput = ({
    defaultValue = null,
    setValue,
    inputName,
    yupErrors,
    addButtonText = 'Add Card Item',
    titleLabel = 'Title',
    subtitleLabel = 'Subtitle',
    disabled = false
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
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label={titleLabel}
                            value={item.title || ''}
                            onChange={(e) => updateArrayItem(items, setItems, index, 'title', e.target.value)}
                            {...InputErrorAttributes({ inputName: `${inputName}[${index}].title`, yupError: yupErrors })}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label={subtitleLabel}
                            value={item.subtitle || ''}
                            onChange={(e) => updateArrayItem(items, setItems, index, 'subtitle', e.target.value)}
                            {...InputErrorAttributes({ inputName: `${inputName}[${index}].subtitle`, yupError: yupErrors })}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeArrayItem(items, setItems, index)}
                            disabled={disabled}
                        >
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                onClick={() => addArrayItem(items, setItems, { title: '', subtitle: '' })}
                sx={{ mt: 1 }}
                disabled={disabled}
            >
                {addButtonText}
            </Button>
        </>
    );
};

export default CardInput; 