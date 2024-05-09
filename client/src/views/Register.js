import { useState, useEffect } from 'react';
import { Snackbar, SnackbarContent, Grid, Card, CardContent, Typography, IconButton, Menu, MenuItem, Container, Divider, Avatar, Button, FormControl, RadioGroup, Radio, FormControlLabel, TextField, Box } from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import Sort from "../components/Sort"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as UserActions from "../redux/actions/users";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography color="text.secondary">
            {user.email}
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
          <MenuItem onClick={() => onEdit(user)}>
            <Edit fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={() => onDelete(user)}>
            <Delete fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Card>
      <Divider />
    </Grid>
  );
};

const Register = ({
  createUser,
  resetUser,
  users
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    address: '',
    file: null
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          formDataObj.append(key, formData[key]);
        }
      }
      createUser(formDataObj);
      setFormData({
        name: '',
        email: '',
        age: '',
        gender: '',
        address: '',
        file: null
      });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  useEffect(() => {
    if (users?.success) {
      setSnackbarOpen(true);
      resetUser();
    }
  }, [users?.success]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Typography>Gender : </Typography>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </Box>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ margin: "10px 0" }}>
          Register
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message="User registered successfully!"
        />
      </Snackbar>
    </>
  );
};

Register.propTypes = {
  createUser: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = ({
  user: { users }
}) => {
  return {
    users
  }
};

const mapDispatchToProps = (dispatch) => ({
  createUser: bindActionCreators(UserActions.createUser, dispatch),
  resetUser: bindActionCreators(UserActions.resetUsers, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
