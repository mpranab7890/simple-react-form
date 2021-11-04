import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Redirect } from 'react-router-dom';

export default function NavBar(props) {
  const logoutUser = () => {
    props.setauthenticated(false);
    localStorage.removeItem('loggedIn');
    <Redirect to='/' />;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
          {props.authenticated ? (
            <div>
              <Button color='inherit'>{props.currentUser}</Button>
              <Button color='inherit' onClick={logoutUser}>
                LogOut
              </Button>
            </div>
          ) : (
            <div>
              <Button component={Link} to='/' color='inherit'>
                Login
              </Button>{' '}
              <Button component={Link} to='/register' color='inherit'>
                Register
              </Button>{' '}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
