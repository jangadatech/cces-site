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
  marginLeft: '8px',
  fontWeight: 'bold',
});

const TopNav = () => {
  const {data: session, status} = useSession()
  console.log(session)
  const username = 'John Doe';

  return (
    <TopNavWrapper position="fixed">
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <UserInfoContainer>
          <Avatar alt={username} src="https://www.w3schools.com/howto/img_avatar.png" />
          <UserName>{username}</UserName>
        </UserInfoContainer>
      </Toolbar>
    </TopNavWrapper>
  );
};

export default TopNav;