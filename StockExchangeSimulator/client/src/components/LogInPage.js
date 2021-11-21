import React, { useState,useEffect } from 'react';
import { makeStyles, Typography, Card} from '@material-ui/core';
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
      width: '100%',
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
    const newUser = {
      email, password
  };
  
    Axios.post(
      "http://localhost:8000/users/login",
      newUser
  ).then((response)=>{
    if(response.data.code===1){
      localStorage.setItem("username", email);
    //   let username = localStorage.getItem("username")
    // const userName = {username};
    
    // Axios.post(
    //     "http://localhost:8000/users/usersTable",
    //     userName
    // ).then((response)=>{
    //     console.log(response.data); 
    // });
    const obj={email};
      Axios.post("http://localhost:8000/users/isBroker",obj).then((response)=>{
        if(response.data.length==0)
          navigate("/home");
        else
          navigate("/brokerHome");
      });
    }
    else{
      setError("Incorrect Credentials");
      //navigate("/signup");
    }
  });
  };
  const handleSignUp=()=>{
    navigate("/signup");
  };

  useEffect(()=>{
    localStorage.clear();
  },[]);
  return (
    <div className="login">
      <Card variant="outlined" style={{width:"40%",marginLeft:"30%",marginTop:"8%"}}>
        <Typography variant="h4" style={{padding:"4%"}}>Login</Typography>
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
              Submit
            </Button>
          </div>
        </form>
            <Typography>No Account?
              <Button onClick={handleSignUp} color="secondary" variant="text">Sign Up</Button>
            </Typography>
        </Card>
    </div>
  );
};

export default LogInForm;