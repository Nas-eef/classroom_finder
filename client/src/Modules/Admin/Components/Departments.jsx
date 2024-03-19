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

const Departments = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
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

  const handleDeleteDepartment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteDepartment/${id}`);
      alert(response.data.message);
      getDepartments()
    } catch (error) {
      console.error('Error deleting department:', error.message);
      alert(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addDepartment = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addDepartment', {
        name: departmentName,
        block: selectedBlock,
        floor: selectedFloor
      });
      alert(response.data.message);
      handleCloseDialog();
      getDepartments();
    } catch (error) {
      console.error('Error adding department:', error.message);
      alert(error);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getDepartments');
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Error getting departments:', error.message);
    }
  };

  const handleAddDepartment = () => {
    addDepartment();
  };

  useEffect(() => {
    getDepartments();
    getBlocks()
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Departments Management
          </Typography>
          <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add Department</Button>
        </Toolbar>
      </AppBar>
      
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="departments table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>ID</TableCell>
              <TableCell className={classes.tableHeader}>Department Name</TableCell>
              <TableCell className={classes.tableHeader}>Block</TableCell>
              <TableCell className={classes.tableHeader}>Floor</TableCell>
              <TableCell className={classes.tableHeader}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.block}</TableCell>
                <TableCell>{department.floor}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteDepartment(department.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-department-dialog-title">
        <DialogTitle id="add-department-dialog-title">Add Department</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField id="departmentName" label="Department Name" fullWidth value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
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
          <Button onClick={handleAddDepartment} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Departments;
