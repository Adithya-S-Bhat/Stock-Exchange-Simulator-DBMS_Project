import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { makeStyles, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })); 

export default function Orders(){
    const classes = useStyles();
    const [buyOrders,setBuyOrders]=useState([]);
    const [sellOrders,setSellOrders]=useState([]);

    const initialisation=async()=>{
        let id = localStorage.getItem("id");
        let user_id = {id};
        await Axios.post(
            "http://localhost:8000/users/getSellOrders",
            user_id
        ).then((response)=>{
            setSellOrders(response.data);
        });

        await Axios.post(
            "http://localhost:8000/users/getBuyOrders",
            user_id
        ).then((response)=>{
            setBuyOrders(response.data);
        });

    }
   

    

    

    useEffect(()=>{
        initialisation();
    },[]);

    return (
        <div>
            <Typography variant="h5">Your Orders</Typography>     
            <br/>      
            <Typography variant="h6">Buy Orders</Typography>
            <br/>
            <div className={classes.root}>
            <ListItem style={{backgroundColor:"black"}}>
                <ListItemText primary="Stock Name" style={{width:"10px",fontWeight:"bolder"}}/>
                <ListItemText primary="Buy Price" style={{direction:"rtl",fontWeight:"bolder"}} />
                <ListItemText primary="Quantity" style={{direction:"rtl",fontWeight:"bolder"}} />
            </ListItem>
            
            {buyOrders.map((record) => ( 
                <ListItem key={record.s_id}>      
                  <ListItemText primary={record.companyname} style={{width:"10px"}}/>
                  <ListItemText primary={record.buy_price} style={{direction:"rtl"}}/>              
                  <ListItemText primary={record.buy_quantity} style={{direction:"rtl"}}/>
                </ListItem>   
            )
            )}
            </div>
            <br/>
            <br/>
            <br/>
            <Typography variant="h6">Sell Orders</Typography>
            <br/>
            <div className={classes.root}>
            <ListItem style={{backgroundColor:"black"}}>
                <ListItemText primary="Stock Name" style={{width:"10px",fontWeight:"bolder"}}/>
                <ListItemText primary="Sell Price" style={{direction:"rtl",fontWeight:"bolder"}} />
                <ListItemText primary="Quantity" style={{direction:"rtl",fontWeight:"bolder"}} />
            </ListItem>
            {sellOrders.map((record) => ( 
                <ListItem key={record.s_id}>      
                  <ListItemText primary={record.companyname} style={{width:"10px"}}/>
                  <ListItemText primary={record.sell_price} style={{direction:"rtl"}}/>              
                  <ListItemText primary={record.sell_quantity} style={{direction:"rtl"}}/>
                </ListItem>  
            )
            )}
            </div>
            


            
        </div>
    );
}