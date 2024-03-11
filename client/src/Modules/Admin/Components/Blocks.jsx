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
    backgroundColor: '#1976D2',
  },
  title: {
    flexGrow: 1,
  },
}));

const Blocks = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [blockName, setBlockName] = useState('');
  const [blockImage, setBlockImage] = useState(null);

  const handleDeleteBlock = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteBlock/${id}`);
      alert(response.data.message);
      getBlocks()
    } catch (error) {
      console.error('Error deleting block:', error.message);
      alert(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddBlock = async () => {
    try {
      const formData = new FormData();
      formData.append('name', blockName);
      formData.append('productImage', blockImage);
      
      const response = await axios.post('http://localhost:8081/addBlocks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(response.data.message);
      getBlocks();
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding block:', error.message);
      alert(error);
    }
  };

  const handleFileChange = (event) => {
    setBlockImage(event.target.files[0]);
  };

  const getBlocks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getBlocks');
      setBlocks(response.data.data);
    } catch (error) {
      console.error('Error getting blocks:', error.message);
    }
  };

  useEffect(() => {
    getBlocks();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Blocks Management
          </Typography>
          <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add Block</Button>
        </Toolbar>
      </AppBar>
      
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="blocks table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>ID</TableCell>
              <TableCell className={classes.tableHeader}>Name</TableCell>
              <TableCell className={classes.tableHeader}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((block) => (
              <TableRow key={block.id}>
                <TableCell>{block.id}</TableCell>
                <TableCell>{block.name}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteBlock(block.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-block-dialog-title">
        <DialogTitle id="add-block-dialog-title">Add Block</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField id="name" label="Name" fullWidth value={blockName} onChange={(e) => setBlockName(e.target.value)} />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddBlock} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Blocks;
