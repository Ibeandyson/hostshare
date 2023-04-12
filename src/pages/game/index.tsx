import { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import Head from 'next/head';
import Layout from '../../layout';
import { NextPage } from 'next';
import { Menu, MenuItem, Fade, Modal, useMediaQuery, TextField, Grid, Button, CircularProgress, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useGame from '@/hooks/useGame';
import moment from 'moment';
import { MoreVert } from '@mui/icons-material';
import { Category, Display, PlayerLevel } from '@/types/game';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';

const GameTable: NextPage = () => {
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

  const [menuState, setMenuState] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuState);
  const { getAllGames, gameLoading, gameTableData, getGamesByCategory, editGame, deleteGame, getGamesByDateRange } = useGame();
  const [gameData, setGameData] = useState({
    name: '',
    category: '',
  });

  const [configData, setConfigData] = useState({
    playerLevel: '',
    playerNumber: 1,
    display: '',
  });
  const [gameId, setGameId] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [filter, setFilter] = useState({
    category: '',
  });
  const [dateFilter, setDateFilter] = useState({
    dateFrom: '',
    dateTo: '',
  });

  const closeEditModal = () => {
    setEditModal(false);
    setConfigData({
      playerLevel: '',
      playerNumber: 1,
      display: '',
    });
    setGameData({
      name: '',
      category: '',
    });
    setGameId('');
  };

  const openEditModal = () => {
    setEditModal(true);
    setMenuState(null);
  };

  const closeViewModal = () => {
    setViewModal(false);
    setConfigData({
      playerLevel: '',
      playerNumber: 1,
      display: '',
    });
    setGameData({
      name: '',
      category: '',
    });
    setGameId('');
  };

  const openViewModal = () => {
    setViewModal(true);
    setMenuState(null);
  };

  const closeDeleteModal = () => {
    setdeleteModal(false);
    setConfigData({
      playerLevel: '',
      playerNumber: 1,
      display: '',
    });
    setGameData({
      name: '',
      category: '',
    });
    setGameId('');
  };

  const openDeleteModal = () => {
    setdeleteModal(true);
    setMenuState(null);
  };

  const onHandleChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };
  const onHandleChangeCinfigInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setConfigData({ ...configData, [e.target.name]: e.target.value });
  };

  const handleClickCloseMenu = () => {
    setMenuState(null);
  };

  const handleClickOpenMenu = (event: MouseEvent<HTMLElement>, row: any) => {
    setMenuState(event.currentTarget);
    setConfigData({
      playerLevel: row.config.playerLevel,
      playerNumber: row.config.playerNumber,
      display: row.config.display,
    });
    setGameData({
      name: row.name,
      category: row.category,
    });
    setGameId(row._id);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 250,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'date',
      headerName: 'Created Date',
      width: 250,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 200,
      filterable: false,
      editable: false,
      renderCell: (params) => (
        <div style={{ cursor: 'pointer' }} onClick={(e) => handleClickOpenMenu(e, params.row)}>
          <MoreVert />
        </div>
      ),
    },
  ];

  const rows = gameTableData?.map((data: any, index) => ({
    id: index,
    _id: data._id,
    name: data.name,
    category: data.category,
    date: moment(data.createdAt).add(10, 'days').calendar(),
    config: data.config,
  }));

  const onSubmit = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    editGame({ ...gameData, config: configData }, gameId, closeEditModal);
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deleteGame(gameId, closeDeleteModal);
  };

  useEffect(() => {
    getAllGames();
  }, []);

  useEffect(() => {
    getGamesByCategory(filter.category);
  }, [filter.category]);
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
          <p style={{ marginTop: '20px', marginBottom: '50px', fontWeight: 'bolder' }}>Game Table</p>
          <Grid sx={{ marginBottom: '20px' }} container spacing={2}>
            <Grid item xs={12} md={4}>
              <p style={{ color: 'GrayText' }}>Filter by category</p>
              <Select
                size="small"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="category"
                placeholder="Category"
                style={{ width: '100%' }}
                defaultChecked
                value={filter.category}
                onChange={(e: any) => setFilter({ ...filter, category: e.target.value })}
              >
                <MenuItem disabled value="">
                  <em>Category</em>
                </MenuItem>
                <MenuItem value={Category.ADVENTURE}>{Category.ADVENTURE}</MenuItem>
                <MenuItem value={Category.SPORTS}>{Category.SPORTS}</MenuItem>
                <MenuItem value={Category.RACING}>{Category.RACING}</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <p style={{ color: 'GrayText' }}>date from</p>
              <TextField
                value={dateFilter.dateFrom}
                onChange={(e: any) => setDateFilter({ ...dateFilter, dateFrom: e.target.value })}
                style={{ width: '100%' }}
                helperText=""
                type="date"
                size="small"
                id="demo-helper-text-aligned"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <p style={{ color: 'GrayText' }}>date to</p>
              <TextField
                value={dateFilter.dateTo}
                onChange={(e: any) => setDateFilter({ ...dateFilter, dateTo: e.target.value })}
                style={{ width: '100%' }}
                helperText=""
                size="small"
                type="date"
                id="demo-helper-text-aligned"
              />
            </Grid>
            <Grid item xs={12} md={12}>
            <Button onClick={() => getAllGames()} style={{  margin: '10px' }} variant="outlined">
                clear filter
              </Button>
              <Button
                startIcon={gameLoading && <CircularProgress size={20} />}
                onClick={() => getGamesByDateRange(dateFilter)}
                disabled={gameLoading}
                style={{ margin: '10px' }}
                variant="contained"
              >
                filter
              </Button>
              
            </Grid>
          </Grid>
          {gameLoading ? (
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
            <MenuItem onClick={openViewModal}>View Details</MenuItem>
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
                    startIcon={gameLoading && <CircularProgress size={20} />}
                    disabled={gameLoading}
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
          open={viewModal}
          onClose={closeViewModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={viewModal}>
            <Box sx={style}>
              <div>
                <p style={{ marginTop: '20px', marginBottom: '50px', fontWeight: 'bolder' }}>Game Info</p>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <p style={{ color: 'GrayText' }}> Game Name</p>
                      <p style={{ color: 'CaptionText', marginTop: '7px' }}>{gameData.name}</p>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <p style={{ color: 'GrayText' }}>Category</p>
                      <p style={{ color: 'CaptionText', marginTop: '7px' }}>{gameData.category}</p>
                    </Grid>
                  </Grid>
                </div>

                <p style={{ marginTop: '50px', marginBottom: '50px', fontWeight: 'bolder' }}>Game Config</p>

                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <p style={{ color: 'GrayText' }}>Player Number</p>
                      <p style={{ color: 'CaptionText', marginTop: '7px' }}>{configData.playerNumber}</p>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p style={{ color: 'GrayText' }}>Player Level</p>
                      <p style={{ color: 'CaptionText', marginTop: '7px' }}>{configData.playerLevel}</p>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p style={{ color: 'GrayText' }}>Display</p>
                      <p style={{ color: 'CaptionText', marginTop: '7px' }}>{configData.display}</p>
                    </Grid>
                  </Grid>
                </div>
              </div>
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
                <p style={{ marginTop: '20px', marginBottom: '50px', fontWeight: 'bolder' }}>Edit Game</p>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <p style={{ color: 'GrayText' }}> Game Name</p>
                      <TextField
                        name="name"
                        value={gameData.name}
                        onChange={(e) => onHandleChangeInput(e)}
                        style={{ width: '100%' }}
                        helperText=""
                        id="demo-helper-text-aligned"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <p style={{ color: 'GrayText' }}>Category</p>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name="category"
                        placeholder="Category"
                        style={{ width: '100%' }}
                        defaultChecked
                        value={gameData.category}
                        onChange={(e: any) => onHandleChangeInput(e)}
                      >
                        <MenuItem disabled value="">
                          <em>Category</em>
                        </MenuItem>
                        <MenuItem value={Category.ADVENTURE}>{Category.ADVENTURE}</MenuItem>
                        <MenuItem value={Category.SPORTS}>{Category.SPORTS}</MenuItem>
                        <MenuItem value={Category.RACING}>{Category.RACING}</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <p style={{ color: 'GrayText' }}>Player Number</p>
                      <TextField
                        name="playerNumber"
                        value={configData.playerNumber}
                        onChange={(e) => onHandleChangeCinfigInput(e)}
                        style={{ width: '100%' }}
                        helperText=""
                        type="number"
                        id="demo-helper-text-aligned"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <p style={{ color: 'GrayText' }}>Player Level</p>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name="playerLevel"
                        placeholder="playerLevel"
                        style={{ width: '100%' }}
                        defaultChecked
                        value={configData.playerLevel}
                        onChange={(e: any) => onHandleChangeCinfigInput(e)}
                      >
                        <MenuItem disabled value="">
                          <em>Player Level</em>
                        </MenuItem>
                        <MenuItem value={PlayerLevel.EASY}>{PlayerLevel.EASY}</MenuItem>
                        <MenuItem value={PlayerLevel.HARD}>{PlayerLevel.HARD}</MenuItem>
                        <MenuItem value={PlayerLevel.MEDIUM}>{PlayerLevel.MEDIUM}</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <p style={{ color: 'GrayText' }}>Display</p>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name="display"
                        style={{ width: '100%' }}
                        defaultChecked
                        value={configData.display}
                        onChange={(e: any) => onHandleChangeCinfigInput(e)}
                      >
                        <MenuItem disabled value="">
                          <em>Display</em>
                        </MenuItem>
                        <MenuItem value={Display.MEDIUM}>{Display.MEDIUM}</MenuItem>
                        <MenuItem value={Display.SMALL}>{Display.SMALL}</MenuItem>
                        <MenuItem value={Display.WIDE}>{Display.WIDE}</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        startIcon={gameLoading && <CircularProgress size={20} />}
                        onClick={(e: any) => onSubmit(e)}
                        disabled={gameLoading}
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
              </div>
            </Box>
          </Fade>
        </Modal>
      </Layout>
    </main>
  );
};

export default GameTable;
