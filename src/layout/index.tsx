import  React from 'react';
import Box from '@mui/material/Box';
import {
  Toolbar,
  AppBar,
  Drawer,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';

import { Container } from '@mui/system';

const drawerWidth = 240;

interface LayoutProps {
  window?: () => Window;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ window, children }) => {
  const router = useRouter();
  const [mobile, setMobile] = React.useState(true);
  const onToggleDrawer = () => setMobile(!mobile);
  const smallScreen = useMediaQuery('(max-width: 600px)');
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <div style={{ display: 'flex' }}>
            <Toolbar />
            <IconButton onClick={onToggleDrawer} sx={{ mr: 1, display: { sm: 'none' }, color: '#ffffff' }}>
              <MenuIcon sx={{ height: '30px', width: '30px' }} />
            </IconButton>
            <Typography sx={{ marginTop: '12px' }} variant="h6" noWrap component="div">
              Game Admin
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth, xs: drawerWidth }, flexShrink: { sm: 2000, xs: 200 } }}>
        <Drawer
          container={container}
          variant={'temporary'}
          open={mobile}
          ModalProps={{
            keepMounted: false,
          }}
          sx={{
            width: drawerWidth,
            display: { xs: 'block', sm: 'none' },
            boxSizing: 'border-box',
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List sx={{ marginTop: '30px' }}>
              <ListItem>
                <ListItemButton
                  style={{ backgroundColor: `${router.pathname === '/user' ? 'hsl(214, 85%, 89%)' : ''}`, borderRadius: '15px' }}
                  href="/user"
                >
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'User'} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  style={{ backgroundColor: `${router.pathname === '/user/add-user' ? 'hsl(214, 85%, 89%)' : ''}`, borderRadius: '15px' }}
                  href="/user/add-user"
                >
                  <ListItemIcon>
                    <GroupAddOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Add User'} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  style={{ backgroundColor: `${router.pathname === '/game' ? 'hsl(214, 85%, 89%)' : ''}`, borderRadius: '15px' }}
                  href="/game"
                >
                  <ListItemIcon>
                    <SportsEsportsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Game'} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  style={{ backgroundColor: `${router.pathname === '/game/add-game' ? 'hsl(214, 85%, 89%)' : ''}`, borderRadius: '15px' }}
                  href="/game/add-game"
                >
                  <ListItemIcon>
                    <GamesOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Add Game'} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Drawer
          variant={'permanent'}
          sx={{
            width: drawerWidth,
            display: { xs: 'none', sm: 'block' },
            boxSizing: 'border-box',
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', overflowY: 'hidden' },
          }}
          open
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List sx={{ marginTop: '30px' }}>
              <ListItem>
                <ListItemButton
                  style={{ backgroundColor: `${router.pathname === '/user' ? 'hsl(214, 85%, 89%)' : ''}`, borderRadius: '15px' }}
                  href="/user"
                >
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'User'} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  style={{ backgroundColor: `${router.pathname === '/user/add-user' ? 'hsl(214, 85%, 89%)' : ''}`, borderRadius: '15px' }}
                  href="/user/add-user"
                >
                  <ListItemIcon>
                    <GroupAddOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Add User'} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  style={{ backgroundColor: `${router.pathname === '/game' ? 'hsl(214, 85%, 89%)' : ''}`, borderRadius: '15px' }}
                  href="/game"
                >
                  <ListItemIcon>
                    <SportsEsportsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Game'} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  style={{ backgroundColor: `${router.pathname === '/game/add-game' ? 'hsl(214, 85%, 89%)' : ''}`, borderRadius: '15px' }}
                  href="/game/add-game"
                >
                  <ListItemIcon>
                    <GamesOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Add Game'} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>

      <Container maxWidth="xl" sx={{ ninHeight: '100vh' }}>
        <Box>{children}</Box>
      </Container>
    </div>
  );
};

export default Layout;
