import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, TextField, Grid, Box } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import bannerImage from './bg.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 100%), url(${bannerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: "100vh"
  },
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  title1: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: "25px"
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: "center",
    marginTop: "25px"
  },
  button: {
    marginRight: theme.spacing(2),
    color: '#ffffff',
  },
  descriptionContainer: {
    position: 'relative',
    textAlign: 'center',
    color: '#ffffff',
    marginTop: theme.spacing(8),
  },
  description: {
    maxWidth: 600,
    margin: '0 auto',
    padding: theme.spacing(4),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: theme.spacing(1),
  },
  searchContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchInput: {
    width: '100%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#ffffff',
    '& input': {
      padding: theme.spacing(1.5),
    },
  },
  searchButton: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#388E3C',
    },
  },
}));

const UserHome = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [ClassMap, setClassMap] = useState({});
const navigate=useNavigate()

const getClassMap = async () => {
  try {
    const response = await axios.post(`http://localhost:8081/api/get/getClassMap`, { roomNumber: searchText });
    const data = response.data.data;
    console.log(data, "classroom");
    if (data.length > 0) {
      alert("Class room Found");
      navigate('/RoomView', { state: { classMapData: data } });
    } else {
      alert("No class room Exist");
    }
  } catch (error) {
    console.error('Error getting class map:', error.message);
  }
};

const handleLogout = () => {
  localStorage.clear("user");
  navigate('/login');
};

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title1}>
            College Room Finder
          </Typography>
          <IconButton onClick={()=>navigate("/EventView")} edge="start" className={classes.button} color="inherit" aria-label="events">
            <EventIcon />
          </IconButton>
          <IconButton onClick={handleLogout} edge="start" className={classes.button} color="inherit" aria-label="logout">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box className={classes.descriptionContainer}>
        <Box className={classes.description}>
          <Typography variant="h4" gutterBottom>
            MES College Marampally
          </Typography>
          <Typography variant="body1">
            One of the premier institutions for higher education in Kerala. Established in the serene and picturesque surroundings of Marampally, it offers a wide range of academic programs and extracurricular activities. With a focus on holistic development and academic excellence, MES College Marampally has been shaping the future of thousands of students for decades.
          </Typography>
        </Box>
      </Box>

      <Container>
        <Typography variant="h5" className={classes.title}>
          Search for your class room
        </Typography>

        <Grid container spacing={2} className={classes.searchContainer}>
          <Grid item xs={12} sm={8}>
            <TextField
              className={classes.searchInput}
              variant="outlined"
              placeholder="Enter class room number..."
              InputProps={{
                startAdornment: (
                  <RoomIcon color="primary" />
                ),
                endAdornment: (
                  <IconButton
                    className={classes.searchButton}
                    onClick={getClassMap}
                  >
                    <SearchIcon />
                  </IconButton>
                )
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserHome;
