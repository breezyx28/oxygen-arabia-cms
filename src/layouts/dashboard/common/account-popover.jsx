import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from 'src/_mock/account';
import localStorageHelper from 'src/helper/localStorageHelper';
import { useLogoutUserMutation } from 'src/redux/endpoints/login';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    route: '/dashboard'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    route: '/dashboard/profile'
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  //   route: '/dashboard/settings'
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [logout, { data }] = useLogoutUserMutation();

  const userInfo = localStorageHelper({ flag: 'get', key: 'user_data' })

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleLogout = () => {
    logout()
  };

  React.useEffect(() => {
    if (data) {
      setOpen(null);
      window.location.href = "/login"
    }
  }, [data])

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account?.photoURL}
          alt={userInfo?.user.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {userInfo?.user?.name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {userInfo?.user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userInfo?.user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <Link to={option.route} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem href={option.route ?? "#"} key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          </Link>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
