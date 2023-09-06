'use client'

import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '@mui/material';
import { usePathname } from 'next/navigation'
import { theme } from '@/themes';

interface SideNavItemProps {
  text: string;
  open: boolean;
  icon?: any;
  path?: string;
  color?: string;
  handlerSignOut?: () => void;
}

const SideNavItem = ({ text, open, icon, path, handlerSignOut, color }: SideNavItemProps) => {
  const pathname = usePathname()

  const isSelected = pathname === path;

  return (
      <Link href={path} underline="none" sx={{ color: color }}>
        <ListItem disablePadding sx={{ display: 'block' }} selected={isSelected} onClick={handlerSignOut}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: '4px',
                '&:hover': {
                },
                overflowX: 'hidden'
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
        </ListItem>
      </Link>
  );
};

export default SideNavItem;
