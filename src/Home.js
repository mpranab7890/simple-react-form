import React from 'react';
import Typography from '@mui/material/Typography';

const Home = (props) => {
  console.log(props.currentUser);

  return (
    <Typography component='h1' variant='h5'>
      <br />
      <br />
      Welcome to your dashboard, {props.currentUser}
      <hr />
    </Typography>
  );
};

export default Home;
