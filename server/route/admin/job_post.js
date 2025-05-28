const express = require("express");
const sql = require("../../connection/db");
const { route } = require("./dashboard");
const router = express.Router();





const postNewJob = async (id, formData) => {
    console.log("Received ID:", id);
    console.log("Received form data:", formData);
    try {
        const result = await sql`
            INSERT INTO job_post (user_id, status, description)
            VALUES (${id}, ${formData.status}, ${formData})
            RETURNING *
        `;
        console.log("Insert result:", result);
        return result;
    } catch (error) {
        console.error("Error inserting job post:", error);
        throw error;
    }
};

const editJobPost = async (id, formData) => {
    console.log("Received ID for edit:", id);
    console.log("Received form data for edit:", formData);
    try {
        const result = await sql`
            UPDATE job_post
            SET description = ${formData}
            , status = ${formData.status}
            WHERE job_id = ${id}
            RETURNING *
        `;
        console.log("Update result:", result);
        return result;
    } catch (error) {
        console.error("Error updating job post:", error);
        throw error;
    }
}


router.post("/admin/job_post", async (req, res) => {
    const data = req.body;
    console.log("Received id:", data.userid);
    console.log("Received form data:", data.formData);
    let result;
    if (data.formData.job_id)
        result = await editJobPost(data.formData.job_id, data.formData);
    else
        result = await postNewJob(data.userid, data.formData);

    if (result) {
        res.status(200).json({ message: "Job post created successfully", jobPost: result[0] });
    } else {
        res.status(500).json({ error: "Failed to create job post" });
    }
});

router.get("/admin/fetch_job_posts", async (req, res) => {
    const user_id = req.query.id;
    console.log("Received user ID:", user_id);
    try {
        const result = await sql`
            SELECT job_id, created_at, description, status
            FROM job_post
            WHERE user_id = ${user_id}
            ORDER BY created_at DESC
        `;
        console.log("Fetch result:", result);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "No job posts found" });
        }
    } catch (error) {
        console.error("Error fetching job posts:", error);
        res.status(500).json({ error: "Failed to fetch job posts" });
    }
}
);

router.get("/admin/changeStatus", async (req, res) => {
    const jobId = req.query.id;
    console.log("Received job ID:", jobId);
    if (!jobId) {
        return res.status(400).json({ error: "Job ID is required" });
    }
    try {
        const result = await sql`
            UPDATE job_post
            SET status = NOT status
            WHERE job_id = ${jobId}
            RETURNING *
        `;
        console.log("Update result:", result);
        if (result.length > 0) {
            res.status(200).json({ message: "Job post status updated successfully", ok: true, jobPost: result[0] });
        } else {
            res.status(404).json({ error: "Job post not found", ok: false });
        }
    } catch (error) {
        console.error("Error updating job post status:", error);
        res.status(500).json({ error: "Failed to update job post status", ok: false });
    }
}
);


router.get("/admin/delete_job", async (req, res) => {
    const jobId = req.query.id;
    console.log("Received job ID for deletion:", jobId);
    if (!jobId) {
        return res.status(400).json({ error: "Job ID is required" });
    }
    try {
        const result = await sql`
            DELETE FROM job_post
            WHERE job_id = ${jobId}
            RETURNING *
        `;
        console.log("Delete result:", result);
        if (result.length > 0) {
            res.status(200).json({ message: "Job post deleted successfully", ok: true });
        } else {
            res.status(404).json({ error: "Job post not found", ok: false });
        }
    } catch (error) {
        console.error("Error deleting job post:", error);
        res.status(500).json({ error: "Failed to delete job post", ok: false });
    }
});


router.get("/admin/specific_job_post", async (req, res) => {
    const jobId = req.query.id;
    console.log("Received job ID for specific job post:", jobId);
    if (!jobId) {
        return res.status(400).json({ error: "Job ID is required", ok: false });
    }
    try {
        const result = await sql`
            SELECT *
            FROM job_post as j, applicants as a
            WHERE j.job_id = a.job_id
            AND j.job_id = ${jobId}
        `;
        // console.log("Specific job post result:", result);
        if (result.length > 0) {

            const applicants = result.map(applicant => ({
                applicants_id: applicant.applicants_id,
                name: applicant.name,
                email: applicant.email,
                phone: applicant.phone,
                cv_link: applicant.cv_link,
                analysis_data: applicant.analysis_data,
                cv_data: applicant.cv_data,
                status: applicant.status,
                created_at: applicant.created_at,
                job_description: {
                    job_id: applicant.job_id,
                    title: applicant.title,
                    department: applicant.department,
                    location: applicant.location,
                    type: applicant.type,
                    experience: applicant.experience,
                    description: applicant.description,
                    responsibilities: applicant.responsibilities,
                    requirements: applicant.requirements,
                    preferred: applicant.preferred,
                    salary: applicant.salary,
                    benefits: applicant.benefits,
                }
            }));


            res.status(200).json({ applicants: applicants, ok: true });
        } else {
            res.status(404).json({ error: "Job post not found", ok: false });
        }
    } catch (error) {
        console.error("Error fetching specific job post:", error);
        res.status(500).json({ error: "Failed to fetch specific job post", ok: false });
    }
});

module.exports = router;
