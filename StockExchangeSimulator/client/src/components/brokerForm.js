import React, { useState } from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const BrokerForm = () => {
  const classes = useStyles();
  // create state variables for each input
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = React.useState('');
  const [rate, setRate] = useState('');

  let navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    let username = localStorage.getItem("username");
        const user = {username};
        Axios.post(
            "http://localhost:8000/users/getUserId",
            user
        ).then((response)=>{
            let userID = response.data.id;
            const newBroker = {
              //firstName, lastName, 
              userID, name, website, address,rate
          };
        Axios.post(
          "http://localhost:8000/users/brokerform",
            newBroker
    ).then((response)=>{
          navigate("/login"); 
    });
  });
}

  const handleLogIn=()=>{
    navigate("/login");
  };


  return (
    <Card variant="outlined" style={{width:"40%",marginLeft:"30%",marginTop:"6%"}}>
    <Typography variant="h4" style={{padding:"4%"}}>Broker Details</Typography>
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="filled"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label="Website"
        variant="filled"
        required
        value={website}
        onChange={e => setWebsite(e.target.value)}
      />
      <TextField
        label="Address"
        variant="filled"
        // type="email"
        required
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <TextField
        label="Brokerage Rate"
        variant="filled"
        type="number"
        InputProps={{ inputProps: { min: 1, max: 10 } }}
        required
        value={rate}
        onChange={e => setRate(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
    {/* <Typography>Have An Account?
      <Button onClick={handleLogIn} color="secondary" variant="text">Log In</Button>
    </Typography> */}
    </Card>
  );
};

export default BrokerForm;