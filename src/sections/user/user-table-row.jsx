import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  firstName,
  lastName,
  email,
  message,
  handleClick,
}) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding={"normal"}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {firstName} {lastName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{message}</TableCell>

      </TableRow>
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  message: PropTypes.string,
};
