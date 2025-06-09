import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

export default function SelectInput({
  label,
  name,
  title,
  items,
  value,
  setValue = () => null,
  error,
  ...restProps
}) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error?.error}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          {...restProps}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          name={name}
          onChange={handleChange}
        >
          {items?.map((value, index) => (
            <MenuItem key={index} value={value?.id}>
              {value?.name}
            </MenuItem>
          ))}
          {/* <MenuItem value={10}>Ten</MenuItem> */}
        </Select>
        {error?.error ? <FormHelperText>{...error?.helperText}</FormHelperText> : ''}
      </FormControl>
    </Box>
  );
}
