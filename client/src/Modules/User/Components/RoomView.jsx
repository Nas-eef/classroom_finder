import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, IconButton, AppBar, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80%',
    margin: '0 auto',
    marginTop: theme.spacing(4),
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
  image: {
    width: '60%',
    height: 400,
    objectFit: 'contain',
  },
  descriptionContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    maxWidth: '80%',
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(1),
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(2),
  },
}));

const RoomView = () => {
  const location = useLocation();
  const classMapData = location.state && location.state.classMapData;
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Userhome")
  };
  const handleLogout = () => {
    localStorage.clear("user");
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title1}>
            College Room Finder
          </Typography>
          <IconButton edge="start" className={classes.button} color="inherit" aria-label="events">
            <EventIcon />
          </IconButton>
          <IconButton onClick={handleLogout} edge="start" className={classes.button} color="inherit" aria-label="logout">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <div className={classes.header}>
          <IconButton className={classes.backButton} onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        {classMapData && classMapData.map(room => (
          <div key={room.id}>
              {room.room_number &&<Typography variant="h5" align="center" gutterBottom> ROOM: {room.room_number}</Typography>}
              {room.name &&<Typography variant="h5" align="center" gutterBottom> {room.name}</Typography>}
            <div style={{ display: "flex" }}>
              {room.image && <img src={require(`../../../Uploads/${room.image}`)} alt={room.room_number} className={classes.image} />}
              <div className={classes.descriptionContainer}>
                <Paper elevation={3} className={classes.description}>
                  <Typography variant="h6" gutterBottom>
                    Reach the {room.block} By using the provided map
                  </Typography>
                  {room.floor === 'Ground Floor' ? (
                    <Typography variant="body1" gutterBottom>
                      <ul>
                        <li>Enter into the {room.block}</li>
                        {room.name &&  <li>You will find the {room.name} on the {room.floor} itself.</li> }
                        {room.room_number &&  <li>You will find room number {room.room_number} on the {room.floor} itself.</li> }
                      </ul>
                    </Typography>
                  ) : (
                    <Typography variant="body1" gutterBottom>
                      <ul>
                        <li>Enter into the {room.block}</li>
                        {room.block === "South Block" ? (
                          <li>You can use staircases or lift for reaching {room.floor}.</li>
                        ) : (
                          <li>You can use staircases for reaching {room.floor}.</li>
                        )}
                       {room.room_number &&  <li>You will find room number {room.room_number} on the {room.floor} itself.</li> }
                       {room.name &&  <li>You will find the {room.name} on the {room.floor} itself.</li> }
                      </ul>
                    </Typography>
                  )}
                </Paper>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RoomView;
