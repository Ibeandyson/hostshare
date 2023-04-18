import { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../layout';
import { NextPage } from 'next';
import { Menu, MenuItem, Fade, Modal, useMediaQuery, TextField, Grid, Button, CircularProgress, Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useUser from '@/hooks/useUser';
import moment from 'moment';
import { MoreVert } from '@mui/icons-material';
import { useState, MouseEvent, ChangeEvent } from 'react';
import Backdrop from '@mui/material/Backdrop';

const UserTable: NextPage = () => {
  const smallScreen = useMediaQuery('(max-width: 600px)');
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: smallScreen ? 350 : 700,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
  };

  const { getAllUsers, userLoading, userTableData, deleteUser, editUser } = useUser();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });
  const [menuState, setMenuState] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuState);
  const [userId, setUserId] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  const closeEditModal = () => {
    setEditModal(false);
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    });
    setUserId('');
  };

  const openEditModal = () => {
    setEditModal(true);
    setMenuState(null);
  };

  const closeDeleteModal = () => {
    setdeleteModal(false);
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    });
    setUserId('');
  };

  const openDeleteModal = () => {
    setdeleteModal(true);
    setMenuState(null);
  };

  const onHandleChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleClickCloseMenu = () => {
    setMenuState(null);
  };

  const handleClickOpenMenu = (event: MouseEvent<HTMLElement>, row: any) => {
    setMenuState(event.currentTarget);
    setUserData({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      address: row.address,
    });
    setUserId(row._id);
  };

  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'date',
      headerName: 'Created Date',
      width: 200,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 150,
      filterable: false,
      editable: false,
      renderCell: (params) => (
        <div style={{ cursor: 'pointer' }} onClick={(e) => handleClickOpenMenu(e, params.row)}>
          <MoreVert />
        </div>
      ),
    },
  ];

  const rows = userTableData?.map((data: any, index) => ({
    id: index,
    _id: data._id,
    lastName: data.lastName,
    firstName: data.firstName,
    email: data.email,
    address: data.address,
    date: moment(data.createdAt).add(10, 'days').calendar(),
  }));

  const onSubmit = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    editUser(userData, userId, closeEditModal);
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deleteUser(userId, closeDeleteModal);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Created by create Andyson" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box sx={{ width: 'auto', padding: 0, marginTop: '100px' }}>
          <p style={{ marginTop: '20px', marginBottom: '50px', fontWeight: 'bolder' }}>User Table</p>
          {userLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <CircularProgress size={50} />
            </Box>
          ) : (
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                sx={{
                  '.MuiDataGrid-columnSeprator': {
                    display: 'none',
                  },
                  '.MuiDataGrid-columnHeader': {
                    backgroundColor: '#F4F5F6',
                  },
                  '.MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 600,
                  },
                  '.MuiDataGrid-footerContainer': {
                    borderTop: 'none',
                  },
                }}
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </div>
          )}

          <Menu anchorEl={menuState} open={openMenu} onClose={handleClickCloseMenu} TransitionComponent={Fade}>
            <MenuItem onClick={openEditModal}>Edit Details</MenuItem>
            <MenuItem onClick={openDeleteModal}>Delete Details</MenuItem>
          </Menu>
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={deleteModal}
          onClose={closeDeleteModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={deleteModal}>
            <Box
              sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 350,
                bgcolor: 'background.paper',
                border: 'none',
                boxShadow: 24,
                p: 4,
              }}
            >
              <p style={{ marginTop: '20px', marginBottom: '50px', fontWeight: 'bolder' }}>Do You want to delete ?</p>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button onClick={closeDeleteModal} style={{ margin: '10px', width: '100%' }} variant="outlined">
                    No
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    startIcon={userLoading && <CircularProgress size={20} />}
                    disabled={userLoading}
                    style={{ margin: '10px', width: '100%' }}
                    variant="contained"
                    onClick={(e: any) => onDelete(e)}
                  >
                    Yes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={editModal}
          onClose={closeEditModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={editModal}>
            <Box sx={style}>
              <div>
                <p style={{ marginTop: '20px', marginBottom: '50px', fontWeight: 'bolder' }}>Edit User</p>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <p style={{ color: 'GrayText' }}>First Name</p>
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
                      style={{ float: 'right', margin: '10px' }}
                      variant="contained"
                    >
                      Update
                    </Button>
                    <Button onClick={closeEditModal} style={{ float: 'right', margin: '10px' }} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Fade>
        </Modal>
      </Layout>
    </main>
  );
};

export default UserTable;
