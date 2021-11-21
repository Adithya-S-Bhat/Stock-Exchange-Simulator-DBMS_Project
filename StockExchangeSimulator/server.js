const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 8001;
app.use(express.json());
app.use(cors());
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/users', require('./routes/userRouter'));


const { Client } = require('pg');
const { report } = require('./routes/userRouter');
const client2 = new Client({
    host: 'localhost',
    port: 5432,
    user: 'database_supervisor',
    password: '1234',
    database: 'stockexchange'
});
client2.connect();

client2.on("connect", () => {
    console.log("Connected to database through supervisor");
});
/*setInterval(function() {
    UpdateStocks()
}, 3000);*/

const admin = new Client({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: '1234',
    database: 'stockexchange'
});
admin.connect();

function updateMarketValue(){
    client2.query("select sum(currentvalue) from stocks",(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
                admin.query("insert into marketvalue(totalValue) values($1)",[res.rows[0].sum],(err,response)=>{
                        if(err)
                            console.log(err);
                });
        }
    }); 
}

function UpdateStocks(){
    client2.query("select * from stocks", (err,response)=>{
        if (err) {
            console.log(err);
        } else {
            for (let i=0; i<response.rows.length; i++){
                let chance = (Math.random()) *200 - 100;
		        let price = chance/10; 
                client2.query("UPDATE stocks set currentValue=currentValue+$2,difference=$2 where s_id=$1",[response.rows[i].s_id,price], (err,response2)=>{
                    if (err) {
                        console.log("error");
                    } else {
                        // return response.status(200).send({"Update":"OK"});
                        //console.log("Update Done");
                    }
        });
        updateMarketValue();
    }
}
});
}
    