'use client'

import Head from 'next/head';
import NextLink from 'next/link';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';

const SignIn = () => {

  return (
    <>
      <Head>
        Login | CCES
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              sx={{ mb: 3 }}
            >
              <Tab
                label="Email"
                value="email"
              />
              <Tab
                label="Phone Number"
                value="phoneNumber"
              />
            </Tabs>
            <form
              noValidate
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                />
              </Stack>
              <FormHelperText sx={{ mt: 1 }}>
                Optionally you can skip.
              </FormHelperText>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Entrar
              </Button>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                <Link href='/'>
                  DASHBOARD
                </Link>
              </Button>
              <Alert
                severity="info"
                sx={{ mt: 3 }}
              >
                <div>
                  You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                </div>
              </Alert>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
