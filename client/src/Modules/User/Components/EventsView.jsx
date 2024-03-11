import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid, Paper, AppBar, Toolbar, IconButton } from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';
import axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title1: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: "25px"
  },
  appBar: {
    backgroundColor: 'black',
    boxShadow: 'none',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const EventView = () => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getEvents');
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error getting events:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear("user");
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/userhome');
  };

  useEffect(() => {
    getEvents();
  }, []);

  const getClassMap = async (roomNo) => {
    try {
      const response = await axios.post(`http://localhost:8081/api/get/getClassMap`, { roomNumber: roomNo });
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

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.backButton} color="inherit" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title1}>
            College Room Finder
          </Typography>
          <IconButton onClick={handleLogout} edge="start" className={classes.button} color="inherit" aria-label="logout">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <Grid container spacing={3}>
          {events.map(event => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  {event.event_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Info : {event.description}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Room Number: {event.room_number}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => getClassMap(event.room_number)}
                  endIcon={<DirectionsIcon />}
                >
                  Go to event
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default EventView;
