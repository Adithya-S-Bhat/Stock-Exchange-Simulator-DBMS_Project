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
// client.query('SELECT * FROM banks WHERE bankname=$1 AND branch=$2',['ICICI Bank','West Bengal'], (err, res) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res.rows);
//     }
//     client.end();
// });

// client.on("end", () => {
//     console.log("Disconnected from database");
// });
