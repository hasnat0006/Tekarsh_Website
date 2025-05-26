// Mock AI service for development - simulates AI processing
// In production, replace with actual AI SDK calls

// Types for structured CV data
export interface ExtractedCVData {
  summary: string
  skills: {
    name: string
    level: number // 1-10 rating
    category: string
  }[]
  experience: {
    title: string
    company: string
    duration: string
    description: string
    highlights: string[]
    technologies: string[]
  }[]
  education: {
    degree: string
    institution: string
    year: string
    achievements?: string
  }[]
  certifications: {
    name: string
    issuer: string
    year: string
  }[]
  languages: {
    name: string
    proficiency: string
  }[]
  projects: {
    name: string
    description: string
    technologies: string[]
    url?: string
  }[]
}

export interface JobMatchAnalysis {
  overallMatch: number // 0-100 percentage
  skillMatch: number // 0-100 percentage
  experienceMatch: number // 0-100 percentage
  educationMatch: number // 0-100 percentage
  strengths: string[]
  gaps: string[]
  recommendations: string[]
}

// Mock data templates for different applicant profiles
const mockCVDataTemplates: Record<string, ExtractedCVData> = {
  "1": {
    summary:
      "Experienced Frontend Developer with 6+ years of expertise in building responsive, accessible web applications using React, TypeScript, and modern JavaScript. Passionate about creating intuitive user interfaces and optimizing web performance. Led multiple high-impact projects and mentored junior developers.",
    skills: [
      { name: "React", level: 9, category: "technical" },
      { name: "TypeScript", level: 8, category: "technical" },
      { name: "JavaScript", level: 9, category: "technical" },
      { name: "Next.js", level: 8, category: "technical" },
      { name: "HTML5", level: 9, category: "technical" },
      { name: "CSS3", level: 8, category: "technical" },
      { name: "Redux", level: 7, category: "technical" },
      { name: "Webpack", level: 6, category: "technical" },
      { name: "Jest", level: 7, category: "technical" },
      { name: "Git", level: 8, category: "technical" },
      { name: "Leadership", level: 7, category: "soft" },
      { name: "Communication", level: 8, category: "soft" },
      { name: "Problem Solving", level: 9, category: "soft" },
      { name: "Team Collaboration", level: 8, category: "soft" },
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        duration: "2019 - 2023",
        description:
          "Led frontend development for a SaaS platform serving 50,000+ users, focusing on performance optimization and user experience improvements.",
        highlights: [
          "Improved application performance by 40% through code optimization",
          "Architected and implemented a component library used across 5 product teams",
          "Mentored 3 junior developers and conducted regular code reviews",
          "Led migration from legacy jQuery codebase to modern React architecture",
        ],
        technologies: ["React", "TypeScript", "Next.js", "Redux", "Styled Components", "Jest"],
      },
      {
        title: "Frontend Developer",
        company: "Digital Creations",
        duration: "2017 - 2019",
        description:
          "Developed and maintained multiple client websites and web applications, ensuring cross-browser compatibility and responsive design.",
        highlights: [
          "Delivered 15+ client projects on time and within budget",
          "Optimized web performance resulting in 30% faster page load times",
          "Implemented responsive designs for mobile-first approach",
          "Collaborated with design team to create pixel-perfect implementations",
        ],
        technologies: ["JavaScript", "React", "CSS3", "SASS", "Webpack", "jQuery"],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2017",
        achievements: "GPA: 3.8/4.0, Dean's List, Relevant coursework: Web Development, Data Structures, Algorithms",
      },
    ],
    certifications: [
      {
        name: "Frontend Web Developer Nanodegree",
        issuer: "Udacity",
        year: "2018",
      },
      {
        name: "React Developer Certification",
        issuer: "Meta",
        year: "2020",
      },
      {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        year: "2022",
      },
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Intermediate" },
    ],
    projects: [
      {
        name: "Personal Portfolio Website",
        description:
          "Designed and developed a responsive portfolio website showcasing projects and skills with dark/light mode toggle and smooth animations.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        url: "https://sarahjohnson.dev",
      },
      {
        name: "E-commerce Dashboard",
        description:
          "Built a comprehensive admin dashboard for e-commerce platform with real-time analytics, inventory management, and user administration.",
        technologies: ["React", "Redux", "Material-UI", "Chart.js", "Node.js"],
        url: "https://github.com/sarahjohnson/ecommerce-dashboard",
      },
    ],
  },
  "2": {
    summary:
      "Creative UX/UI Designer with 5+ years of experience designing user-centered digital experiences. Expert in user research, prototyping, and creating intuitive interfaces that drive user engagement and business growth. Successfully led design for products with 100K+ active users.",
    skills: [
      { name: "Figma", level: 9, category: "design" },
      { name: "Sketch", level: 8, category: "design" },
      { name: "Adobe Creative Suite", level: 8, category: "design" },
      { name: "User Research", level: 9, category: "research" },
      { name: "Prototyping", level: 8, category: "design" },
      { name: "Wireframing", level: 9, category: "design" },
      { name: "Usability Testing", level: 8, category: "research" },
      { name: "Design Systems", level: 7, category: "design" },
      { name: "HTML/CSS", level: 6, category: "technical" },
      { name: "JavaScript", level: 5, category: "technical" },
      { name: "Communication", level: 9, category: "soft" },
      { name: "Empathy", level: 9, category: "soft" },
      { name: "Critical Thinking", level: 8, category: "soft" },
    ],
    experience: [
      {
        title: "Senior UX Designer",
        company: "Design Studio Pro",
        duration: "2020 - 2023",
        description:
          "Led UX design for mobile applications and web platforms, conducting user research and creating data-driven design solutions.",
        highlights: [
          "Designed mobile app that achieved 100K+ downloads in first 6 months",
          "Conducted 50+ user interviews and usability testing sessions",
          "Increased user engagement by 35% through redesigned onboarding flow",
          "Established design system used across 3 product lines",
        ],
        technologies: ["Figma", "Principle", "InVision", "Miro", "Hotjar", "Google Analytics"],
      },
      {
        title: "UX/UI Designer",
        company: "StartupXYZ",
        duration: "2018 - 2020",
        description:
          "Designed user interfaces for B2B SaaS platform, working closely with development team to ensure design feasibility and implementation.",
        highlights: [
          "Redesigned core product interface resulting in 25% reduction in support tickets",
          "Created comprehensive style guide and component library",
          "Collaborated with product managers to define user stories and requirements",
          "Conducted A/B tests that improved conversion rates by 20%",
        ],
        technologies: ["Sketch", "InVision", "Zeplin", "Adobe XD", "Maze", "Optimal Workshop"],
      },
    ],
    education: [
      {
        degree: "Bachelor of Fine Arts in Graphic Design",
        institution: "Parsons School of Design",
        year: "2018",
        achievements: "Magna Cum Laude, Portfolio Award Winner, Design Excellence Scholarship",
      },
    ],
    certifications: [
      {
        name: "Google UX Design Certificate",
        issuer: "Google",
        year: "2019",
      },
      {
        name: "Certified Usability Analyst",
        issuer: "Human Factors International",
        year: "2021",
      },
      {
        name: "Google UX Design Certificate",
        issuer: "Google",
        year: "2010",
      },
      {
        name: "Certified Usability Analyst",
        issuer: "Human Factors International",
        year: "2001",
      },
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Mandarin", proficiency: "Native" },
      { name: "Korean", proficiency: "Conversational" },
    ],
    projects: [
      {
        name: "E-commerce Mobile App",
        description:
          "Complete UX/UI design for shopping mobile application with focus on seamless checkout experience and personalized recommendations.",
        technologies: ["Figma", "Principle", "InVision", "After Effects"],
        url: "https://dribbble.com/shots/ecommerce-app",
      },
      {
        name: "Healthcare Dashboard",
        description:
          "Designed comprehensive dashboard for healthcare professionals to manage patient data and appointments with emphasis on accessibility.",
        technologies: ["Figma", "Miro", "Optimal Workshop", "Maze"],
        url: "https://behance.net/gallery/healthcare-dashboard",
      },
    ],
  },
}

const mockJobMatchTemplates: Record<string, JobMatchAnalysis> = {
  "1": {
    overallMatch: 88,
    skillMatch: 92,
    experienceMatch: 85,
    educationMatch: 90,
    strengths: [
      "Strong expertise in React and TypeScript, directly matching job requirements",
      "Extensive experience with modern frontend frameworks and tools",
      "Proven leadership experience and mentoring capabilities",
      "Strong performance optimization skills demonstrated in previous roles",
      "Excellent problem-solving abilities and technical communication",
    ],
    gaps: [
      "Limited experience with GraphQL, which is listed as a preferred skill",
      "Could benefit from more exposure to accessibility best practices",
      "No direct experience with the specific industry domain",
    ],
    recommendations: [
      "Excellent candidate with strong technical skills and leadership experience",
      "Consider for senior-level position given mentoring and architecture experience",
      "Recommend technical interview focusing on React architecture and performance optimization",
      "Discuss GraphQL learning path during interview process",
    ],
  },
  "2": {
    overallMatch: 92,
    skillMatch: 95,
    experienceMatch: 88,
    educationMatch: 85,
    strengths: [
      "Exceptional design skills with expertise in industry-standard tools",
      "Strong user research and usability testing background",
      "Proven track record of improving user engagement and conversion rates",
      "Experience with design systems and component libraries",
      "Excellent collaboration skills with development teams",
    ],
    gaps: [
      "Limited technical implementation skills compared to other candidates",
      "No direct experience with the company's specific product domain",
      "Could benefit from more experience with advanced prototyping tools",
    ],
    recommendations: [
      "Outstanding candidate with strong design and research skills",
      "Perfect fit for user-centered design approach",
      "Recommend portfolio review and design challenge interview",
      "Consider for lead designer role given proven impact on user metrics",
    ],
  },
}

// Simulate AI processing delay
const simulateProcessingDelay = () => new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

// Function to extract structured data from CV text
export async function extractCVData(cvText: string): Promise<ExtractedCVData> {
  try {
    // Simulate AI processing time
    await simulateProcessingDelay()

    // In a real implementation, this would call the AI SDK:
    // const { text } = await generateText({
    //   model: openai("gpt-4o"), // or gemini("gemini-pro")
    //   prompt: `Extract structured CV data from: ${cvText}`,
    //   temperature: 0.2,
    // })

    // For development, determine which mock data to use based on CV content
    let templateKey = "1" // default

    if (cvText.toLowerCase().includes("designer") || cvText.toLowerCase().includes("ux")) {
      templateKey = "2"
    } else if (cvText.toLowerCase().includes("backend") || cvText.toLowerCase().includes("python")) {
      templateKey = "3"
    }

    // Return mock data that simulates AI processing
    return mockCVDataTemplates[templateKey] || mockCVDataTemplates["1"]
  } catch (error) {
    console.error("Error extracting CV data:", error)
    return getDefaultCVStructure()
  }
}

// Function to analyze job match
export async function analyzeJobMatch(cvData: ExtractedCVData, jobRequirements: any): Promise<JobMatchAnalysis> {
  try {
    // Simulate AI processing time
    await simulateProcessingDelay()

    // In a real implementation, this would call the AI SDK:
    // const { text } = await generateText({
    //   model: openai("gpt-4o"), // or gemini("gemini-pro")
    //   prompt: `Analyze job match between CV and requirements...`,
    //   temperature: 0.3,
    // })

    // For development, calculate a realistic match based on skills
    const skillMatch = calculateSkillMatch(cvData.skills, jobRequirements.requiredSkills || [])
    const experienceMatch = calculateExperienceMatch(cvData.experience, jobRequirements.requiredExperience || "")
    const educationMatch = calculateEducationMatch(cvData.education, jobRequirements.education || "")
    const overallMatch = Math.round((skillMatch + experienceMatch + educationMatch) / 3)

    // Determine template based on calculated scores
    const templateKey = overallMatch > 90 ? "2" : "1"

    const baseTemplate = mockJobMatchTemplates[templateKey] || mockJobMatchTemplates["1"]

    // Customize the template with calculated scores
    return {
      ...baseTemplate,
      overallMatch,
      skillMatch,
      experienceMatch,
      educationMatch,
    }
  } catch (error) {
    console.error("Error analyzing job match:", error)
    return getDefaultJobMatchAnalysis()
  }
}

// Generate a professional summary from CV data
export async function generateProfessionalSummary(cvData: ExtractedCVData): Promise<string> {
  try {
    // Simulate AI processing time
    await simulateProcessingDelay()

    // In a real implementation, this would call the AI SDK:
    // const { text } = await generateText({
    //   model: openai("gpt-4o"),
    //   prompt: `Generate professional summary from CV data...`,
    //   temperature: 0.5,
    // })

    // For development, return the existing summary or generate a basic one
    if (cvData.summary && cvData.summary !== "No summary available") {
      return cvData.summary
    }

    // Generate a basic summary based on available data
    const experience = cvData.experience.length
    const skills = cvData.skills
      .slice(0, 3)
      .map((s) => s.name)
      .join(", ")
    const education = cvData.education.length > 0 ? cvData.education[0].degree : "relevant education"

    return `Professional with ${experience} years of experience specializing in ${skills}. Holds ${education} and demonstrates strong technical capabilities across multiple domains. Proven track record of delivering high-quality results and collaborating effectively with cross-functional teams.`
  } catch (error) {
    console.error("Error generating professional summary:", error)
    return "Failed to generate professional summary."
  }
}

// Helper functions for realistic match calculations
function calculateSkillMatch(candidateSkills: ExtractedCVData["skills"], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) return 85

  const candidateSkillNames = candidateSkills.map((s) => s.name.toLowerCase())
  const matchedSkills = requiredSkills.filter((skill) =>
    candidateSkillNames.some(
      (candidateSkill) => candidateSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(candidateSkill),
    ),
  )

  const baseMatch = (matchedSkills.length / requiredSkills.length) * 100
  const skillLevelBonus = candidateSkills.reduce((acc, skill) => acc + skill.level, 0) / candidateSkills.length

  return Math.min(100, Math.round(baseMatch + (skillLevelBonus - 5) * 2))
}

function calculateExperienceMatch(experience: ExtractedCVData["experience"], requiredExperience: string): number {
  const totalYears = experience.reduce((total, exp) => {
    const duration = exp.duration
    const years = duration.match(/\d{4}/g)
    if (years && years.length >= 2) {
      return total + (Number.parseInt(years[1]) - Number.parseInt(years[0]))
    } else if (years && years.length === 1 && duration.toLowerCase().includes("present")) {
      const currentYear = new Date().getFullYear()
      return total + (currentYear - Number.parseInt(years[0]))
    }
    return total + 1
  }, 0)

  const requiredYears = Number.parseInt(requiredExperience.match(/\d+/)?.[0] || "3")
  const experienceRatio = totalYears / requiredYears

  return Math.min(100, Math.round(experienceRatio * 85))
}

function calculateEducationMatch(education: ExtractedCVData["education"], requiredEducation: string): number {
  if (education.length === 0) return 70

  const hasRelevantDegree = education.some(
    (edu) =>
      edu.degree.toLowerCase().includes("computer") ||
      edu.degree.toLowerCase().includes("engineering") ||
      edu.degree.toLowerCase().includes("science") ||
      edu.degree.toLowerCase().includes("design"),
  )

  return hasRelevantDegree ? 90 : 75
}

// Default structures for error handling
function getDefaultCVStructure(): ExtractedCVData {
  return {
    summary: "No summary available",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    languages: [],
    projects: [],
  }
}

function getDefaultJobMatchAnalysis(): JobMatchAnalysis {
  return {
    overallMatch: 0,
    skillMatch: 0,
    experienceMatch: 0,
    educationMatch: 0,
    strengths: [],
    gaps: [],
    recommendations: [],
  }
}
