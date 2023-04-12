import Head from 'next/head';
import Layout from '../../layout';
import { NextPage } from 'next';
import { TextField, Grid, Button, CircularProgress, MenuItem, Box } from '@mui/material';
import { useState, ChangeEvent, MouseEvent } from 'react';
import { GameIProps, Category, GameConfigIProps, Display, PlayerLevel } from '@/types/game';
import useGame from '@/hooks/useGame';
import Select from '@mui/material/Select';

const AddGame: NextPage = () => {
  const { createGame, gameLoading } = useGame();
  const [gameData, setGameData] = useState({
    name: '',
    category: '',
  });

  const [configData, setConfigData] = useState<GameConfigIProps>({
    playerLevel: '',
    playerNumber: 1,
    display: '',
  });

  const onHandleChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };
  const onHandleChangeCinfigInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setConfigData({ ...configData, [e.target.name]: e.target.value });
  };

  const onFormClear = () => {
    setConfigData({
      playerLevel: '',
      playerNumber: 1,
      display: '',
    });
    setGameData({
      name: '',
      category: '',
    });
  }

  const onSubmit = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    createGame({ ...gameData, config: configData }, onFormClear);
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
          <p style={{ marginTop: '20px', marginBottom: '50px', fontWeight: 'bolder' }}>Add Game</p>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
              <p style={{color: "GrayText"}}> Game Name</p>
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
              <p style={{color: "GrayText"}}>Category</p>
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
              <p style={{color: "GrayText"}}>Player Number</p>
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
              <p style={{color: "GrayText"}}>Player Level</p>
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
              <p style={{color: "GrayText"}}>Display</p>
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

export default AddGame;
