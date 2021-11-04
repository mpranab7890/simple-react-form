import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './Register';
import SignIn from './SignIn';
import Home from './Home';
import NavBar from './NavBar';

function App() {
  const [authenticated, setauthenticated] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState('');

  React.useEffect(() => {
    var currentemail = localStorage.getItem('loggedIn');
    if (currentemail != null) {
      setauthenticated(true);
      setcurrentUser(currentemail);
    }
  }, []);
  return (
    <div className='App'>
      <Router>
        <NavBar authenticated={authenticated} currentUser={currentUser} setauthenticated={setauthenticated} />

        <Switch>
          <Route exact path='/'>
            {!authenticated ? (
              <SignIn setauthenticated={setauthenticated} setcurrentUser={setcurrentUser} />
            ) : (
              <Home currentUser={currentUser} />
            )}
          </Route>
          <Route exact path='/register'>
            {authenticated ? <Redirect to='/' /> : <Register />}
          </Route>
          <Route exact path='/test'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
