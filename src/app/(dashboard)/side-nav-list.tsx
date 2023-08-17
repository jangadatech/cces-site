import * as React from 'react';


import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import SideNavItem from './side-nav-item';

interface SubNavListProps {
  text: string,
  icon: any,
  path?: string, 
  children: React.ReactNode
}

export default function NestedList({text, children, icon, path,}:  SubNavListProps) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List 
      sx={{
        m: 1
      }} 
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon 
          
        >
          {icon}
        </ListItemIcon>
        <ListItemText 
          primary={text}
          sx={{
            justifyContent: 'center'
          }} 
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            {children}
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

