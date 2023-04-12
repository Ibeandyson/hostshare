import Head from 'next/head';
import Layout from '../../layout';
import { NextPage } from 'next';
import { TextField, Grid, Button, CircularProgress, Box } from '@mui/material';
import { useState, ChangeEvent, MouseEvent } from 'react';
import { UserIProps } from '@/types/users';
import useUser from '@/hooks/useUser';

const AddUser: NextPage = () => {
  const { createUser, userLoading } = useUser();
  const [userData, setUserData] = useState<UserIProps>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const onHandleChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onFormClear = () => {
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    });
  };

  const onSubmit = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    createUser(userData, onFormClear);
  };

  return (
    <main>
      <Head>
        <title>Create User</title>
        <meta name="description" content="Created by create Andyson" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box sx={{ width: 'auto', padding: 0, marginTop: '100px' }}>
          <p style={{ marginTop: '20px', marginBottom: '50px', fontWeight: 'bolder' }}>Add User</p>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <p style={{ color: 'GrayText' }}>Fist Name</p>
                <TextField
                  name="firstName"
                  value={userData.firstName}
                  onChange={(e) => onHandleChangeInput(e)}
                  style={{ width: '100%' }}
                  helperText=""
                  id="demo-helper-text-aligned"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <p style={{ color: 'GrayText' }}>Last Name</p>
                <TextField
                  name="lastName"
                  value={userData.lastName}
                  onChange={(e) => onHandleChangeInput(e)}
                  style={{ width: '100%' }}
                  helperText=""
                  id="demo-helper-text-aligned"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p style={{ color: 'GrayText' }}>Email</p>
                <TextField
                  name="email"
                  value={userData.email}
                  onChange={(e) => onHandleChangeInput(e)}
                  style={{ width: '100%' }}
                  helperText=""
                  id="demo-helper-text-aligned"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p style={{ color: 'GrayText' }}>Address</p>
                <TextField
                  name="address"
                  value={userData.address}
                  onChange={(e) => onHandleChangeInput(e)}
                  style={{ width: '100%' }}
                  helperText=""
                  id="demo-helper-text-aligned"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  startIcon={userLoading && <CircularProgress size={20} />}
                  onClick={(e: any) => onSubmit(e)}
                  disabled={userLoading}
                  style={{ float: 'right' }}
                  variant="contained"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Layout>
    </main>
  );
};

export default AddUser;
