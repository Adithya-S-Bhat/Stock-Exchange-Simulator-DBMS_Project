import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useNavigate } from "react-router-dom"; 


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    formRoot:{
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
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
    }
  }));  

export default function HomePage(){
    const classes = useStyles();
    let username = localStorage.getItem("username")
    let id = localStorage.getItem("id")
    const ID = {id};
    const userName = {username};
    const [stocks,setStocks]=useState([]);
    const [sellTable,setSellTable]=useState([]);
    const [buyTable,setBuyTable]=useState([]);
    const [price,setPrice]=useState();
    const [quantity,setQuantity]=useState();
    const [open, setOpen] = React.useState(false);
    const [sid, setSid] = React.useState();
    const [userNAME, setUserNAME] = React.useState();
    let navigate = useNavigate();
  
    const handleClickOpen = (id) => {
        const obj={id};
        Axios.post("http://localhost:8000/users/getSellTable",obj).then((response)=>{
            setSellTable(response.data);
            setSid(id);
            setOpen(true);
        });

        Axios.post("http://localhost:8000/users/getBuyTable",obj).then((response)=>{
          setBuyTable(response.data);
          // setSid(id);
          setOpen(true);
      });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleBuy=()=>{
        let investorID = ID.id;
        let buySid = parseInt(sid);
        let addPrice = parseFloat(price);
        let addQuantity = parseInt(quantity);
        const obj = {
          investorID,buySid,addPrice,addQuantity
        };
  
        Axios.post(
          "http://localhost:8000/users/addStock",
          obj
        ).then((response)=>{
        });
    }

    const initialisation=async()=>{
        //authenticate
        if(localStorage.getItem('username')===null){
             navigate("/")
        }
        else{
            await Axios.post(
                "http://localhost:8000/users/getUserId",
                userName
            ).then((response)=>{
                localStorage.setItem("id", response.data.id);
            });
            
            let Iid= localStorage.getItem("id");
            //let id_int = Number(id)
            const user_id = {Iid};
            await Axios.post(
                "http://localhost:8000/users/getUsername",
                user_id
            ).then((response)=>{
                setUserNAME(response.data.name_i);
            })

            await Axios.post(
                "http://localhost:8000/users/getAllStocks",
            ).then((response)=>{
                //console.log(response.data)
                setStocks(response.data)
            });
        }
    }
    useEffect(()=>{
        initialisation();
    },[]);
    return (
        <div className="HomePage">
            <Typography variant="h5" style={{"text-align": "left"}}>Welcome {userNAME}!</Typography>
            <br/><br/>
            <Typography variant="h5">Stocks List</Typography>
            <br/>
            <div className={classes.root}>
                <ListItem style={{backgroundColor:"black"}}>
                    <ListItemText primary="Stock Name" style={{width:"10px",fontWeight:"bolder"}}/>
                    <ListItemText primary="Price" style={{direction:"rtl",width:"65px"}} />
                    <ListItemText primary="Type" style={{direction:"rtl",width:"105px"}} />
                </ListItem>
                {stocks.map((record) => (
                        //console.log(record)
                        <ListItem button key={record.s_id} onClick={()=>handleClickOpen(record.s_id)}>
                            <ListItemText primary={record.companyname} style={{width:"10px"}}/>
                            {record.difference>=0?<ListItemText primary={'(+'+record.difference+')'+record.currentvalue} style={{direction:"rtl",color:"#62fcaf"}}/>
                            :<ListItemText primary={'('+record.difference+')'+record.currentvalue} style={{direction:"rtl",color:"red"}}/>}
                            <ListItemText primary={record.typeofstock} style={{direction:"rtl"}} />
                            <Button variant="contained" style={{backgroundColor:"green",color:"white"}} onClick={(e)=>{e.preventDefault()}}>Buy</Button>
                </ListItem>
                ))}
            </div> 
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Trade"}</DialogTitle>
                <DialogContent  fullWidth={ true } maxWidth={"md"} dividers={true}>
                    <Typography variant="h6" style={{padding:"4%"}}>Create Buy Request</Typography>
                    <form onSubmit={handleBuy} className={classes.formRoot}>
                        <TextField
                        label="Enter Stock Price"
                        variant="filled"
                        required
                        value={price}
                        onChange={e => setPrice(e.target.value)}/>
                        <TextField
                        label="Enter Quantity"
                        variant="filled"
                        required
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}/>
                        <br/>
                        <Button type="submit" variant="contained" color="primary">
                        Confirm
                        </Button>
                    </form>
                    <DialogContentText id="alert-dialog-description">                      
                        <Typography variant="h6">Buyers</Typography>
                        {<ListItem style={{backgroundColor:"black",fontWeight:"bolder"}}>
                            <ListItemText primary="Stock Price"/>
                            <ListItemText primary="Quantity" style={{direction:"rtl"}} />
                        </ListItem>}
                        {buyTable.length!==0?buyTable.map((record) => (
                                <ListItem button key={record.buyer_id}>
                                    <ListItemText primary={record.buy_price}/>
                                    <ListItemText primary={record.buy_quantity} style={{direction:"rtl"}} />
                                </ListItem>
                        )):<Typography variant="subtitle1" style={{backgroundColor:"GrayText",padding:"1%"}}>No Buyers Available currently</Typography>}
                    </DialogContentText>
                    <br/>
                    <DialogContentText id="alert-dialog-description">                      
                        <Typography variant="h6">Sellers</Typography>
                        <ListItem style={{backgroundColor:"black",fontWeight:"bolder"}}>
                            <ListItemText primary="Stock Price"/>
                            <ListItemText primary="Quantity" style={{direction:"rtl"}} />
                        </ListItem>
                        {sellTable.length!==0?sellTable.map((record) => (
                                <ListItem button key={record.seller_id}>
                                    <ListItemText primary={record.sell_price}/>
                                    <ListItemText primary={record.sell_quantity} style={{direction:"rtl"}} />
                                </ListItem>
                        )):<Typography variant="subtitle1" style={{backgroundColor:"GrayText",padding:"1%"}}>No Sellers Available currently</Typography>}
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <center>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                    </center>
                </DialogActions>
            </Dialog>

        </div>
    );
}