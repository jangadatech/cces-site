
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SubNavListProps {
  text: string,
  open: boolean;
  icon: any,
  path?: string, 
  children: React.ReactNode,
  color?: string;
}

const SideNavList = ({text, open, icon, path, children, color}:  SubNavListProps) => {
  const [expand, setExpand] = useState(true);
  const pathname = usePathname()
  const isSelected = pathname === path;

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <List 
      sx={{
        m: open ? 1 : 0
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
        {expand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            {children}
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default SideNavList;

