const express = require('express');
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: '1234',
    database: 'stockexchange'
});
client.connect();

client.on("connect", () => {
    console.log("Connected to database");
});


router.post("/signup",async (req,res) => {
    try {
        let {firstName, lastName, email, password} = req.body;
        console.log(firstName, lastName, email, password);
        // const salt = await bcrypt.genSalt(10);
        // const passwordHash = await bcrypt.hash(password, salt);

        client.query("INSERT INTO users(username,password,isbroker) VALUES($1,crypt($2,gen_salt('bf')),FALSE)",[email,password], (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response.rows);
                    return res.status(200).send({"code":1});
                }
                // client.end();
            });
            
            client.on("end", () => {
                console.log("Disconnected from database");
            });
              
} catch (error) {
    res.status(500).send(error);
}
});

        

router.post("/login",async(req,res)=>{
    try{
        let {email,password}=req.body;
        
        //get password from sql
        let userPassword;
        console.log(email,password)
        client.query("Select * from users where username=$1 AND password is NOT NULL AND password = crypt($2,password)",[email,password],async (err,response)=>{
            if (err) {
                console.log(err);
            } else {
                if(response.rows.length==0){
                    //console.log("Incorrect Credentials")
                    return res.status(200).send({"code":0});
                }
                else
                    //console.log("Login Successful");
                    return res.status(200).send({"code":1});
            }
        })
    }
    catch(error){
        res.status(500).send(error);
    }
});

module.exports = router;