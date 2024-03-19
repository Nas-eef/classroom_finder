import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Grid, AppBar, Toolbar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
  activateButton: {
    color: '#4CAF50',
  },
  deactivateButton: {
    color: '#f44336',
  },
  dialogContent: {
    display: 'grid',
    gap: theme.spacing(2),
  },
  appBar: {
    backgroundColor: '#1976D2', // Change to desired color
  },
  title: {
    flexGrow: 1,
  },
}));

const Users = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteUser/${id}`);
      alert(response.data.message);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert(error);
    }
  };

  const handleActivateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/update/UpdateStatus/${id}`, { status: 1, id });
      alert(response.data.message);
      getUsers();
    } catch (error) {
      console.error('Error activating user:', error.message);
      alert(error);
    }
  };
  
  const handleDeactivateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/update/UpdateStatus/${id}`, { status: 0, id });
      alert(response.data.message);
      getUsers();
    } catch (error) {
      console.error('Error deactivating user:', error.message);
      alert(error);
    }
  };
  

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addUser = async (name, email, password, phoneNumber) => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addusers', { name, email, password, phoneNumber });
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding user:', error.message);
      alert(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/get/getUsers');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error getting users:', error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleAddUser = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    addUser(name, email, password, phoneNumber);
    handleCloseDialog();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            User Management
          </Typography>
          <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add User</Button>
        </Toolbar>
      </AppBar>
      
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>ID</TableCell>
              <TableCell className={classes.tableHeader}>Name</TableCell>
              <TableCell className={classes.tableHeader}>Email</TableCell>
              <TableCell className={classes.tableHeader}>Action</TableCell>
              <TableCell className={classes.tableHeader}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.map((user) => (
  <TableRow key={user.id}>
    <TableCell>{user.id}</TableCell>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.status == 1 ? "Active" : "Blocked"}</TableCell>
    <TableCell>
      {user.status == 1 ? (
        <IconButton aria-label="deactivate" onClick={() => handleDeactivateUser(user.id)} className={classes.deactivateButton}>
          <BlockIcon /> <Typography>Deactivate</Typography>
        </IconButton>
      ) : (
        <IconButton aria-label="activate" onClick={() => handleActivateUser(user.id)} className={classes.activateButton}>
          <CheckCircleIcon /> <Typography>Activate</Typography>
        </IconButton>
      )}
    </TableCell>
  </TableRow>
))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-user-dialog-title">
        <DialogTitle id="add-user-dialog-title">Add User</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField id="name" label="Name" fullWidth />
          <TextField id="email" label="Email" fullWidth />
          <TextField id="password" label="Password" fullWidth type="password" />
          <TextField id="phoneNumber" label="Phone Number" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddUser} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
