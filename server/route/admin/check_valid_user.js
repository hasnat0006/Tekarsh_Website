const express = require("express");
const sql = require("../../connection/db");
const router = express.Router();




router.get("/admin/login", async (req, res) => {
    const {email, password} = req.query;
    console.log("Received data:", {email, password});
    try {
        const result = await sql`
            SELECT * FROM admin_user WHERE email = ${email} AND password = ${password}
        `;
        console.log("Query result:", result);
        if (result.length > 0) {
            res.status(200).json({ok: true, result: result[0]});
        } else {
            res.status(401).json({ok: false, error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ok: false, error: "Internal server error" });
    }
});

router.get("/admin/check_valid_user", async (req, res) => {
    const { userid } = req.query;
    console.log("Received request to check valid user:", { userid });

    try {
        const result = await sql`
            SELECT * FROM admin_user WHERE id = ${userid}
        `;
        console.log("Query result:", result);
        
        if (result.length > 0) {
            res.status(200).json({ valid: true, user: result[0] });
        } else {
            res.status(404).json({ valid: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({valid: false, error: "Internal server error" });
    }
});


module.exports = router;
