import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReportIcon from '@material-ui/icons/List';
import { useNavigate } from 'react-router-dom';
import Users from './Components/Users';
import Staffs from './Components/Staffs';
import Blocks from './Components/Blocks';
import Classrooms from './Components/Classrooms';
import Departments from './Components/Departments';
import DashBoardEvents from './Components/DashBoardEvents';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#283593',
    position:"fixed"
  },
  title: {
    flexGrow: 1,
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.clear("user");
    navigate('/login');
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case 'Reports':
        return <DashBoardEvents />;
      case 'Users':
        return <Users />;
      case 'Staffs':
        return <Staffs />;
      case 'Classrooms':
        return <Classrooms />;
      case 'Blocks':
        return <Blocks />;
      case 'Departments':
        return <Departments />;
      default:
        return <Typography variant="h4" align="center" gutterBottom style={{ color: "#000" }}>Class Room Finder Admin Dashboard</Typography>;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Admin Dashboard
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuItemClick('Users')}>
              <PersonIcon />
              <Typography variant="inherit">Users</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Staffs')}>
              <GroupIcon />
              <Typography variant="inherit">Staffs</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Classrooms')}>
              <ClassIcon />
              <Typography variant="inherit">Classrooms</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Blocks')}>
              <BusinessIcon />
              <Typography variant="inherit">Blocks</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Departments')}>
              <ClassIcon />
              <Typography variant="inherit">Departments</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Reports')}>
              <ReportIcon />
              <Typography variant="inherit">Reports</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToAppIcon />
              <Typography variant="inherit">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div style={{paddingTop:"80px"}}>
      {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
