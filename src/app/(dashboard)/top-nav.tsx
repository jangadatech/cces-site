'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { useSession } from 'next-auth/react';

const TopNavWrapper = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  marginLeft: 0,
  color: theme.palette.text.primary,
  boxShadow: 'none',
}));

const UserInfoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const UserName = styled('span')({
  marginRight: '8px',
  fontWeight: 'bold',
});

const TopNav = () => {
  const {data: session, status} = useSession()
  const username = session?.user?.name;

  return (
    <TopNavWrapper position="fixed">
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <UserInfoContainer>
          <UserName>{username}</UserName>
          <Avatar alt={username!} src="https://www.w3schools.com/howto/img_avatar.png" />
        </UserInfoContainer>
      </Toolbar>
    </TopNavWrapper>
  );
};

export default TopNav;