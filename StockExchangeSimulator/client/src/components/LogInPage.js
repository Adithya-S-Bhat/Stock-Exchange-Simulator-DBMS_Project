import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import ErrorNotice from './ErrorNotice';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const LogInForm = () => {
  const classes = useStyles();
  // create state variables for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');
  let navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password);
    const newUser = {
      email, password
  };
    Axios.post(
      "http://localhost:8000/users/login",
      newUser
  ).then((response)=>{
    console.log(response.data.code)
    if(response.data.code===1){
      navigate("/home");
    }
    else{
      setError("Incorrect Credentials");
      //navigate("/signup");
    }
  });
  };

  return (
    <div className="login">
    {error && (<ErrorNotice message={error} clearError={ ()=> setError(undefined)}/>)}
    <form className={classes.root} onSubmit={handleSubmit}>
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
      <div>

        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
      </div>
    </form>
    </div>
  );
};

export default LogInForm;