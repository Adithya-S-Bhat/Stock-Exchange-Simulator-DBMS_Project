import React, { useState } from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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

const SignUpPage = () => {
  const classes = useStyles();
  // create state variables for each input
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = React.useState('Investor');
  let navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
        //firstName, lastName, 
        email, password, user
    };
    localStorage.setItem("username", email);
     Axios.post(
        "http://localhost:8000/users/signup",
        newUser
    ).then((response)=>{
        if(user==="Investor")
          navigate("/investorForm"); 
        else
          navigate("/brokerForm");
    });
   
  };
  const handleLogIn=()=>{
    navigate("/login");
  };

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <Card variant="outlined" style={{width:"40%",marginLeft:"30%",marginTop:"6%"}}>
    <Typography variant="h4" style={{padding:"4%"}}>Sign Up</Typography>
    <form className={classes.root} onSubmit={handleSubmit}>
      {/*<TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />*/}
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <RadioGroup row aria-label="i/b" name="row-radio-buttons-group" value={user} onChange={handleChange}>
        <FormControlLabel value="Investor" control={<Radio />} label="Investor"/>
        <FormControlLabel value="Broker" control={<Radio />} label="Broker" />
      </RadioGroup>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
    <Typography>Have An Account?
      <Button onClick={handleLogIn} color="secondary" variant="text">Log In</Button>
    </Typography>
    </Card>
  );
};

export default SignUpPage;