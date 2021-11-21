import React, { useEffect, useState } from 'react';
import { Card, FormControl, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    },
  }));

const InvestorForm =() => {
    const classes = useStyles();
    //create state variables for each input
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [brokerSelected, setBrokerSelected] = useState('');
    const [res,setRes]=useState([]);
    let navigate = useNavigate();

    
    const getBrokers=async()=>{
        await Axios.get("http://localhost:8000/users/getBrokers").then((response)=>{
            //console.log(response.data);
            setRes(response.data);
            //console.log(res);
        });
    }
    useEffect(()=>{
        getBrokers();
    },[]);

    const handleSubmit = e => {
        e.preventDefault();
        let username = localStorage.getItem("username");
        const user = {username};
        Axios.post(
            "http://localhost:8000/users/getUserId",
            user
        ).then((response)=>{
            let userID = response.data.id;
            const newUser = {
                userID,name,dob,aadhar,phone,pin,city,state,brokerSelected
            };
            Axios.post(
                "http://localhost:8000/users/investorForm",
                newUser
            ).then((response)=>{
                navigate("/home");
            });
        });
        // console.log(name,dob,aadhar,phone,pin,city,state);
        // const newUser = {
        //     name,dob,aadhar,phone,pin,city,state 
        // };
        // Axios.post(
        //     "http://localhost:8000/users/investorForm",
        //     newUser
        // ).then((response)=>{
        //     navigate("/home");
        // });
    }
    return (   
        <Card variant="outlined" style={{width:"40%",marginLeft:"30%",marginTop:"1%"}}>
        <Typography variant="h5" style={{padding:"4%"}}>Investor Details</Typography>
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
            label="Name"
            variant="filled"
            required
            value={name}
            onChange={e => setName(e.target.value)}/>
            <TextField
            label="DOB"
            variant="filled"
            required
            value={dob}
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={e => setDob(e.target.value)}/>
            <TextField
            label="aadhar"
            variant="filled"
            required
            value={aadhar}
            type="number"
            onChange={e => setAadhar(e.target.value)}/>
            <TextField
            label="phone"
            variant="filled"
            required
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}/>
            <TextField
            label="pin"
            variant="filled"
            required
            value={pin}
            type="number"
            onChange={e => setPin(e.target.value)}/>
            <TextField
            label="city"
            variant="filled"
            required
            value={city}
            onChange={e => setCity(e.target.value)}/>
            <TextField
            label="state"
            variant="filled"
            required
            value={state}
            onChange={e => setState(e.target.value)}/>
            <FormControl variant="filled" style={{width:"100%",padding:"2px"}}>
            <InputLabel id="select">Select Broker</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            width="50%"
            value={brokerSelected}
            onChange={e => setBrokerSelected(e.target.value)}>
                <MenuItem value="">
                    <em>Broker - website - brokerageRate</em>
                </MenuItem>
                {res.map((record) => (
                    //console.log(record)
                    <MenuItem key={record.broker_id} value={record.broker_id}>
                        {record.name+" - "+record.website+" - "+record.brokeragerate+"%"}
                    </MenuItem>
                ))}
            </Select>
            </FormControl>
            <div>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
        </form>
        </Card>
    );
}

export default InvestorForm;