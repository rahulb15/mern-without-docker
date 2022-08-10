import { NavLink } from "react-router-dom";
import "./widget.scss";
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as React from 'react';


let adminNum = 0;
// let activeAdminNum = 0;
// let inactiveAdminNum = 0;

const Widget = ({ type,totalAdmins,totalUsers}) => {
  let item;


  if (type === "admin") {
    item = (
      <Grid item xs={12} style={{padding: "10px"}}>
        
          <Grid container spacing={4} style={{backgroundColor: "#f06292",borderRadius: "30px"}}>
            <Grid item xs={12}>
              <FormLabel component="legend">
                <Typography variant="h4" style={{color: "black"}}> Admin </Typography>
              </FormLabel>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="admin" name="admin" defaultValue="">
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label={`Active: ${totalAdmins}`}
                  />
                  <FormControlLabel
                    value="inactive"
                    control={<Radio />} 
                    label={`Inactive: ${totalAdmins}`}  
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
      </Grid>
    );
  } else if (type === "user") {
    item = (
      <Grid item xs={12} style={{padding: "10px"}}>
        
      <Grid container spacing={4} style={{backgroundColor: "#5c6bc0",borderRadius: "30px"}}>
        <Grid item xs={12}>
              <FormLabel component="legend">
                <Typography variant="h4" style={{color: "white"}}> User </Typography>
              </FormLabel>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="user" name="user" defaultValue="">
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label={`Active: ${totalUsers}`}
                    style={{color: "white"}}
                  />
                  <FormControlLabel
                    value="inactive"
                    control={<Radio />}
                    label={`Inactive: ${totalUsers}`}
                    style={{color: "white"}}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
      </Grid>
    );
  }
  return item;
}
export default Widget;