import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Card, FormControl, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Chart from "react-google-charts";

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
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openExit, setOpenExit] = React.useState(false);
    const [buyTable,setBuyTable]=useState([]);
    const [sellTable,setSellTable]=useState([]);
    const [exitSid, SetExitSid] = React.useState(0);
    const [buySid, SetBuySid] = React.useState(0);

    const [addPrice,setAddPrice]=useState();
    const [addQuantity,setAddQuantity]=useState();
    const [exitPrice,setExitPrice]=useState();
    const [exitQuantity,setExitQuantity]=useState();
    let valueList=[];
    const [marketValueList,setMarketValueList]=useState([]);

    
    const handleClickOpenAdd = (id) => {
      const obj={id};
      SetBuySid(id);
      Axios.post("http://localhost:8000/users/getSellTable",obj).then((response)=>{
          setSellTable(response.data);
          // setSid(id);
          setOpenAdd(true);
      });

    

      Axios.post("http://localhost:8000/users/getBuyTable",obj).then((response)=>{
          setBuyTable(response.data);
          // setSid(id);
          setOpenAdd(true);
      });
    };


    const handleClickOpenExit = (id) => {
      const obj={id};
      SetExitSid(id);
      Axios.post("http://localhost:8000/users/getSellTable",obj).then((response)=>{
          setSellTable(response.data);
          // setSid(id);
          setOpenExit(true);
      });

    

      Axios.post("http://localhost:8000/users/getBuyTable",obj).then((response)=>{
          setBuyTable(response.data);
          // setSid(id);
          setOpenExit(true);
      });
    };


    const handleCloseAdd = () => {
      setOpenAdd(false);
    };

    const handleCloseExit = () => {
      setOpenExit(false);
    };

    const handleAdd = () => {
      let investorID = ID.id;
      const obj = {
        investorID,buySid,addPrice,addQuantity
      };

      Axios.post(
        "http://localhost:8000/users/addStock",
        obj
      ).then((response)=>{
      });
      
    }

    const handleExit = () => {
      let investorID = ID.id;
      const obj = {
        investorID,exitSid,exitPrice,exitQuantity
      };

      Axios.post(
        "http://localhost:8000/users/exitStock",
        obj
      ).then((response)=>{
      });
    }
  
    const initialisation=()=>{
        
      Axios.post(
          "http://localhost:8000/users/getStockHoldings",
          ID
      ).then((response)=>{
          setStockHoldings(response.data)
      });
      Axios.get("http://localhost:8000/users/getMarketValue").then((response)=>{
        response.data.map((record)=>(valueList.push([record.t.slice(0,12),parseInt(record.totalvalue)])));
        valueList.unshift([{ type: 'string', label: 'Time' },{label:'Stock Market Value',type:'number'}])
        setMarketValueList(valueList);
      });
    }
    useEffect(()=>{
        initialisation();
    },[]);
    return (
        <div className="Profile">
        <center>
        <Typography variant="h5">Stock Market Trends</Typography>
        <br/>
        {marketValueList.length!=0?
        <Chart
        width={'600px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Stock Market Chart</div>}
        data={
          marketValueList
        }
        options={{
          hAxis: {
            title: 'Time',
          },
          backgroundColor: {
            fill: '#c39ea0',//'#fbf6a7',
            fillOpacity: 0.8},
          color:"white",
          vAxis: {
            title: 'Stock Market Value (in ₹)',
          },
        }}
      />:<span></span>}
      </center>
      <br/><br/>
            <Typography variant="h5">My Holdings</Typography>
            <br/>
            <div className={classes.root}>
            <ListItem style={{backgroundColor:"black"}}>
                <ListItemText primary="Stock Name" style={{width:"10px",fontWeight:"bolder"}}/>
                <ListItemText primary="Price" style={{direction:"rtl",width:"65px",fontWeight:"bolder"}} />
                <ListItemText primary="Quantity" style={{direction:"rtl",width:"105px",fontWeight:"bolder"}} />
                {/* <ListItemText primary="Add/Exit" style={{direction:"rtl",width:"105px",fontWeight:"bolder"}} /> */}
            </ListItem>
            {stockHoldings.length!=0?stockHoldings.map((record) => ( 
                <ListItem key={record.s_id}>      
                  <ListItemText primary={record.companyname} style={{width:"10px"}}/>
                  <ListItemText primary={record.currentvalue} style={{direction:"rtl"}}/>              
                  <ListItemText primary={record.quantity} style={{direction:"rtl"}}/>
                  <Button variant="contained" style={{backgroundColor:"green",color:"white"}} onClick={(e) => {e.preventDefault(); handleClickOpenAdd(record.s_id)}}>Add</Button>&nbsp;&nbsp;
                  <Button variant="contained" style={{backgroundColor:"crimson",color:"white"}} onClick={(e) => {e.preventDefault(); handleClickOpenExit(record.s_id)}} >Exit</Button>
                </ListItem>   
            )
            ):<Typography variant="subtitle1">Your Holdings will be displayed here</Typography>}
            </div>
            <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Add Stock"}</DialogTitle>
              <DialogContent fullWidth={ true } maxWidth={"md"} dividers={true}>
                <Typography variant="h6" style={{padding:"4%"}}>Create Add Request</Typography>
                <form onSubmit={()=>{handleAdd()}} className={classes.formRoot}>
                    <TextField
                    label="Enter Stock Price"
                    variant="filled"
                    required
                    value={addPrice}
                    onChange={e => setAddPrice(e.target.value)}/>
                    <span>&nbsp;&nbsp;</span>
                    <TextField
                    label="Enter Quantity"
                    variant="filled"
                    required
                    value={addQuantity}
                    onChange={e => setAddQuantity(e.target.value)}/>
                    <br/>
                    <br/>&nbsp;
                    <Button type="submit" variant="contained" color="primary" style={{alignItem:"center"}}>
                      Confirm
                    </Button>
                </form>
                <br/>
                <DialogContentText id="alert-dialog-description">                      
                  {buyTable.length!==0?<Typography variant="h6">Buyers</Typography>:<span></span>}
                  {buyTable.length!==0?<ListItem style={{backgroundColor:"black",fontWeight:"bolder"}}>
                      <ListItemText primary="Stock Price"/>
                      <ListItemText primary="Quantity" style={{direction:"rtl"}} />
                  </ListItem>:<span></span>}
                  {buyTable.map((record) => (
                          <ListItem button key={record.buyer_id}>
                              <ListItemText primary={record.buy_price}/>
                              <ListItemText primary={record.buy_quantity} style={{direction:"rtl"}} />
                          </ListItem>
                  ))}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">                      
                        {sellTable.length!==0?<Typography variant="h6">Sellers</Typography>:<span></span>}
                        {sellTable.length!==0?<ListItem style={{backgroundColor:"black",fontWeight:"bolder"}}>
                            <ListItemText primary="Stock Price"/>
                            <ListItemText primary="Quantity" style={{direction:"rtl"}} />
                        </ListItem>:<span></span>}
                        {sellTable.map((record) => (
                                <ListItem button key={record.seller_id}>
                                    <ListItemText primary={record.sell_price}/>
                                    <ListItemText primary={record.sell_quantity} style={{direction:"rtl"}} />
                                </ListItem>
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseAdd}>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openExit} onClose={handleCloseExit} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Exit Stock"}</DialogTitle>
              <DialogContent fullWidth={ true } maxWidth={"md"} dividers={true}>
              <Typography variant="h6" style={{padding:"4%"}}>Create Exit Request</Typography>
                <form onSubmit={()=>{handleExit()}} className={classes.formRoot}>
                    <TextField
                    label="Enter Stock Price"
                    variant="filled"
                    required
                    value={exitPrice}
                    onChange={e => setExitPrice(e.target.value)}/>
                    <span>&nbsp;</span>
                    <TextField
                    label="Enter Quantity"
                    variant="filled"
                    required
                    value={exitQuantity}
                    onChange={e => setExitQuantity(e.target.value)}/>
                    <br/>
                    <br/>&nbsp;
                    <Button type="submit" variant="contained" color="primary">
                      Confirm
                    </Button>
                </form>
                <br/>
                <DialogContentText id="alert-dialog-description">                      
                  {buyTable.length!==0?<Typography variant="h6">Buyers</Typography>:<span></span>}
                  {buyTable.length!==0?<ListItem style={{backgroundColor:"black",fontWeight:"bolder"}}>
                      <ListItemText primary="Stock Price"/>
                      <ListItemText primary="Quantity" style={{direction:"rtl"}} />
                  </ListItem>:<span></span>}
                  {buyTable.map((record) => (
                          <ListItem button key={record.buyer_id}>
                              <ListItemText primary={record.buy_price}/>
                              <ListItemText primary={record.buy_quantity} style={{direction:"rtl"}} />
                          </ListItem>
                  ))}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">                      
                  {sellTable.length!==0?<Typography variant="h6">Sellers</Typography>:<span></span>}
                  {sellTable.length!==0?<ListItem style={{backgroundColor:"black",fontWeight:"bolder"}}>
                      <ListItemText primary="Stock Price"/>
                      <ListItemText primary="Quantity" style={{direction:"rtl"}} />
                  </ListItem>:<span></span>}
                  {sellTable.map((record) => (
                          <ListItem button key={record.seller_id}>
                              <ListItemText primary={record.sell_price}/>
                              <ListItemText primary={record.sell_quantity} style={{direction:"rtl"}} />
                          </ListItem>
                  ))}
                </DialogContentText>

                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseExit}>
                    Cancel
                </Button>
                
                </DialogActions>
            </Dialog>
            <br/>
            <br/>
            
        </div>
        
    );
}