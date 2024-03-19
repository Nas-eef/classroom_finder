import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: '25px',
  },
  appBar: {
    backgroundColor: 'black',
    boxShadow: 'none',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: theme.spacing(1),
  },
  infoItem: {
    marginBottom: theme.spacing(1),
  },
}));

const DashboardEvents = () => {
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

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom style={{textAlign:"center"}}>
          Event Reports
        </Typography>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} key={event.id}>
              <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.eventName}>
                  {event.event_name}
                </Typography>
                <Typography variant="body1" className={classes.infoItem}>
                  <strong>Event Date:</strong> {event.date}
                </Typography>
                <Typography variant="body1" className={classes.infoItem}>
                  <strong>Staff Name:</strong> {event.name}
                </Typography>
                <Typography variant="body1" className={classes.infoItem}>
                  <strong>Department:</strong> {event.department}
                </Typography>
                <Typography variant="body1" className={classes.infoItem}>
                  <strong>Designation:</strong> {event.designation}
                </Typography>
                <Typography variant="body1" className={classes.infoItem}>
                  <strong>Phone Number:</strong> {event.phone_number}
                </Typography>
                <Typography variant="body1" className={classes.infoItem}>
                  <strong>Description:</strong> {event.description}
                </Typography>
                <Typography variant="body1" className={classes.infoItem}>
                  <strong>Room Number:</strong> {event.room_number}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default DashboardEvents;
