import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, multiValues, theme) {
  return {
    fontWeight:
      multiValues.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelectInput({
  name,
  data = [],
  prop,
  multiValues = [],
  setMultiValues = () => [],
  error,
  ...restProps
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMultiValues(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '100%' }} error={error?.error}>
        <InputLabel id="demo-multiple-name-label">{name ?? 'Name'}</InputLabel>
        <Select
          {...restProps}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={multiValues}
          onChange={handleChange}
          input={<OutlinedInput label={name ?? 'Name'} />}
          MenuProps={MenuProps}
        >
          {data.map((name) => (
            <MenuItem key={name?.id} value={name?.id} style={getStyles(name, multiValues, theme)}>
              {prop ? name[prop] : name}
            </MenuItem>
          ))}
        </Select>
        {error?.error ? <FormHelperText>{...error?.helperText}</FormHelperText> : ''}
      </FormControl>
    </div>
  );
}
