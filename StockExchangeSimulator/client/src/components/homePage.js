import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));  

export default function HomePage(){
    const classes = useStyles();
    let username = localStorage.getItem("username")
    let userid = localStorage.getItem("id")
    const userName = {username};
    const [stocks,setStocks]=useState([]);
    const [sell,setSell]=useState([]);
    const [price,setPrice]=useState(100);
    const [quantity,setQuantity]=useState(50);
    const [open, setOpen] = React.useState(false);
    const [sid, setSid] = React.useState();
  
    const handleClickOpen = (id) => {
        const obj={id};
        Axios.post("http://localhost:8000/users/getBuyableStocks",obj).then((response)=>{
            console.log(response.data)
            setSid(id);
            setOpen(true);
        });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleBuy=(id)=>{
        const obj = {
            sid,userid,price,quantity
        };
        Axios.post("http://localhost:8000/users/buyStock",obj).then((response)=>{
            console.log(response)
        });
    }

    const initialisation=async()=>{
        await Axios.post(
            "http://localhost:8000/users/getUserId",
            userName
        ).then((response)=>{
            localStorage.setItem("id", response.data.id);
            console.log(response.data.id); 
        });
        await Axios.post(
            "http://localhost:8000/users/getAllStocks",
        ).then((response)=>{
            //console.log(response.data)
            setStocks(response.data)
        });
    }
    useEffect(()=>{
        initialisation();
    },[]);
    return (
        <div className="HomePage">
            <div className={classes.root}>
            {stocks.map((record) => (
                    //console.log(record)
                    <ListItem button key={record.s_id} onClick={()=>handleClickOpen(record.s_id)}>
                        <ListItemText primary={record.companyname} style={{width:"10px"}}/>
                        <ListItemText primary={record.currentvalue} style={{direction:"rtl"}} />
                        <ListItemText primary={record.typeofstock} style={{direction:"rtl"}} />
                        <Button variant="contained" style={{backgroundColor:"green",color:"white"}} onClick={(e)=>{e.preventDefault()}}>Buy</Button>
                    </ListItem>
            ))}
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Select Seller"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Content Goes here
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button color="primary" autoFocus>
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}