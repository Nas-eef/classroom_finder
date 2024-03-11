import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Grid, AppBar, Toolbar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#388E3C',
    },
  },
  tableContainer: {
    borderRadius: 15,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(3),
  },
  tableHeader: {
    backgroundColor: theme.palette.grey[200],
    fontWeight: 'bold',
  },
  tableCell: {
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#ff0000',
  },
  dialogContent: {
    display: 'grid',
    gap: theme.spacing(2),
  },
  appBar: {
    backgroundColor: '#2196F3',
  },
  title: {
    flexGrow: 1,
  },
}));

const Events = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDeleteEvent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteEvent/${id}`);
      alert(response.data.message);
      getEvents();
    } catch (error) {
      console.error('Error deleting event:', error.message);
      alert(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addEvent = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addEvent', {
        event_name: eventName,
        description: description,
        date: eventDate,
        room_number: roomNumber,
        staff_id:user.id
      });
      alert(response.data.message);
      handleCloseDialog();
      getEvents();
    } catch (error) {
      console.error('Error adding event:', error.message);
      alert(error);
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getEvents');
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error getting events:', error.message);
    }
  };

  const handleAddEvent = () => {
    addEvent();
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Events Management
          </Typography>
          <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add Event</Button>
        </Toolbar>
      </AppBar>
      
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="events table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>ID</TableCell>
              <TableCell className={classes.tableHeader}>Event Name</TableCell>
              <TableCell className={classes.tableHeader}>Description</TableCell>
              <TableCell className={classes.tableHeader}>Date</TableCell>
              <TableCell className={classes.tableHeader}>Room Number</TableCell>
              <TableCell className={classes.tableHeader}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.filter(item=> item.staff_id == user.id).map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.event_name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.room_number}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteEvent(event.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-event-dialog-title">
        <DialogTitle id="add-event-dialog-title">Add Event</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField id="eventName" label="Event Name" fullWidth value={eventName} onChange={(e) => setEventName(e.target.value)} />
          <TextField id="description" label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextField id="eventDate" label="Date" type="date" fullWidth value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          <TextField id="roomNumber" label="Room Number" fullWidth value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddEvent} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Events;
