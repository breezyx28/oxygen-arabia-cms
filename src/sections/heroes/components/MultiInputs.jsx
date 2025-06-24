import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import InputErrorAttributes from 'src/components/utils/InputErrorAttributes';

const MultiInputs = ({
    defaultValue = null,
    inputName,
    setValue,
    yupErrors,
    addButtonText = 'Add Input',
    inputLabel = 'Input'
}) => {
    const [inputs, setInputs] = useState(defaultValue ?? []);

    React.useMemo(() => {
        if (defaultValue) setInputs(defaultValue)
    }, [defaultValue])

    const addArrayItem = (array, setArray, defaultItem = '') => {
        setArray([...array, defaultItem]);
        setValue(inputName, [...array, defaultItem]);
    };

    const removeArrayItem = (array, setArray, index) => {
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
        setValue(inputName, newArray);
    };

    return (
        <>
            {inputs.map((input, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            label={inputLabel}
                            value={input || ''}
                            onChange={(e) => {
                                const newInputs = [...inputs];
                                newInputs[index] = e.target.value;
                                setInputs(newInputs);
                                setValue(inputName, newInputs);
                            }}
                            {...InputErrorAttributes({ inputName: `${inputName}[${index}]`, yupError: yupErrors })}
                        />
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeArrayItem(inputs, setInputs, index)}
                        >
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                onClick={() => addArrayItem(inputs, setInputs, '')}
                sx={{ mt: 1 }}
            >
                {addButtonText}
            </Button>
        </>
    );
};

export default MultiInputs; 