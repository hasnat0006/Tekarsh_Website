const express = require("express");
const sql = require("../../connection/db");
const router = express.Router();


router.get("/get-jobs", async (req, res) => {
    try {
        const jobs = await sql`
            SELECT job_id, user_id, status, description, created_at
            FROM job_post
            WHERE status = true
            ORDER BY created_at DESC
        `;
        console.log("Fetched jobs:", jobs);
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});



module.exports = router;
