import React,{useEffect} from 'react';
import Axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })); 

export default function BrokerView(){
    const classes = useStyles();
    const [usersList, setUsersList] = React.useState([]);
    const initialisation=async()=>{
    let username = localStorage.getItem("username");
    let userName = {username};
    await Axios.post(
        "http://localhost:8000/users/getUserId",
        userName
    ).then((response)=>{
        localStorage.setItem("id", response.data.id);
    });
    let id = localStorage.getItem("id");
    let broker_id = {id};
    await Axios.post(
        "http://localhost:8000/users/getUsersListForBroker",
        broker_id
    ).then((response)=>{
        setUsersList(response.data);
    });
}
useEffect(()=>{
    initialisation();
},[]);

return (
        <div className={classes.root}>
            <h1 style={{verticalAlign: "middle"}}> Clients </h1>
        <ListItem style={{backgroundColor:"black",fontWeight:"bolder"}}>
            <ListItemText primary="Investor Name" style={{width:"150px"}}/>
            <ListItemText primary="Phone Number" style={{direction:"rtl",width:"175px"}} />
            <ListItemText primary="Aadhar Number" style={{direction:"rtl",width:"160px"}} />
            <ListItemText primary="Pincode" style={{direction:"rtl",width:"110px"}} />
            <ListItemText primary="City" style={{direction:"rtl",width:"100px"}} />
            <ListItemText primary="State" style={{direction:"rtl",width:"105px"}} />
        </ListItem>
        {usersList.map((record) => (
                <ListItem>
                    <ListItemText primary={record.name_i}style={{width:"150px"}}/>
                    <ListItemText primary={record.phonenumber} style={{direction:"rtl",width:"175px"}}/>
                    <ListItemText primary={record.aadharnumber} sstyle={{direction:"rtl",width:"160px"}}/>
                    <ListItemText primary={record.pincode} style={{direction:"rtl",width:"120px"}}/>
                    <ListItemText primary={record.city} style={{direction:"rtl",width:"100px"}}/>
                    <ListItemText primary={record.state_i} style={{direction:"rtl",width:"105px"}}/>
                </ListItem>
        ))}
        </div>
);
}
