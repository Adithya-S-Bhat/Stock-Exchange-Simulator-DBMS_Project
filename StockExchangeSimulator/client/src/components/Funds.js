import React,{useEffect} from 'react';
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
import { makeStyles } from '@material-ui/core';


export default function Funds(){
    const [margin, setMargin] = React.useState('');

    const [open_add, setOpen_Add] = React.useState(false);
    const [open_withdraw, setOpen_withdraw] = React.useState(false);

    const [amount_add, setAmountAdd] = React.useState('');
    const [amount_withdraw, setAmountWithdraw] = React.useState('');

    const [modeAddSelected,setModeAddSelected] = React.useState('Bank Transfer');
    const [modeWithdrawSelected,setModeWithdrawSelected] = React.useState('Bank Transfer');

    const initialisation=async()=>{
        let id = localStorage.getItem("id");
        let user_id = {id};
        await Axios.post(
            "http://localhost:8000/users/getFunds",
            user_id
        ).then((response)=>{
            setMargin(response.data.margin);
        });

    }
    const handleClickAdd = () => {
        setOpen_Add(true);
    };
    const handleClickWithdraw = () => {
        setOpen_withdraw(true);
    };
    const handleCloseAdd = () => {
        setOpen_Add(false);
    };
    const handleCloseWithdraw = () => {
        setOpen_withdraw(false);
    };

    const handleAddSubmit = e => {
        e.preventDefault();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        let today_date = dd+'-'+mm+'-'+yyyy;
        let type_of_trac = "Credit"
        let id = localStorage.getItem("id");
        let amount = parseInt(amount_add)

        const add_funds = {amount,today_date,modeAddSelected,type_of_trac,id};
        Axios.post(
            "http://localhost:8000/users/transactionAdd",
            add_funds
        ).then((response)=>{
            if(response.data.length!=0){
                setOpen_Add(false);
                let id = localStorage.getItem("id");
                let user_id = {id};
                Axios.post(
                    "http://localhost:8000/users/getFunds",
                    user_id
                ).then((response)=>{
                    setMargin(response.data.margin);
                });
            }
        });
    }

    const handleWithdrawSubmit = e => {
        e.preventDefault();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        let today_date = dd+'-'+mm+'-'+yyyy;
        let type_of_trac = "Withdraw"
        let id = localStorage.getItem("id");
        let amount=parseFloat(amount_withdraw);
        const withdraw_funds = {amount,dd,modeWithdrawSelected,type_of_trac,id};
        Axios.post(
            "http://localhost:8000/users/transactionWithdraw",
            withdraw_funds
        ).then((response)=>{
            if(response.data.length!=0){
                setOpen_withdraw(false);
                let id = localStorage.getItem("id");
                let user_id = {id};
                Axios.post(
                    "http://localhost:8000/users/getFunds",
                    user_id
                ).then((response)=>{
                    setMargin(response.data.margin);
                });
            }
        });
    }

    useEffect(()=>{
        initialisation();
    },[]);

    return (
        <div>
            <p>Margin Available:</p>            
            <h2>₹{margin}</h2>
            <Button variant="contained" onClick={()=>handleClickAdd()}>Add Funds</Button><span>&nbsp;</span>
            <Button variant="contained" onClick={()=>handleClickWithdraw()}>Withdraw Funds</Button>

            <Dialog open={open_add} onClose={handleCloseAdd}>
                <DialogTitle>Add funds to your account</DialogTitle>
                <DialogContent>
                <form onSubmit={handleAddSubmit}>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter the amount"
                type="number"
                InputProps={{ inputProps: { min: 100, max: 100000 } }}
                onChange={e => setAmountAdd(e.target.value)}
                fullWidth
                variant="standard"
                />
                <DialogContentText>
                Select how you want to add funds.
                </DialogContentText>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                width="100%"
                value={modeAddSelected}
                onChange={e => setModeAddSelected(e.target.value)}>
                <MenuItem key="1" value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem key="2" value="Credit Card">Credit Card</MenuItem>
                <MenuItem key="3" value="Debit Card">Debit Card</MenuItem>
                <MenuItem key="4" value="UPI">UPI</MenuItem>
                </Select>
                <div>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
                </div>
                </form>
                </DialogContent>
            </Dialog>


            <Dialog open={open_withdraw} onClose={handleCloseWithdraw}>
                <DialogTitle>Withdraw funds to your account</DialogTitle>
                <DialogContent>
                <form onSubmit={handleWithdrawSubmit}>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter the amount"
                type="number"
                InputProps={{ inputProps: { min: 1, max: margin } }}
                onChange={e => setAmountWithdraw(e.target.value)}
                fullWidth
                variant="standard"
                />
                <DialogContentText>
                Select how you want to withdraw funds.
                </DialogContentText>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                width="100%"
                value={modeWithdrawSelected}
                onChange={e => setModeWithdrawSelected(e.target.value)}>
                <MenuItem key="1" value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem key="2" value="UPI">UPI</MenuItem>
                </Select>
                <div>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
                </div>
                </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}