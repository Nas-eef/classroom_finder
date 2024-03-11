import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Grid, AppBar, Toolbar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
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

const Classrooms = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [blocks, setBlocks] = useState([]);

  const getBlocks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getBlocks');
      setBlocks(response.data.data);
    } catch (error) {
      console.error('Error getting blocks:', error.message);
    }
  };

  const handleDeleteClassroom = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteClassroom/${id}`);
      alert(response.data.message);
      getClassrooms()
    } catch (error) {
      console.error('Error deleting classroom:', error.message);
      alert(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addClassroom = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addClassroom', {
        room_number: roomNumber,
        block: selectedBlock,
        floor: selectedFloor
      });
      alert(response.data.message);
      handleCloseDialog();
      getClassrooms();
    } catch (error) {
      console.error('Error adding classroom:', error.message);
      alert(error);
    }
  };

  const getClassrooms = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getClassrooms');
      setClassrooms(response.data.data);
    } catch (error) {
      console.error('Error getting classrooms:', error.message);
    }
  };

  const handleAddClassroom = () => {
    addClassroom();
  };

  useEffect(() => {
    getClassrooms();
    getBlocks()
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Classrooms Management
          </Typography>
          <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add Classroom</Button>
        </Toolbar>
      </AppBar>
      
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="classrooms table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>ID</TableCell>
              <TableCell className={classes.tableHeader}>Room Number</TableCell>
              <TableCell className={classes.tableHeader}>Block</TableCell>
              <TableCell className={classes.tableHeader}>Floor</TableCell>
              <TableCell className={classes.tableHeader}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classrooms.map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell>{classroom.id}</TableCell>
                <TableCell>{classroom.room_number}</TableCell>
                <TableCell>{classroom.block}</TableCell>
                <TableCell>{classroom.floor}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteClassroom(classroom.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-classroom-dialog-title">
        <DialogTitle id="add-classroom-dialog-title">Add Classroom</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField id="roomNumber" label="Room Number" fullWidth value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
          <FormControl fullWidth>
            <InputLabel id="block-select-label">Block</InputLabel>
            <Select
              labelId="block-select-label"
              id="block-select"
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
            >
              {blocks.map((item)=>(<MenuItem value= {item.name}>{item.name}</MenuItem>))}

            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="floor-select-label">Floor</InputLabel>
            <Select
              labelId="floor-select-label"
              id="floor-select"
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Ground Floor">Ground Floor</MenuItem>
              <MenuItem value="First Floor">First Floor</MenuItem>
              <MenuItem value="Second Floor">Second Floor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddClassroom} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Classrooms;
