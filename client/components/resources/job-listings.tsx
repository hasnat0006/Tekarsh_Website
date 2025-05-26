"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Search, Clock, Share2 } from "lucide-react";
import JobModal from "@/components/job-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// Mock job data
const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "engineering",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    experience: "5+ years",
    description:
      "We're looking for a Senior Frontend Developer to join our team and help build innovative web applications using React, Next.js, and modern frontend technologies.",
    responsibilities: [
      "Design and implement new features and functionality",
      "Build reusable components and libraries for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with back-end developers and designers",
      "Stay up-to-date with emerging trends and technologies",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in JavaScript, HTML, CSS",
      "Experience with React.js and Next.js",
      "Understanding of server-side rendering and state management",
      "Familiarity with RESTful APIs and GraphQL",
      "Experience with testing frameworks like Jest",
    ],
    preferred: [
      "Experience with TypeScript",
      "Knowledge of UI/UX design principles",
      "Contributions to open-source projects",
      "Experience with CI/CD pipelines",
    ],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "design",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    experience: "3+ years",
    description:
      "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products that delight our users and help them achieve their goals efficiently.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback",
      "Design flows, prototypes, and high-fidelity mockups",
      "Collaborate with product managers and engineers",
      "Conduct user research and usability testing",
      "Create and maintain design systems",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Strong portfolio demonstrating design thinking",
      "Proficiency in design tools like Figma or Sketch",
      "Understanding of accessibility standards",
      "Experience conducting user research",
    ],
    preferred: [
      "Experience with design systems",
      "Knowledge of HTML/CSS",
      "Background in mobile app design",
      "Experience in an agile environment",
    ],
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "engineering",
    location: "Austin, TX (Remote Option)",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Join our backend team to build scalable, reliable services that power our applications. You'll work with modern technologies to solve complex problems and deliver high-performance solutions.",
    responsibilities: [
      "Design and implement scalable backend services",
      "Optimize database queries and data structures",
      "Implement security and data protection measures",
      "Collaborate with frontend developers",
      "Write clean, maintainable, and well-tested code",
    ],
    requirements: [
      "4+ years of experience in backend development",
      "Strong knowledge of Node.js, Python, or Java",
      "Experience with databases (SQL and NoSQL)",
      "Understanding of RESTful APIs and microservices",
      "Knowledge of cloud services (AWS, Azure, or GCP)",
    ],
    preferred: [
      "Experience with containerization (Docker, Kubernetes)",
      "Knowledge of message queues and event-driven architecture",
      "Experience with CI/CD and DevOps practices",
      "Contributions to open-source projects",
    ],
  },
  {
    id: 4,
    title: "Product Manager",
    department: "product",
    location: "Seattle, WA (Hybrid)",
    type: "Full-time",
    experience: "3+ years",
    description:
      "We're looking for a Product Manager to help define and execute our product strategy. You'll work closely with engineering, design, and business teams to deliver products that users love.",
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work closely with engineering and design teams",
      "Analyze market trends and competition",
      "Measure and optimize product performance",
    ],
    requirements: [
      "3+ years of experience in product management",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management",
      "Experience with agile methodologies",
      "Data-driven decision making",
    ],
    preferred: [
      "Technical background or experience",
      "Experience with product analytics tools",
      "MBA or relevant advanced degree",
      "Experience in SaaS products",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our infrastructure team to build and maintain our cloud-based systems. You'll help ensure our applications are reliable, scalable, and secure.",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure (AWS, GCP)",
      "Implement monitoring and alerting systems",
      "Automate deployment and scaling processes",
      "Collaborate with development teams on infrastructure needs",
    ],
    requirements: [
      "3+ years of experience in DevOps or SRE roles",
      "Strong knowledge of cloud platforms (AWS, GCP, or Azure)",
      "Experience with containerization and orchestration",
      "Proficiency in scripting languages (Python, Bash)",
      "Understanding of networking and security principles",
    ],
    preferred: [
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Knowledge of monitoring tools (Prometheus, Grafana)",
      "Experience with Kubernetes in production",
      "Security certifications",
    ],
  },
  {
    id: 6,
    title: "Marketing Specialist",
    department: "marketing",
    location: "Chicago, IL (Hybrid)",
    type: "Full-time",
    experience: "2+ years",
    description:
      "We're seeking a Marketing Specialist to help grow our brand and drive customer acquisition. You'll work on digital marketing campaigns, content creation, and analytics.",
    responsibilities: [
      "Plan and execute digital marketing campaigns",
      "Create engaging content for various channels",
      "Analyze campaign performance and optimize strategies",
      "Collaborate with design and product teams",
      "Stay up-to-date with marketing trends",
    ],
    requirements: [
      "2+ years of experience in digital marketing",
      "Experience with SEO, SEM, and social media marketing",
      "Strong analytical skills and experience with marketing analytics",
      "Excellent written and verbal communication",
      "Experience with marketing automation tools",
    ],
    preferred: [
      "Experience in B2B SaaS marketing",
      "Knowledge of graphic design principles",
      "Experience with content management systems",
      "Marketing certifications",
    ],
  },
  {
    id: 7,
    title: "Junior Software Developer",
    department: "engineering",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    experience: "0-2 years",
    description:
      "We're looking for passionate Junior Developers to join our team. This is a great opportunity to learn and grow while working on real-world projects with experienced mentors.",
    responsibilities: [
      "Develop and maintain software applications",
      "Write clean, testable code with proper documentation",
      "Collaborate with senior developers and other team members",
      "Participate in code reviews and team meetings",
      "Learn and adopt best practices and new technologies",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field (or equivalent experience)",
      "Basic knowledge of programming languages (JavaScript, Python, etc.)",
      "Understanding of data structures and algorithms",
      "Eagerness to learn and problem-solving attitude",
      "Good communication skills",
    ],
    preferred: [
      "Internship or project experience",
      "Knowledge of web development (HTML, CSS, JavaScript)",
      "Familiarity with version control systems (Git)",
      "Understanding of software development methodologies",
    ],
  },
  {
    id: 8,
    title: "Data Scientist",
    department: "engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our data science team to extract insights from data and build machine learning models that power our products and help make data-driven decisions.",
    responsibilities: [
      "Develop machine learning models and algorithms",
      "Analyze large datasets to extract insights",
      "Collaborate with engineering and product teams",
      "Create data visualizations and reports",
      "Stay current with the latest ML research and techniques",
    ],
    requirements: [
      "3+ years of experience in data science or related field",
      "Strong programming skills in Python or R",
      "Experience with machine learning libraries and frameworks",
      "Strong statistical knowledge and mathematical skills",
      "Experience with data manipulation and analysis",
    ],
    preferred: [
      "Advanced degree in Computer Science, Statistics, or related field",
      "Experience with deep learning frameworks",
      "Knowledge of big data technologies",
      "Experience deploying ML models to production",
    ],
  },
];

interface JobListingsProps {
  category: string;
}

export default function JobListings({ category }: JobListingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // Check for job ID in URL params on component mount
  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (jobId) {
      const job = jobsData.find((j) => j.id === Number.parseInt(jobId));
      if (job) {
        setSelectedJob(job);
        setIsModalOpen(true);

        // Scroll to open positions section
        const openPositionsSection = document.getElementById("open-positions");
        if (openPositionsSection) {
          setTimeout(() => {
            openPositionsSection.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
    }
  }, [searchParams]);

  // Filter jobs based on category, search term, location, and experience
  const filteredJobs = jobsData.filter((job) => {
    const matchesCategory = category === "all" || job.department === category;
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation =
      !locationFilter || job.location.includes(locationFilter);
    const matchesExperience =
      !experienceFilter || job.experience.includes(experienceFilter);

    return (
      matchesCategory && matchesSearch && matchesLocation && matchesExperience
    );
  });

  const openJobModal = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    // Update URL with job ID without full page reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("jobId", job.id.toString());
    window.history.pushState({}, "", newUrl.toString());
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
    // Remove job ID from URL when modal is closed
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("jobId");
    window.history.pushState({}, "", newUrl.toString());
  };

  const shareJob = (job: any, e: React.MouseEvent) => {
    e.stopPropagation();

    // Create the shareable URL with job ID
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/career?jobId=${job.id}#open-positions`;

    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: `Job Opening: ${job.title}`,
          text: `Check out this job opportunity: ${job.title} at our company!`,
          url: shareUrl,
        })
        .catch((error) => {
          console.log("Error sharing:", error);
          copyToClipboard(shareUrl);
        });
    } else {
      // Fallback to clipboard copy
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link copied!",
          description:
            "Job link has been copied to clipboard. Share it with others!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Couldn't copy link",
          description: "Please try again or copy the URL manually.",
          variant: "destructive",
        });
      });
  };

  // Get unique locations for filter
  const locations = Array.from(
    new Set(
      jobsData.map((job) => {
        const locationParts = job.location.split("(")[0].trim();
        return locationParts;
      })
    )
  );

  // Get unique experience levels for filter
  const experienceLevels = Array.from(
    new Set(jobsData.map((job) => job.experience))
  );

  return (
    <div className="border-0 border-gray-600 w-full md:w-5xl">
      {/* Search and Filters */}
      <div className="mb-8 bg-[var(--word)]/5 p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search job titles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="On-site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location, index) => (
                  <SelectItem key={index} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={experienceFilter}
              onValueChange={setExperienceFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                {experienceLevels.map((level, index) => (
                  <SelectItem key={index} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[var(--word)]/4 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>
                        {job.department.charAt(0).toUpperCase() +
                          job.department.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                    >
                      {job.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                    >
                      {job.experience}
                    </Badge>
                    {job.experience.includes("0-2") && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                      >
                        Entry Level
                      </Badge>
                    )}
                    {job.location.toLowerCase().includes("remote") && (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                      >
                        Remote
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    // variant="outline"
                    size="icon"
                    className="rounded-full bg-[var(--green)]/10  text-[var(--green)] hover:-translate-y-0.5 transition-transform border-2 border-[var(--green)]/20 hover:bg-[var(--green)]/20"
                    onClick={(e) => shareJob(job, e)}
                    title="Share this job"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share job</span>
                  </Button>
                  <Button
                    className="bg-[var(--green)]/80 hover:bg-[var(--green)]/90 text-[var(--word)] hover:-translate-y-0.5 transition-transform text-sm rounded-md px-4 py-2"
                    onClick={() => openJobModal(job)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any jobs matching your criteria. Try
              adjusting your filters or search term.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("");
                setExperienceFilter("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {selectedJob && (
        <JobModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={closeJobModal}
        />
      )}
    </div>
  );
}
