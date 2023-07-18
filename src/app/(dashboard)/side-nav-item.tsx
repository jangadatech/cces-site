import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '@mui/material';
import palette from '@/themes/palette';

interface SideNavItemProps {
  text: string;
  open: boolean;
  icon: any;
  path: string;
}

const SideNavItem = ({ text, open, icon, path }: SideNavItemProps) => {
  const isSelected = window.location.pathname === path;

  return (
      <Link href={path} underline="none" sx={{ color: palette.text.primary }}>
    <ListItem disablePadding sx={{ display: 'block' }} selected={isSelected}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            m: 1,
            backgroundColor: isSelected ? palette.background.dark : 'transparent',
            borderRadius: '4px',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: isSelected ? 'white' : 'inherit',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: isSelected ? 'white' : 'inherit' }} />
        </ListItemButton>
    </ListItem>
      </Link>
  );
};

export default SideNavItem;
