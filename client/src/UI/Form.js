import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



export default function FormPropsTextFields() {



    const [admin, setAdmin] = React.useState({
        name: '',
        password: '',
        contact: '',
        share: '',
        myShare: '',
        commission: '',
        priceAmount: '',
      });

    let name,value;
    const handleChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setAdmin({...admin, [name]: value});
    }

    console.log(admin);
  return (
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
  );
}
