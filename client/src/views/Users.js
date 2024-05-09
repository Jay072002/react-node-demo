import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Menu, MenuItem, Container, Divider, Avatar, Snackbar } from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import Sort from "../components/Sort"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import * as UserActions from "../redux/actions/users"
import PropTypes from "prop-types";

const UserCard = ({ user, onEdit, onDelete, showSnackbar }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(user);
    showSnackbar();
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Name: {user.name}
          </Typography>
          <Typography color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography color="text.secondary">
            Age: {user.age}
          </Typography>
          <Typography color="text.secondary">
            Gender: {user.gender}
          </Typography>
          <Typography color="text.secondary">
            Address: {user.address}
          </Typography>
          <Avatar alt={user.name} src={`http://localhost:5000/uploads/${user?.profileImage}`} style={{ width: 70, height: 70, marginTop: '10px' }} />
        </CardContent>
        <IconButton aria-label="more" onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>
            <Delete fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Card>
      <Divider />
    </Grid>
  );
};

const Users = ({ getUsers, users, resetUsers, deleteUser }) => {
  const [usersData, setUsersData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    getUsers()
  }, []);

  useEffect(() => {
    if (users?.success) {
      setUsersData(users?.data)
      resetUsers();
    }
  }, [users?.success])

  const onDelete = (user) => {
    deleteUser(user?._id);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSort = (sortBy, isAsc) => {
    if (sortBy) {
      getUsers({ query: `sort=${true}`, body: { field: sortBy, isAsc } });
    }
  };

  const sortingOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
  ];

  return (
    <>
      <Sort options={sortingOptions} onSort={handleSort} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2}>
          <Container className="custom-scrollbar">
            {usersData.map((user, index) => (
              <UserCard key={index} user={user} onDelete={onDelete} showSnackbar={handleSnackbarOpen} />
            ))}
          </Container>
        </Grid>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="User deleted successfully"
      />
    </>
  );
};

const mapStateToProps = ({
  user: { users }
}) => {
  return {
    users
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUsers: bindActionCreators(UserActions.getUsers, dispatch),
  resetUsers: bindActionCreators(UserActions.resetUsers, dispatch),
  deleteUser: bindActionCreators(UserActions.deleteUser, dispatch)
})

Users.propTypes = {
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  resetUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
