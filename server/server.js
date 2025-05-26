const express = require('express')
const app = express()
const cors = require("cors");


require("dotenv").config({ path: "./.env" });
app.use(cors());
app.use(express.json());


const sql = require("./connection/db");
const job_apply = require("./route/job_apply/applicants");

app.use("/job_apply", job_apply);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = 5000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
