import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, TextField, Link, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
  },
  appbar: {
    height: '65px',
    backgroundColor: '#1976D2',
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: 4,
    marginTop: 40,
    width: "100%",
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: '#1976D2',
    color: '#FFFFFF',
    borderRadius: 0,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#1565C0',
    },
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  link: {
    color: '#4CAF50',
    cursor: 'pointer',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (username.trim() === '' || password.trim() === '') {
      return;
    }

    const loginType = userType;

    try {
      let loginEndpoint;
      if (loginType === 'admin') {
        loginEndpoint = '/api/auth/AdminLogin';
      } else if (loginType === 'staff') {
        loginEndpoint = '/api/auth/StaffLogin';
      } else if (loginType === 'user') {
        loginEndpoint = '/api/auth/Login';
      }
      const res = await axios.post(`http://localhost:8081${loginEndpoint}`, { email: username, password });
      console.log(res.data.message);
      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      alert(res.data.message)
      if (loginType === 'admin') {
        navigate('/AdminHome');
      } else if (loginType === 'staff') {
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/StaffHome")
      } else if (loginType === 'user') {
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/UserHome")
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error); 
      } else if (error.request) {
        alert('No response received from the server');
      } else {
        alert('Error occurred during request setup:', error.message);
      }
      console.error('Error during login:', error);
    }
  };

  const handleSignUp = async () => {
    console.log(formData);
    if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber) {
      alert('All fields are required');
      return;
    }
    if (formData.name.length < 4) {
      alert('Name must be at least 4 characters long');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Invalid email address');
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert('Phone number must be 10 digits');
      return;
    }

    try {

      const res = await axios.post('http://localhost:8081/api/add/addusers', formData);
      console.log(res.data.message);
      alert(res.data.message);
      navigate("/Login");
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error);
    }

  };

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Class Room Finder
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </Typography>
            <Grid container spacing={2}>
              {isSignIn ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="user-type-label">Login As</InputLabel>
                      <Select
                        labelId="user-type-label"
                        id="user-type"
                        value={userType}
                        onChange={handleUserTypeChange}
                        label="Login As"
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="staff">Staff</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                  onClick={isSignIn ? handleSignIn : handleSignUp}
                >
                  {isSignIn ? 'Sign In' : 'Sign Up'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  {isSignIn ? "Don't have an account? " : "Already have an account? "}
                  <Link className={classes.link} onClick={handleToggleForm}>
                    {isSignIn ? 'Sign Up' : 'Sign In'}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;
