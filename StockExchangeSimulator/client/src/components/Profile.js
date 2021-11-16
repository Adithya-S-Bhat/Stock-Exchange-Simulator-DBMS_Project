import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
})); 

export default function Profile(){
    const classes = useStyles();
    let id = localStorage.getItem("id")
    const ID = {id};
    const [stockHoldings,setStockHoldings]=useState([]);
    


    const handleAdd = (s_id,e) => {
      
      console.log(id)
      
      Axios.post("/buyStock", async(req,res)=>{
        
      })


    }

    const handleExit = (id,e) => {
      console.log(id)
    }
  
    const initialisation=async()=>{
        
        await Axios.post(
            "http://localhost:8000/users/getStockHoldings",
            ID
        ).then((response)=>{
            console.log(response.data)
            setStockHoldings(response.data)
        });
    }
    useEffect(()=>{
        initialisation();
    },[]);
    return (
        <div className="Profile">
            <p>Profile</p>
            <div className={classes.root}>
            {stockHoldings.map((record) => ( 
                <ListItem key={record.s_id}>      
                  <ListItemText primary={record.companyname} style={{width:"10px"}}/>
                  <ListItemText primary={record.currentvalue} style={{direction:"rtl"}}/>              
                  <ListItemText primary={record.quantity} style={{direction:"rtl"}}/>
                  <Button variant="contained" style={{backgroundColor:"green",color:"white"}} onClick={(e) => {e.preventDefault(); handleAdd(record.s_id)}}>Add</Button>&nbsp;&nbsp;
                  <Button variant="contained" style={{backgroundColor:"crimson",color:"white"}} onClick={(e) => {e.preventDefault(); console.log(record.s_id)}} >Exit</Button>
                </ListItem>   
            )
            )}
            </div>
            
        </div>
        
    );
}