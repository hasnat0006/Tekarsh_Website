const express = require("express");
const sql = require("../../connection/db");
const router = express.Router();
const { Readable } = require("stream");

const supabase = require("../../connection/auth");

const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const { z, number } = require("zod");
const e = require("express");
const { on } = require("events");
const { ok } = require("assert");


const schema = z.object({
    basicInfo: z.object({
        fullName: z.string().describe("Full name of the applicant, including first name and last name."),
        email: z.string().email().optional().nullable().describe("Email address of the applicant. This field is optional but should be a valid email format."),
        personalSummary: z.string().describe("A brief summary of the applicant's professional background or educational background, career goals and how they align with the job they are applying for.").optional().nullable(),
        phone: z.string().optional().nullable().describe("Phone number of the applicant. This field is optional but should be a valid phone number format."),
        location: z.string().optional().nullable().describe("Location of the applicant, such as city or country. This field is optional but should be a valid location format."),
        topSkills: z.array(z.string()).optional().nullable().describe("List of top skills of the applicant, relevant to the job they are applying for. This field is optional but should be an array of strings."),
    }),
    socialInfo: z.object({
        linkedin: z.string().optional().nullable().describe("LinkedIn profile URL of the applicant."),
        github: z.string().optional().nullable().describe("GitHub profile URL of the applicant."),
        portfolio: z.string().optional().nullable().describe("Portfolio website URL of the applicant.")
    }).optional().nullable(),
    education: z.array(z.object({
        degree: z.string().describe("Degree obtained by the applicant."),
        university: z.string().describe("University or institution attended by the applicant."),
        startYear: z.string().describe("Year the applicant started their education."),
        graduationYear: z.string().optional().nullable().describe("Year the applicant graduated or will graduate.")
    })).optional().nullable(),
    skills: z.array(z.string()).describe("Available skills possessed by the applicant."),
    projects: z.array(z.object({
        title: z.string().describe("Title of the project."),
        description: z.string().describe("Description of the project."),
        technologies: z.array(z.string()).describe("List of technologies used in the project."),
        duration: z.string().optional().nullable().describe("Duration of the project."),
        links: z.string().optional().nullable().describe("Live links related to the project.")
    })).optional().nullable(),
    experience: z.array(z.object({
        company: z.string().describe("Name of the company where the applicant worked."),
        role: z.string().optional().nullable().describe("Role of the applicant in the company."),
        duration: z.string().optional().nullable().describe("Duration of the applicant's employment."),
        responsibilities: z.string().optional().nullable().describe("Responsibilities held by the applicant in the company."),
    })).optional().nullable(),
    certifications: z.array(z.object({
        title: z.string().describe("Title of the certification."),
        issuingOrganization: z.string().optional().nullable().describe("Issuing organization of the certification."),
        issueDate: z.string().optional().nullable().describe("Issue date of the certification."),
        credentialId: z.string().optional().nullable().describe("Credential ID of the certification."),
        credentialUrl: z.string().optional().nullable().describe("Credential URL of the certification.")
    })).optional().nullable(),
    achievements: z.array(z.object({
        title: z.string().describe("Title of the achievement."),
        description: z.string().nullable().optional().describe("Description of the achievement."),
        date: z.string().optional().nullable().describe("Date of the achievement.")
    })).optional().nullable(),
    problemSolving: z.object({
        numberOfProblemsSolved: z.number().describe("Number of problems solved by the applicant, indicating their problem-solving skills."),
        onlineJudgeProfiles: z.array(z.string()).describe("List of online judge profiles of the applicant, such as LeetCode, Codeforces, etc.").optional().nullable(),
        notableAchievements: z.array(z.string()).describe("List of notable achievements in problem-solving, such as contests won, rankings, etc.").optional().nullable()
    }).optional().nullable()
});

const analysisSchema = z.object({
    overallMatch: z.number().describe("Overall match score between the CV and the job description, on a scale of 0 to 100 (0 being no match, 100 being perfect match). This score is calculated based on the relevance of the CV's content to the job description."),
    skillsMatch: z.number().describe("Match score for skills, on a scale of 0 to 100. that are relevant to the job description."),
    yearOfExperience: z.number().describe("Years of experience calculated from the CV."),
    numOfSkills: z.number().describe("Number of skills listed in the CV."),
    strengths: z.array(z.string()).describe("List of strengths identified in the CV that match the job description."),
    lackingsArea: z.array(z.string()).describe("List of areas where the CV lacks skills or experience."),
});

router.get('/download-cv', async (req, res) => {
    const { filename } = req.query;
    console.log("Received request to download CV", req.query);
    if (!filename) {
        return res.status(400).json({ error: 'Filename is required' });
    }

    const { data, error } = await supabase
        .storage
        .from('cv')
        .download(filename);

    if (error) {
        console.error('Download error:', error);
        return res.status(500).json({ error: 'Failed to fetch PDF' });
    }


    // encode the pdf to base64
    const buffer = await data.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');
    console.log("Base64 data length:", base64Data.length);
    console.log("Base64 data:", base64Data);
    // Send the PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.send(Buffer.from(base64Data, 'base64'));
});


const getBase64FromPdf = async (filename) => {
    const { data, error } = await supabase
        .storage
        .from('cv')
        .download(filename);

    if (error) {
        console.error('Download error:', error);
        throw new Error('Failed to fetch PDF');
    }

    const buffer = await data.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
};


router.get('/generate-summary', async (req, res) => {
    const { filename } = req.query;
    console.log("Received file: ", req.query.filename);
    if (!filename) {
        return res.status(400).json({ error: 'Filename is required' });
    }

    let base64Data;
    try {
        base64Data = await getBase64FromPdf(filename);
        console.log("Base64 data length:", base64Data.length);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to generate summary' });
    }

    console.log("Describing schema:", schema.describe());

    // Proper structure for Gemini API
    const contents = [
        {
            parts: [
                {
                    text: `Extract the following information from this CV and return it as a JSON object matching this Zod schema: 
                    
                     {
                        basicInfo: {
                            fullName: string,
                            email?: string | null,
                            personalSummary?: string | null,
                            phone?: string | null,
                            location?: string | null,
                            topSkills?: string[] | null
                        },
                        socialInfo?: {
                            linkedin?: string | null,
                            github?: string | null,
                            portfolio?: string | null
                        } | null,
                        education?: Array<{
                            degree: string,
                            university: string,
                            startYear: string,
                            graduationYear?: string | null
                        }> | null,
                        skills: string[],
                        projects?: Array<{
                            title: string,
                            description: string,
                            technologies: string[],
                            duration?: string | null,
                            links?: string | null
                        }> | null,
                        experience?: Array<{
                            company: string,
                            role?: string | null,
                            duration?: string | null,
                            responsibilities?: string | null
                        }> | null,
                        certifications?: Array<{
                            title: string,
                            issuingOrganization?: string | null,
                            issueDate?: string | null,
                            credentialId?: string | null,
                            credentialUrl?: string | null
                        }> | null,
                        achievements?: Array<{
                            title: string,
                            description: string,
                            date?: string | null
                        }> | null,
                        problemSolving?: {
                            numberOfProblemsSolved: number,
                            onlineJudgeProfiles?: string[] | null,
                            notableAchievements?: string[] | null
                        } | null
                     }
                    
                    Strictly follow the schema and do not include any additional information or explanations.`
                },
                {
                    inlineData: {
                        mimeType: "application/pdf",
                        data: base64Data,
                    }
                }
            ]
        }
    ];

    try {
        console.log("Generating content...");
        const response = await model.generateContent({
            contents: contents,
        });
        const summary =
            response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            response?.response?.text ||
            response?.text ||
            response;

        console.log("Generated summary:", summary);
        let summaryJson;
        let responseText = summary.replace(/```json|```/g, "").trim();

        console.log("Response text after cleanup:", responseText);
        try {
            summaryJson = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse summary as JSON:', parseError);
            return res.status(500).json({ error: 'Failed to parse summary' });
        }

        try {
            console.log("Validating summary against schema...");
            console.log("Summary JSON:", summaryJson);
            const parsed = schema.safeParse(summaryJson);
            if (!parsed.success) {
                console.error('Zod validation error:', parsed.error);
                return res.status(400).json({ error: 'Invalid summary format', details: parsed.error.errors });
            }
            res.status(200).json({ summary: parsed.data });
        } catch (zodError) {
            console.error('Zod validation error:', zodError);
            return res.status(400).json({ error: 'Invalid summary format', details: zodError.errors });
        }
    } catch (err) {
        console.error('Error generating summary:', err);
        res.status(500).json({ error: 'Failed to generate summary' });
    }
});



const fetchCVData = async (filename) => {
    if (!filename) {
        console.error('Filename is required');
        return null; // Return null if filename is not provided
    }
    let base64Data;
    try {
        base64Data = await getBase64FromPdf(filename);
        console.log("Base64 data length:", base64Data.length);
    } catch (error) {
        console.error('Failed to fetch PDF:', error);
        return null; // Return null if fetching fails
    }

    console.log("Describing schema:", schema.describe());

    // Proper structure for Gemini API
    const contents = [
        {
            parts: [
                {
                    text: `Extract the following information from this CV and return it as a JSON object matching this Zod schema: 
                    
                     {
                        basicInfo: {
                            fullName: string,
                            email?: string | null,
                            personalSummary?: string | null,
                            phone?: string | null,
                            location?: string | null,
                            topSkills?: string[] | null
                        },
                        socialInfo?: {
                            linkedin?: string | null,
                            github?: string | null,
                            portfolio?: string | null
                        } | null,
                        education?: Array<{
                            degree: string,
                            university: string,
                            startYear: string,
                            graduationYear?: string | null
                        }> | null,
                        skills: string[],
                        projects?: Array<{
                            title: string,
                            description: string,
                            technologies: string[],
                            duration?: string | null,
                            links?: string | null
                        }> | null,
                        experience?: Array<{
                            company: string,
                            role?: string | null,
                            duration?: string | null,
                            responsibilities?: string | null
                        }> | null,
                        certifications?: Array<{
                            title: string,
                            issuingOrganization?: string | null,
                            issueDate?: string | null,
                            credentialId?: string | null,
                            credentialUrl?: string | null
                        }> | null,
                        achievements?: Array<{
                            title: string,
                            description: string,
                            date?: string | null
                        }> | null,
                        problemSolving?: {
                            numberOfProblemsSolved: number,
                            onlineJudgeProfiles?: string[] | null,
                            notableAchievements?: string[] | null
                        } | null
                     }
                    
                    Strictly follow the schema and do not include any additional information or explanations.`
                },
                {
                    inlineData: {
                        mimeType: "application/pdf",
                        data: base64Data,
                    }
                }
            ]
        }
    ];

    try {
        console.log("Generating content...");
        const response = await model.generateContent({
            contents: contents,
        });
        const summary =
            response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            response?.response?.text ||
            response?.text ||
            response;

        console.log("Generated summary:", summary);
        let summaryJson;
        let responseText = summary.replace(/```json|```/g, "").trim();

        console.log("Response text after cleanup:", responseText);
        try {
            summaryJson = JSON.parse(responseText);
        } catch (parseError) {
            return null; // Return null if parsing fails
        }

        try {
            console.log("Validating summary against schema...");
            console.log("Summary JSON:", summaryJson);
            const parsed = schema.safeParse(summaryJson);
            if (!parsed.success) {
                return null; // Return null if validation fails
            }
            return parsed.data; // Return the validated data
        } catch (zodError) {
            console.error('Zod validation error:', zodError);
            return null; // Return null if validation fails
        }
    } catch (err) {
        console.error('Error generating summary:', err);
        return null; // Return null if an error occurs
    }
}

const getAnalysis = async (cvData, jobDescription) => {
    const contents = [
        {
            parts: [
                {
                    text: `Analyze the following CV data against the job description and return a JSON object matching this Zod schema:
                        {
                            overallMatch: number, // Overall match score between the CV and the job description, on a scale of 0 to 100.
                            skillsMatch: number, // Match score for skills, on a scale of 0 to 100.
                            yearOfExperience: number, // Years of experience calculated from the CV.
                            numOfSkills: number, // Number of skills listed in the CV.
                            strengths: string[], // List of strengths identified in the CV that match the job description.
                            lackingsArea: string[] // List of areas where the CV lacks skills or experience. 
                        }
                        
                        CV Data: ${JSON.stringify(cvData)}
                        
                        Job Description: ${JSON.stringify(jobDescription)}`
                }
            ]
        }
    ];

    try {
        console.log("Generating analysis...");
        const response = await model.generateContent({
            contents: contents,
        });
        const analysisText =
            response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            response?.response?.text ||
            response?.text ||
            response;

        console.log("Generated analysis:", analysisText);
        let analysisJson;
        let responseText = analysisText.replace(/```json|```/g, "").trim();

        console.log("Response text after cleanup:", responseText);
        try {
            analysisJson = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse analysis as JSON:', parseError);
            return null; // Return null if parsing fails
        }

        try {
            console.log("Validating analysis against schema...");
            const parsed = analysisSchema.safeParse(analysisJson);
            if (!parsed.success) {
                console.error('Zod validation error:', parsed.error);
                return null; // Return null if validation fails
            }
            return parsed.data;
        } catch (zodError) {
            console.error('Zod validation error:', zodError);
            return null; // Return null if validation fails
        }
    } catch (err) {
        console.error('Error generating analysis:', err);
        return null; // Return null if an error occurs
    }
};

const getJobDescription = async (jobId) => {
    console.log("Fetching job description for job ID:", jobId);
    if (!jobId) {
        return null; // Return null if jobId is not provided
    }

    try {
        const result = await sql`
            SELECT description
            FROM job_post
            WHERE job_id = ${jobId}
        `;

        if (result.length === 0) {
            return null; // Return null if job not found
        }

        return result[0];
    } catch (error) {
        console.error('Error fetching job description:', error);
        return null; // Return null if an error occurs
    }
};


router.post('/analyze-cv', async (req, res) => {
    const { cvUrl, jobId } = req.body;
    console.log("Received CV data and job description for analysis");

    if (!cvUrl || !jobId) {
        return res.status(400).json({ error: 'CV URL and job ID are required' });
    }

    let cvData;
    try {
        cvData = await fetchCVData(cvUrl);
        if (!cvData) {
            return res.status(400).json({ error: 'Failed to extract CV data', ok: false });
        }
        console.log("Extracted CV data:", cvData);
    } catch (error) {
        console.error('Error extracting CV data:', error);
        return res.status(500).json({ error: 'Failed to extract CV data', ok: false });
    }

    let jobDescription;
    try {
        jobDescription = await getJobDescription(jobId);
        if (!jobDescription) {
            return res.status(404).json({ error: 'Job description not found', ok: false });
        }
        console.log("Fetched job description:", jobDescription);
    } catch (error) {
        console.error('Error fetching job description:', error);
        return res.status(500).json({ error: 'Failed to fetch job description', ok: false });
    }

    try {
        const analysis = await getAnalysis(cvData, jobDescription);
        console.log("Generated analysis:", analysis);
        res.status(200).json({ analysis: analysis, cvData: cvData, ok: true });
    } catch (error) {
        console.error('Error generating analysis:', error);
        res.status(500).json({ error: 'Failed to generate analysis', ok: false });
    }
});





router.post("/apply-job", async (req, res) => {
    const {
        job_id, name, email, phone, cvUrl, coverLetter, analysisData, cvData
    } = req.body.formData;
    console.log("Received job application data:", req.body);
    if (!job_id || !name || !email || !phone || !cvUrl) {
        console.log('Missing required fields in job application data:', job_id, name, email, phone, cvUrl);

        return res.status(400).json({ error: 'All fields are required', ok: false });
    }
    try {
        const result = await sql`
            INSERT INTO applicants (job_id, name, email, phone, cv_link, analysis_data, cv_data)
            VALUES (${job_id}, ${name}, ${email}, ${phone}, ${cvUrl}, ${analysisData}, ${cvData})
            RETURNING *
        `;
        console.log("Application submitted successfully:", result);
        res.status(200).json({ message: "Application submitted successfully", ok: true, application: result[0] });
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ error: "Failed to submit application", ok: false });
    }
});


module.exports = router;
