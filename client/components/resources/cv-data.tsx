// Mock CV data for different applicants
export const mockCVData: Record<string, string> = {
  "1": `
  SARAH JOHNSON
  Frontend Developer
  San Francisco, CA | sarah.johnson@example.com | (555) 123-4567
  
  SUMMARY
  Experienced Frontend Developer with 6+ years of expertise in building responsive, accessible web applications using React, TypeScript, and modern JavaScript. Passionate about creating intuitive user interfaces and optimizing web performance.
  
  SKILLS
  - Programming: JavaScript, TypeScript, HTML5, CSS3, React, Next.js, Redux
  - Tools & Frameworks: Webpack, Babel, Jest, React Testing Library, Git, GitHub Actions
  - Design: Responsive Design, CSS-in-JS, Tailwind CSS, Material-UI, Figma
  
  EXPERIENCE
  Senior Frontend Developer
  Tech Solutions Inc. | 2019 - 2023
  - Led the frontend development of a SaaS platform serving 50,000+ users
  - Architected and implemented a component library used across 5 product teams
  - Mentored junior developers and conducted code reviews
  
  EDUCATION
  Bachelor of Science in Computer Science
  University of California, Berkeley | 2017
  
  CERTIFICATIONS
  - Frontend Web Developer Nanodegree, Udacity (2018)
  - React Developer Certification, Meta (2020)
  
  LANGUAGES
  - English (Native)
  - Spanish (Intermediate)
  
  PROJECTS
  Personal Portfolio Website
  - Designed and developed a personal portfolio website
  - Technologies: Next.js, TypeScript, Tailwind CSS
  `,
  "2": `
  MICHAEL CHEN
  UX/UI Designer
  New York, NY | michael.chen@example.com | (555) 234-5678
  
  SUMMARY
  Creative UX/UI Designer with 5+ years of experience designing user-centered digital experiences. Expert in user research, prototyping, and creating intuitive interfaces that drive user engagement and business growth.
  
  SKILLS
  - Design Tools: Figma, Sketch, Adobe Creative Suite, InVision, Principle
  - Research: User Interviews, Usability Testing, A/B Testing, Analytics
  - Prototyping: Interactive Prototypes, Wireframing, User Flows
  
  EXPERIENCE
  Senior UX Designer
  Design Studio Pro | 2020 - 2023
  - Led design for mobile app with 100K+ downloads
  - Conducted user research and usability testing
  - Collaborated with cross-functional teams
  
  EDUCATION
  Bachelor of Fine Arts in Graphic Design
  Parsons School of Design | 2018
  
  CERTIFICATIONS
  - Google UX Design Certificate (2019)
  - Certified Usability Analyst (2021)
  
  LANGUAGES
  - English (Native)
  - Mandarin (Native)
  
  PROJECTS
  E-commerce Mobile App
  - Designed complete user experience for shopping app
  - Technologies: Figma, Principle, InVision
  `,
};


export const applicantsData = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    photo: "/placeholder.svg?height=40&width=40",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "2023-05-15T10:30:00Z",
    status: "interview",
    aiScore: 88,
    skills: ["React", "TypeScript", "Next.js"],
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    github: "https://github.com/sarahjohnson",
    website: "https://sarahjohnson.dev",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    photo: "/placeholder.svg?height=40&width=40",
    appliedFor: "UX/UI Designer",
    appliedDate: "2023-05-10T14:45:00Z",
    status: "review",
    aiScore: 92,
    skills: ["Figma", "UI Design", "User Research"],
    location: "New York, NY",
    linkedin: "https://linkedin.com/in/michaelchen",
    github: "https://github.com/michaelchen",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 345-6789",
    photo: "/placeholder.svg?height=40&width=40",
    appliedFor: "Backend Engineer",
    appliedDate: "2023-05-08T09:15:00Z",
    status: "hired",
    aiScore: 95,
    skills: ["Node.js", "Python", "AWS"],
    location: "Austin, TX",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    github: "https://github.com/emilyrodriguez",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "+1 (555) 456-7890",
    photo: "/placeholder.svg?height=40&width=40",
    appliedFor: "Product Manager",
    appliedDate: "2023-05-05T16:20:00Z",
    status: "rejected",
    aiScore: 72,
    skills: ["Product Strategy", "Agile", "User Stories"],
    location: "Seattle, WA",
    linkedin: "https://linkedin.com/in/davidkim",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    phone: "+1 (555) 567-8901",
    photo: "/placeholder.svg?height=40&width=40",
    appliedFor: "DevOps Engineer",
    appliedDate: "2023-05-03T11:10:00Z",
    status: "review",
    aiScore: 85,
    skills: ["Docker", "Kubernetes", "CI/CD"],
    location: "Remote",
    linkedin: "https://linkedin.com/in/lisawang",
    github: "https://github.com/lisawang",
  },
];

export const jobRequirements = {
  title: "Senior Frontend Developer",
  department: "engineering",
  requiredSkills: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Next.js",
  ],
  requiredExperience: "5+ years in frontend development",
  preferredSkills: ["GraphQL", "Performance Optimization", "Accessibility"],
  education: "Bachelor's degree in Computer Science or related field",
};