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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useDeleteProjectMutation } from 'src/redux/endpoints/projects';
import ProjectUpdateModal from 'src/components/modals/update/projectUpdate';

// ----------------------------------------------------------------------

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ProjectTableRow({
  selected,
  id,
  title,
  subtitle,
  image,
  description,
  card_description,
  handleClick,
}) {
  const [deleteProject, { data, isLoading, isError }] = useDeleteProjectMutation();

  const [openMenu, setOpenMenu] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleDelete = () => {
    deleteProject({ id });
    setOpen(null);
  };

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="center" spacing={2}>
            <img src={image} alt={title} style={{ width: 100, height: 100, objectFit: 'cover' }} />
            <Typography variant="subtitle2" noWrap>
              {title}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{subtitle}</TableCell>

        {/* Clickable Description Cell */}
        <TableCell onClick={() => handleOpenModal(description)} style={{ cursor: 'pointer' }}>
          <Typography noWrap sx={{ textDecoration: 'underline', color: 'primary.main' }}>
            View Description
          </Typography>
        </TableCell>

        {/* Clickable Card Description Cell */}
        <TableCell onClick={() => handleOpenModal(card_description)} style={{ cursor: 'pointer' }}>
          <Typography noWrap sx={{ textDecoration: 'underline', color: 'primary.main' }}>
            View Card Description
          </Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Popover Menu */}
      <Popover
        open={!!openMenu}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem>
          <ProjectUpdateModal id={id} />
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {/* Modal for Description */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Content
          </Typography>
          <Typography>{modalContent}</Typography>
        </Box>
      </Modal>
    </>
  );
}

ProjectTableRow.propTypes = {
  image: PropTypes.any,
  description: PropTypes.any,
  handleClick: PropTypes.func,
  service: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  page_title: PropTypes.any,
  page_subtitle: PropTypes.any,
  selected: PropTypes.any,
  card_description: PropTypes.any,
};