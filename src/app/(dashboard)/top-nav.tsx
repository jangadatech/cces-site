import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';

const TopNavWrapper = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  marginLeft: 0,
  color: theme.palette.text.primary, 
  boxShadow: 'none'
}));

const TopNav = () => {
  return (
    <TopNavWrapper position="fixed">
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <Avatar alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar.png" />
      </Toolbar>
    </TopNavWrapper>
  );
};

export default TopNav;
