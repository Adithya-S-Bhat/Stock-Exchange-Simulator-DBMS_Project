import Axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function HomePage(){
    let username = localStorage.getItem("username")
    const userName = {username};
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
            console.log(response.data)
        });
    }
    useEffect(()=>{
        initialisation();
    },[]);
    return (
        <div className="HomePage">
            <p>Display values</p>
            <button>
                Display Holdings
            </button>
        </div>
    );
}