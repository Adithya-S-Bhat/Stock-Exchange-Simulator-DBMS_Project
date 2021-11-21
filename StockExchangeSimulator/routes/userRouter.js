const express = require('express');
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { Client } = require('pg');
const { response } = require('express');

const admin = new Client({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: '1234',
    database: 'stockexchange'
});
admin.connect();

admin.on("connect", () => {
    console.log("Connected to database by admin");
});

const investor = new Client({
    host: 'localhost',
    port: 5432,
    user: 'investor',
    password: '1234',
    database: 'stockexchange'
});
investor.connect();

investor.on("connect", () => {
    console.log("Connected to database by Investor");
});
const broker = new Client({
    host: 'localhost',
    port: 5432,
    user: 'broker',
    password: '1234',
    database: 'stockexchange'
});
broker.connect();

broker.on("connect", () => {
    console.log("Connected to database by broker");
});

router.post("/getUsername",async (req,res) => {
    try{
        let {Iid} = req.body;
        
        admin.query("select * from investorsAndTraders where i_id=$1",[Iid],(err,response)=>{
            if (err) {
                console.log(err);
            } else {
                return res.status(200).send(response.rows[0]);
            }});
        }catch (error) {
            res.status(500).send(error);
        }
    });

router.post("/transactionAdd",async (req,res) => {
    try{
        let {amount,today_date,modeAddSelected,type_of_trac,id} = req.body;
        investor.query("INSERT INTO transactions(amount,dateoftransaction,modeoftransaction,typeoftransaction,i_id) VALUES($1,$2,$3,$4,$5)",[amount,today_date,modeAddSelected,type_of_trac,id], (err,response)=>{
            if (err) {
                console.log(err);
            } else {
                investor.query("UPDATE investorsAndTraders SET marginavailable=marginavailable+$1 where i_id=$2",[amount,id],(err,response2)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send({"updation":"OK"});
                    }});
                    //res.status(200).send({"insertion":"OK"});
            }});
    }catch (error) {
        res.status(500).send(error);
    }
});

router.post("/transactionWithdraw",async (req,res) => {
    try{
        let {amount,dd,modeWithdrawSelected,type_of_trac,id} = req.body;
        investor.query("INSERT INTO transactions(amount,dateoftransaction,modeoftransaction,typeoftransaction,i_id) VALUES($1,$2,$3,$4,$5)",[amount,dd,modeWithdrawSelected,type_of_trac,id], (err,response)=>{
            if (err) {
                console.log(err);
            } else {
                investor.query("UPDATE investorsAndTraders SET marginavailable=marginavailable-$1 where i_id=$2",[amount,id],(err,response2)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send({"updation":"OK"});
                    }});
            }});
    }catch (error) {
        res.status(500).send(error);
    }
});



router.post("/getUsersListForBroker",async (req,res) => {
    try{
        let {id} = req.body;
        broker.query("select * from investorsAndTraders where broker_id=$1",[id], (err,response)=>{
            if (err) {
                console.log(err);
            } else {
                return res.status(200).send(response.rows);
            }
        });
    }catch (error) {
            res.status(500).send(error);
        }
    });


router.post("/getFunds",async (req,res) => {
    try{
        let {id} = req.body;
        investor.query("select * from investorsAndTraders where i_id=$1",[id], (err,response)=>{
            if (err) {
                console.log(err);
            } else {
                return res.status(200).send({"margin":response.rows[0].marginavailable});
        }
    });
}catch (error) {
        res.status(500).send(error);
    }
});

router.post("/getSellOrders",async (req,res) => {
    try{
        let {id} = req.body;
        admin.query("select stocks.companyname, sell_table.sell_price, sell_table.sell_quantity from sell_table, stocks where sell_table.stock_id = stocks.s_id and seller_id=$1",[id], (err,response)=>{
            if (err) {
                console.log(err);
            } else {
                res.status(200).send(response.rows);
        }
    });
}catch (error) {
        res.status(500).send(error);
    }
});

router.post("/getBuyOrders",async (req,res) => {
    try{
        let {id} = req.body;
        admin.query("select stocks.companyname, buy_table.buy_price, buy_table.buy_quantity from buy_table, stocks where buy_table.stock_id = stocks.s_id and buyer_id=$1",[id], (err,response)=>{
            if (err) {
                console.log(err);
            } else {
                res.status(200).send(response.rows);
        }
    });
}catch (error) {
        res.status(500).send(error);
    }
});


router.post("/getUserId",async (req,res) => {
    try{
        let {username} = req.body;
        admin.query("select * from users where username=$1",[username], (err, response) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(200).send({"id":response.rows[0].id});
            }
    });
    }catch (error) {
        res.status(500).send(error);
    }
    });


router.post("/getAllStocks",async (req,res) => {
    try{
        admin.query("select * from stocks", (err, response) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(response.rows);
                res.status(200).send(response.rows);
            }
    });
    }catch (error) {
        res.status(500).send(error);
    }
    });    

router.post("/getStockHoldings",async (req,res) => {
    try{          
        let {id} = req.body;
        admin.query("select * from holdsstocks NATURAL JOIN stocks where i_id=$1",[id], (err, response) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send(response.rows);
            }
    });
    }catch (error) {
        res.status(500).send(error);
    }
    });  

router.post("/getStockHoldingsNames",async (req,res) => {
    try{          
        let {id} = req.body;
        admin.query("select * from stocks where s_id=$1",[id], (err, response) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send(response.rows);
            }
    });
    }catch (error) {
        res.status(500).send(error);
    }
    });  


router.post("/signup",async (req,res) => {
    try {
        let {email, password, user} = req.body;
        let broker;
        if(user=="Broker")
            broker=true;
        else
            broker=false;

        admin.query("INSERT INTO users(username,password,isbroker) VALUES($1,crypt($2,gen_salt('bf')),$3)",[email,password,broker], (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.status(200).send({"code":1});
                }
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
        admin.query("Select * from users where username=$1 AND password is NOT NULL AND password = crypt($2,password)",[email,password],async (err,response)=>{
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

router.post("/brokerform", async(req,res)=>{
    try{
        let {userID,name, website, address, rate} = req.body;
        // console.log(name, website, address, rate);
        broker.query("INSERT INTO brokers(broker_id,name,website,address,brokerageRate) VALUES($1,$2,$3,$4,$5)",[userID,name, website, address, rate], async (err,response) =>{
            if (err) {
                console.log(err);
            } else {
                return res.status(200).json({msg : "Broker Registered Successfully"});
            }
        });
    }catch(error){
        res.status(500).send(error);
    }
});

router.post("/investorForm",async (req,res)=>{
    try{
        let {userID,name,dob,aadhar,phone,pin,city,state,brokerSelected}=req.body;
        investor.query("INSERT INTO investorsAndTraders(i_id,name_i,dob,aadharnumber,phonenumber,pincode,city,state_i,marginavailable,broker_id)\
         values($1,$2,$3,$4,$5,$6,$7,$8,20000,$9)",[userID,name,dob,aadhar,phone,pin,city,state,brokerSelected],async(err,response)=>{
            if (err) {
                console.log(err);
            } else {
                return res.status(200).send({"code":1});
            }
        })
    }
    catch(error){
        res.status(500).send(error);
    }
});


router.get("/getBrokers",async (req,res)=>{
    try{
        broker.query("Select * from brokers",async(err,response)=>{
            if(err){
                console.log(error);
            }
            else{
                //console.log(response.rows);
                return res.status(200).send(response.rows);
            }
        })
    }
    catch(error){
        res.status(500).send(error);
    }
});

// router.post("/buyStock",async(req,res)=>{
//     console.log(req.body);
//     let id = req.body.user_id;
//     let sid = req.body.sid;
//     let price = parseInt(req.body.price);
//     let quantity = parseInt(req.body.quantity);
//     try{
//         client.query("select buy($1,$2,$3,$4)",[id,sid,price,quantity],async(err,response)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log(response.rows);
//                 res.status(200).send(response.rows);
//             }
//         })
//     }
//     catch(error){
//         res.status(500).send(error);
//     }
// });

router.post("/getUsername",async(req,res)=>{
    
    try{
        admin.query("select * from investorsAndTraders where i_id=$1",[req.body.id],async(err,response)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(response.rows);
            }
        })
    }
    catch(error){
        res.status(500).send(error);
    }
});

router.post("/addStock",async(req,res)=>{
    let id = req.body.investorID;
    let sid = req.body.buySid;
    let price = req.body.addPrice;
    let quantity = req.body.addQuantity;
    try{
        admin.query("select buy($1,$2,$3,$4)",[id,sid,price,quantity],async(err,response)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(response.rows);
            }
        })
    }
    catch(error){
        res.status(500).send(error);
    }
});




router.post("/exitStock",async(req,res)=>{
    let id = req.body.investorID;
    let sid = req.body.exitSid;
    let price = parseInt(req.body.exitPrice);
    let quantity = parseInt(req.body.exitQuantity);
    
    try{
        admin.query("select sell($1,$2,$3,$4)",[id,sid,price,quantity],async(err,response)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(response.rows);
            }
        })
    }
    catch(error){
        res.status(500).send(error);
    }
});



router.post("/getSellTable",async (req,res)=>{
    let {id}=req.body;
    try{
        admin.query("select * from sell_table where stock_id=$1",[id],async(err,response)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(response.rows);
            }
        })
    }
    catch(error){
        res.status(500).send(error);
    }
});


router.post("/getBuyTable",async (req,res)=>{
    let {id}=req.body;
    try{
        admin.query("select * from buy_table where stock_id=$1",[id],async(err,response)=>{
            if(err){
                console.log(err);
            }
            else{
                // console.log(response.rows);
                res.status(200).send(response.rows);
            }
        })
    }
    catch(error){
        res.status(500).send(error);
    }
});

router.post("/isBroker",async (req,res)=>{
    let {email}=req.body;
    try{
        admin.query("select isbroker from users where username=$1 and isbroker='TRUE'",[email],async(err,response)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(response.rows);
            }
        });
    }
    catch(error){
        res.status(500).send(error);
    }
});

router.get("/getMarketValue",async (req,res)=>{
    try{
        investor.query("select t,totalvalue from marketvalue",async(err,response)=>{
            if(err)
                console.log(err);
            else{
                res.status(200).send(response.rows);
            }
        });
    }
    catch(error){
        res.status(500).send(error);
    }
});

module.exports = router;