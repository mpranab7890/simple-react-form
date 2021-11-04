import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Redirect } from 'react-router-dom';

const theme = createTheme();

export default function SignIn(props) {
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [invalidEmail, setinvalidEmail] = React.useState(false);
  const [invalidPassword, setinvalidPassword] = React.useState(false);
  const [successMessage, setsuccessMessage] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (localStorage.getItem(email) === null) {
      setinvalidEmail(true);
    } else if (password !== localStorage.getItem(email)) {
      setinvalidPassword(true);
    } else {
      props.setauthenticated(true);
      props.setcurrentUser(email);
      localStorage.setItem('loggedIn', email);
      <Redirect to='/' />;
    }
  };

  React.useEffect(() => {
    if (invalidEmail) {
      setTimeout(() => {
        setinvalidEmail(false);
      }, 4000);
    }

    if (invalidPassword) {
      setTimeout(() => {
        setinvalidPassword(false);
      }, 4000);
    }

    if (successMessage !== '') {
      setTimeout(() => {
        setsuccessMessage('');
      }, 4000);
    }
  });

  React.useEffect(() => {
    if (localStorage.getItem('userRegistered') !== null) {
      setsuccessMessage('User successfully registered!');
      localStorage.removeItem('userRegistered');
      setTimeout(() => {
        setsuccessMessage('');
      }, 5000);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <br />
          <Stack sx={{ width: '100%' }} spacing={2}>
            {invalidEmail ? <Alert severity='error'>Email address not registered!</Alert> : ''}
            {invalidPassword ? <Alert severity='error'>Incorrect Password!</Alert> : ''}
            {successMessage.length !== 0 ? <Alert severity='success'>{successMessage}</Alert> : ''}
          </Stack>

          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={(event) => setemail(event.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(event) => setpassword(event.target.value)}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/register'>{"Don't have an account? Register"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
