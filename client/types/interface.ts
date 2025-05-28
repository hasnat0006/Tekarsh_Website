export interface Job {
  job_id: string;
  status: boolean;
  description: {
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    preferred: string[];
    salary?: {
      min: string;
      max: string;
      currency: string;
    };
    benefits: string[];
  };
}

export interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  status: string;
  salary?: {
    min: string;
    max: string;
    currency: string;
  };
  benefits: string[];
}

export interface JobListingsProps {
  category: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phoneNo: string;
  subject: string;
  message: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  description: string;
  status: "unseen" | "seen" | "replied" | "archived";
  reply_msg?: string;
  created_at: string;
}

export interface AnalysisData {
  overallMatch: number;
  skillsMatch: number;
  yearOfExperience: number;
  numOfSkills: number;
  strengths: string[];
  lackingsArea: string[];
}


export interface CVData {
  basicInfo: {
    fullName: string;
    email?: string | null;
    personalSummary?: string | null;
    phone?: string | null;
    location?: string | null;
    topSkills?: string[] | null;
  };
  socialInfo?: {
    linkedin?: string | null;
    github?: string | null;
    portfolio?: string | null;
  } | null;
  education?: Array<{
    degree: string;
    university: string;
    startYear: string;
    graduationYear?: string | null;
  }> | null;
  skills: string[];
  projects?: Array<{
    title: string;
    description: string;
    technologies: string[];
    duration?: string | null;
    links?: string | null;
  }> | null;
  experience?: Array<{
    company: string;
    role?: string | null;
    duration?: string | null;
    responsibilities?: string | null;
  }> | null;
  certifications?: Array<{
    title: string;
    issuingOrganization?: string | null;
    issueDate?: string | null;
    credentialId?: string | null;
    credentialUrl?: string | null;
  }> | null;
  achievements?: Array<{
    title: string;
    description?: string | null;
    date?: string | null;
  }> | null;
  problemSolving?: {
    numberOfProblemsSolved: number;
    onlineJudgeProfiles?: string[] | null;
    notableAchievements?: string[] | null;
  } | null;
}

export interface JobApplicationForm {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  cvUrl?: string;
  coverLetter: string;
  jobId: string;
  analysisData?: AnalysisData; 
  cvData?: CVData;
}
