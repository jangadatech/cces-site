import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '@mui/material';
import palette from '@/themes/palette';
import { Palette } from '@mui/icons-material';

interface SideNavItemProps {
  text: string;
  open: boolean;
  icon: any;
  path: string;
}


const SideNavItem = ({ text, open, icon, path}: SideNavItemProps) => (
  <ListItem disablePadding sx={{ display: 'block'}}>
    <Link href={path} underline="none" sx={{color: palette.text.primary }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </Link>
  </ListItem>
);

export default SideNavItem;
