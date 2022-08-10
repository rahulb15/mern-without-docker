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
// import TextField from '@mui/material/TextField';
import { AdminContext } from '../App';






export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = React.useContext(AdminContext);
  
  
  const [admin, setAdmin] = React.useState({
    name: '',
    password: '',
    contact: '',
    share: '',
    myShare: '',
    commission: '',
    priceAmount: '',
    userType: 'superAdmin',
  });

let name,value;
const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setAdmin({...admin, [name]: value});
    
}

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(admin);
    fetch('http://localhost:5001/api/admin/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
    })
    .then(res => res.json())
    .then(data => {
      // window.location.reload();
      dispatch({type: 'ADMIN', payload: data});
        console.log(data);
    }
    )
    .catch(err => console.log(err));  
}





  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{backgroundColor: '#ad1457'}}>
        Create Super Admin
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Super Admin</DialogTitle>
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
          label="Enter Admin Name"
          name="name"
          value={admin.name}
          onChange={handleChange}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          value={admin.password}
          onChange={handleChange}
        />
        <TextField
          id="outlined-number"
          label="Contact Number"
            type="number"
            name="contact"
            value={admin.contact}
            onChange={handleChange}
        />
        <TextField
          id="outlined-number"
          label="Share(%)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
            name="share"
            value={admin.share}
            onChange={handleChange}
        />
      </div>
      <div>
      <TextField
          id="filled-read-only-input"
          label="My Share(%)"
          defaultValue="100"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
         <TextField
          id="outlined-number"
          label="Commission(%)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
            name="commission"
            value={admin.commission}
            onChange={handleChange}
        />
      </div>
      <TextField
          id="outlined-number"
          label="Price Amount(%)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
            name="priceAmount"
            value={admin.priceAmount}
            onChange={handleChange}
        />
      
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
