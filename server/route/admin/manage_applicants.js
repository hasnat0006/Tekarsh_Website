const express = require("express");
const sql = require("../../connection/db");
const router = express.Router();


router.get("/get-applicants", async (req, res) => {
    try {
        const applicants = await sql`
            SELECT a.applicants_id, a.name, a.email, a.phone, a.cv_link, a.analysis_data, a.cv_data, a.status, j.description AS job_description
            FROM applicants AS a
            JOIN job_post AS j ON a.job_id = j.job_id
            ORDER BY a.created_at DESC
        `;
        console.log("Fetched applicants:", applicants);
        res.status(200).json({ applicants, ok: true });
    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ error: "Failed to fetch applicants", ok: false });
    }
}
);




module.exports = router;