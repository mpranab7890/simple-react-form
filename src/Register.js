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
import { Link, useHistory } from 'react-router-dom';

const theme = createTheme();

export default function Register(props) {
  let history = useHistory();
  const [email, setemail] = React.useState('');
  const [validEmail, setvalidEmail] = React.useState(true);
  const [password, setpassword] = React.useState('');
  const [validPassword, setvalidPassword] = React.useState(true);
  const [repassword, setrepassword] = React.useState('');
  const [passwordMatch, setpasswordMatch] = React.useState(true);
  const [userAlreadyRegistered, setuserAlreadyRegistered] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((email.length === 0) | (password.length === 0) | (repassword.length === 0)) {
      if (email.length === 0) {
        setvalidEmail(false);
      }
      if (password.length === 0) {
        setvalidPassword(false);
      }
      if (repassword.length === 0) {
        setpasswordMatch(false);
      }
    } else if (!validEmail | !validPassword | !passwordMatch) {
    } else if (localStorage.getItem(email) !== null) {
      setuserAlreadyRegistered(true);
    } else {
      localStorage.setItem(email, password);
      localStorage.setItem('userRegistered', true);
      history.push('/');
    }
  };

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setvalidEmail(re.test(email));
  };

  const checkPasswordEquality = () => {
    if (password === repassword) {
      setpasswordMatch(true);
    } else {
      setpasswordMatch(false);
    }
  };

  React.useEffect(() => {
    if (!validEmail) {
      validateEmail();
    }
  }, [email]);

  React.useEffect(() => {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
    if (password.length !== 0) setvalidPassword(passw.test(password));
    if (repassword.length !== 0) checkPasswordEquality();
  }, [password]);

  React.useEffect(() => {
    checkPasswordEquality();
  }, [repassword]);

  React.useEffect(() => {
    if (userAlreadyRegistered) {
      setTimeout(() => {
        setuserAlreadyRegistered(false);
      }, 5000);
    }
  });

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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component='h1' variant='h5'>
            Register
          </Typography>

          {userAlreadyRegistered ? (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity='error'>The email address already exists!</Alert>
            </Stack>
          ) : (
            ''
          )}
          <br />
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(event) => setemail(event.target.value)}
                  onBlur={validateEmail}
                  error={validEmail ? false : true}
                  helperText={validEmail ? '' : 'Invalid email'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={(event) => setpassword(event.target.value)}
                  error={validPassword ? false : true}
                  helperText={
                    validPassword
                      ? ''
                      : 'Password must be between 7 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='re-password'
                  label='Confirm Password'
                  type='password'
                  id='re-password'
                  autoComplete='re-password'
                  onChange={(event) => setrepassword(event.target.value)}
                  error={passwordMatch ? false : true}
                  helperText={passwordMatch ? '' : "The passwords don't match"}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='allowExtraEmails' color='primary' />}
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid> */}
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-start'>
              <Grid item>
                <Link to='/'>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br />
      </Container>
    </ThemeProvider>
  );
}
