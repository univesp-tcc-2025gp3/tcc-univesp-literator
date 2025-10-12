import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { Link } from 'react-router-dom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';


export function Header() {
  const { logout, user } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3B82F6' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
       
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: {  md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LITERATOR
          </Typography>
     

        
         
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

          <div className='flex items-center gap-4'>
            <Link to="/admin">
              <Tooltip title="Monetização">
                <IconButton>
                  <LocalAtmIcon sx={{ color: '#FFF' }} />
                </IconButton>
              </Tooltip>
            </Link>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className='flex items-center gap-2 justify-center'>
                  <Typography variant='body1' sx={{ textAlign: 'center', color: '#FFF' }}>{user?.displayName}</Typography>
                  <Avatar alt={String(user?.displayName)} src={String(user?.photoURL)} />
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            
                <MenuItem onClick={handleCloseUserMenu}>
                  <button onClick={logout}>
                    <Typography sx={{ textAlign: 'center' }} >Logout</Typography>
                  </button>
                </MenuItem>
              
            </Menu>
          </Box>

          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
