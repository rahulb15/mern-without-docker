import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import FormPropsTextFields from '../UI/Form.js';
import Box from '@mui/material/Box';
import EnhancedTable from '../pages/user/User.js';
import { useEffect, useState } from 'react';






export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const[user, setUser] = React.useState({
    firstName: '',
    lastName: '',
    contact: '',
    password: '',
    confirmPassword: '',
    commission: '',
    priceAmount: '',
    userType: 'user',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({...user, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    fetch('http://localhost:5001/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        handleClose();
    }
    )
    .catch(err => console.log(err));
  }
  
  useEffect(() => {
    <EnhancedTable />
  } , [user]);




  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{backgroundColor: '#ad1457'}}>
        Create User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          {/* <FormPropsTextFields/> */}



          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="First Name"  
          variant="outlined"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          variant="outlined"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />
        <div>
          <TextField
          required
          id="outlined-required"  
          label="Contact"
          variant="outlined"  
          name="contact"  
          value={user.contact}
          onChange={handleChange}
        />

        <TextField
          required
          id="outlined-required"
          label="Commission"
          variant="outlined"
          name="commission"
          value={user.commission}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Price Amount"
          variant="outlined"
          name="priceAmount"
          value={user.priceAmount}
          onChange={handleChange}
        />
        </div>

      </div>

    </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
