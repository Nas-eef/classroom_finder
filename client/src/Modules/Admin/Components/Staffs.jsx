import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, AppBar, Toolbar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

const departments = [
  "BIOSCIENCE",
  "BUSINESS ADMINISTRATION",
  "COMMERCE",
  "COMPUTER APPLICATIONS",
  "ELECTRONICS",
  "ENGLISH",
  "LANGUAGES",
  "MATHEMATICS AND STATISTICS",
  "PHYSICAL EDUCATION",
  "PHYSICS",
  "PSYCHOLOGY",
  "ANIMATION & GRAPHIC DESIGN",
  "HUMAN RESOURCE MANAGEMENT",
  "FASHION DESIGN & MANAGEMENT",
  "LOGISTICS MANAGEMENT",
  "INDUSTRIAL INSTRUMENTATION & AUTOMATION",
  "SOFTWARE DEVELOPMENT & SYSTEM ADMINISTRATION",
  "CHEMISTRY",
  "TOURISM",
  "MULTI SPORTS & FITNESS TRAINING"
];

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
  formControl: {
    minWidth: 200,
  },
  appBar: {
    backgroundColor: '#1976D2', // Change to desired color
  },
  title: {
    flexGrow: 1,
  },
}));

const Staffs = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);

  const handleDeleteStaff = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteStaff/${id}`);
      alert(response.data.message);
      getStaffs();
    } catch (error) {
      console.error('Error deleting staff:', error.message);
      alert(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setEditingStaffId(null);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setDepartment('');
    setDesignation('');
  };

  const getStaffs = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getStaffs');
      setStaffs(response.data.data);
    } catch (error) {
      console.error('Error getting Staffs:', error.message);
    }
  };

  useEffect(() => {
    getStaffs();
  }, []);

  const validateForm = () => {
    if (name.length < 5) {
      alert('Name must be at least 5 characters long');
      return false;
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Phone number must be 10 digits long');
      return false;
    }
    if (!name || !email || !password || !phoneNumber || !department || !designation) {
      alert('All fields are required');
      return false;
    }
    return true;
  };

  const addStaff = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      const response = await axios.post('http://localhost:8081/api/add/addStaff', {
        name,
        email,
        password,
        phoneNumber,
        department,
        designation
      });
      alert(response.data.message);
      handleCloseDialog();
      getStaffs();
    } catch (error) {
      console.error('Error adding staff:', error.message);
      alert(error);
    }
  };

  const editStaff = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      const response = await axios.put(`http://localhost:8081/api/update/UpdateStaff/${editingStaffId}`, {
        name,
        email,
        password,
        phoneNumber,
        department,
        designation,
      });
      alert(response.data.message);
      handleCloseDialog();
      getStaffs();
    } catch (error) {
      console.error('Error editing staff:', error.message);
      alert(error);
    }
  };

  const handleEditStaff = (staff) => {
    setEditMode(true);
    setEditingStaffId(staff.id);
    setName(staff.name);
    setEmail(staff.email);
    setPassword(staff.password);
    setPhoneNumber(staff.phone_number);
    setDepartment(staff.department);
    setDesignation(staff.designation);
    setOpenDialog(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Staff Management
          </Typography>
          <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add Staff</Button>
        </Toolbar>
      </AppBar>
      
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="Staffs table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>ID</TableCell>
              <TableCell className={classes.tableHeader}>Name</TableCell>
              <TableCell className={classes.tableHeader}>Email</TableCell>
              <TableCell className={classes.tableHeader}>Phone Number</TableCell>
              <TableCell className={classes.tableHeader}>Department</TableCell>
              <TableCell className={classes.tableHeader}>Designation</TableCell>
              <TableCell className={classes.tableHeader}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.id}</TableCell>
                <TableCell>{editMode && editingStaffId === staff.id ? (
                  <TextField value={name} onChange={(e) => setName(e.target.value)} />
                ) : staff.name}</TableCell>
                <TableCell>{editMode && editingStaffId === staff.id ? (
                  <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
                ) : staff.email}</TableCell>
                <TableCell>{editMode && editingStaffId === staff.id ? (
                  <TextField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                ) : staff.phone_number}</TableCell>
                <TableCell>{editMode && editingStaffId === staff.id ? (
                  <TextField value={department} onChange={(e) => setDepartment(e.target.value)} />
                ) : staff.department}</TableCell>
                <TableCell>{editMode && editingStaffId === staff.id ? (
                  <TextField value={designation} onChange={(e) => setDesignation(e.target.value)} />
                ) : staff.designation}</TableCell>
                <TableCell>
                  {editMode && editingStaffId === staff.id ? (
                    <IconButton aria-label="save" onClick={editStaff}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton aria-label="edit" onClick={() => handleEditStaff(staff)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteStaff(staff.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-staff-dialog-title">
        <DialogTitle id="add-staff-dialog-title">{editMode ? 'Edit staff' : 'Add staff'}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField id="name" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField id="email" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField id="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField id="phoneNumber" label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <FormControl className={classes.formControl}>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              fullWidth
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField id="designation" label="Designation" fullWidth value={designation} onChange={(e) => setDesignation(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          {editMode ? (
            <Button onClick={editStaff} color="primary">Save</Button>
          ) : (
            <Button onClick={addStaff} color="primary">Add</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Staffs;
