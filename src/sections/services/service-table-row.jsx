import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useDeleteServiceMutation } from 'src/redux/endpoints/services';
import ServiceUpdateModal from 'src/components/modals/update/serviceUpdate';

// ----------------------------------------------------------------------

export default function ServiceTableRow({
  selected,
  id,
  name,
  description,
  page_title,
  page_subtitle,
  handleClick,
}) {
  const [deleteService, { data, isLoading, error }] = useDeleteServiceMutation();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleDelete = () => {
    setOpen(null);
    deleteService({ id })
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          {description}
        </TableCell>

        <TableCell>
          {page_title}
        </TableCell>

        <TableCell>
          {page_subtitle}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem>
          <ServiceUpdateModal id={id} />
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ServiceTableRow.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
};
