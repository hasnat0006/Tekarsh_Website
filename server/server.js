const express = require('express')
const app = express()
const cors = require("cors");


require("dotenv").config({ path: "./.env" });
app.use(cors());
app.use(express.json());


const sql = require("./connection/db");
const contact = require("./route/user_side/contact");
const job_apply = require("./route/user_side/applicants");
const available_jobs = require("./route/user_side/jobs");
const manage_applicants = require("./route/admin/manage_applicants");


const job_post = require("./route/admin/job_post");
const check_valid_user = require("./route/admin/check_valid_user");

app.use(contact);
app.use(job_post);
app.use(job_apply);
app.use(available_jobs);
app.use(check_valid_user);
app.use(manage_applicants);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = 5000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
