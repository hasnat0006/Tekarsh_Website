const express = require('express')
const app = express()
const cors = require("cors");
const rateLimit = require('express-rate-limit');

app.use(cors());

require("dotenv").config({ path: "./.env" });
app.use(express.json());


const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: 15 * 60 
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});


const strictLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: {
    error: 'Too many requests for this operation, please try again later.',
    retryAfter: 60 
  },
  standardHeaders: true,
  legacyHeaders: false,
});


const aiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 3, 
  message: {
    error: 'CV analysis rate limit exceeded. Please wait before analyzing another CV.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});


app.use(generalLimiter);


const sql = require("./connection/db");
const contact = require("./route/user_side/contact");
const job_apply = require("./route/user_side/applicants");
const available_jobs = require("./route/user_side/jobs");
const manage_applicants = require("./route/admin/manage_applicants");


const job_post = require("./route/admin/job_post");
const check_valid_user = require("./route/admin/check_valid_user");

app.use(contact);
app.use(job_post);


app.use('/analyze-cv', aiLimiter);
app.use('/generate-summary', aiLimiter);

app.use(job_apply);
app.use(available_jobs);


app.use('/admin', strictLimiter);

app.use(check_valid_user);
app.use(manage_applicants);

app.get('/', (req, res) => {
    res.send('Hello World!')
})



const port = 5000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
