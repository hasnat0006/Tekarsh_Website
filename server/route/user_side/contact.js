const express = require("express");
const sql = require("../../connection/db");
const router = express.Router();

router.post("/contact", async (req, res) => {
    const { fullName, email, subject, message, phoneNo } = req.body;
    console.log("Received contact form data:", req.body);

    if (!fullName || !email || !subject || !message || !phoneNo) {
        return res.status(400).json({ ok: false, error: "All fields are required" });
    }

    try {
        const result = await sql`
            INSERT INTO contact (name, email, subject, description, phone)
            VALUES (${fullName}, ${email}, ${subject}, ${message}, ${phoneNo})
            RETURNING *
        `;
        console.log("Contact form submitted successfully:", result);
        res.status(200).json({ message: "Contact form submitted successfully", ok: true });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ ok: false, error: "Failed to submit contact form" });
    }
});

// Get all contact messages
router.get("/messages", async (req, res) => {
    try {
        const contacts = await sql`
            SELECT id, name, email, subject, description, phone, created_at, status
            FROM contact
            ORDER BY created_at DESC
        `;
        console.log("Fetched contact messages:", contacts);
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        res.status(500).json({ error: "Failed to fetch contact messages" });
    }
});


router.get("/message/change_status", async (req, res) => {
    const { messageId, status } = req.query;
    console.log("Received message ID:", messageId);
    if (!messageId || !status) {
        return res.status(400).json({ error: "Message ID is required" });
    }
    try {
        const result = await sql`
            UPDATE contact
            SET status = ${status}
            WHERE id = ${messageId}
            RETURNING *
        `;
        console.log("Update result:", result);
        if (result.length > 0) {
            res.status(200).json({ message: "Message status updated successfully", ok: true, contact: result[0] });
        } else {
            res.status(404).json({ error: "Message not found", ok: false });
        }
    } catch (error) {
        console.error("Error updating message status:", error);
        res.status(500).json({ error: "Failed to update message status" });
    }
});


router.get("/message/reply", async (req, res) => {
    const { messageId, reply } = req.query;
    console.log("Received message ID:", messageId);
    if (!messageId || !reply) {
        return res.status(400).json({ error: "Message ID and reply are required" });
    }
    try {
        const result = await sql`
            UPDATE contact
            SET reply_msg = ${reply}
            WHERE id = ${messageId}
            RETURNING *
        `;
        console.log("Update result:", result);
        if (result.length > 0) {
            res.status(200).json({ message: "Message replied successfully", ok: true, contact: result[0] });
        } else {
            res.status(404).json({ error: "Message not found", ok: false });
        }
    } catch (error) {
        console.error("Error replying to message:", error);
        res.status(500).json({ error: "Failed to reply to message" });
    }
});

module.exports = router;