"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Plus,
  Trash,
  EditIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import JobFormModal from "@/components/admin/job-form-modal";
import JobApplicantsModal from "@/components/admin/job-applicants-modal";

// Mock data for jobs
const jobsData = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "engineering",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    experience: "5+ years",
    status: "active",
    applicants: 12,
    createdAt: "2023-04-15T10:30:00Z",
    updatedAt: "2023-05-01T14:45:00Z",
    description:
      "We're looking for a Senior Frontend Developer to join our team and help build innovative web applications using React, Next.js, and modern frontend technologies.",
    responsibilities: [
      "Design and implement new features and functionality",
      "Build reusable components and libraries for future use",
      "Optimize applications for maximum speed and scalability",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in JavaScript, HTML, CSS",
      "Experience with React.js and Next.js",
    ],
    preferred: [
      "Experience with TypeScript",
      "Knowledge of UI/UX design principles",
    ],
    salary: {
      min: "120000",
      max: "160000",
      currency: "USD",
    },
    benefits: ["Health insurance", "401k matching", "Flexible PTO"],
  },
  {
    id: "2",
    title: "UX/UI Designer",
    department: "design",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    experience: "3+ years",
    status: "active",
    applicants: 8,
    createdAt: "2023-04-20T09:15:00Z",
    updatedAt: "2023-04-25T11:30:00Z",
    description:
      "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products.",
    responsibilities: [
      "Create user-centered designs",
      "Design flows, prototypes, and high-fidelity mockups",
      "Collaborate with product managers and engineers",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Strong portfolio demonstrating design thinking",
      "Proficiency in design tools like Figma or Sketch",
    ],
    preferred: ["Experience with design systems", "Knowledge of HTML/CSS"],
    salary: {
      min: "90000",
      max: "120000",
      currency: "USD",
    },
    benefits: [
      "Health insurance",
      "Design conference budget",
      "Remote work stipend",
    ],
  },
  {
    id: "3",
    title: "Data Scientist",
    department: "data",
    location: "Austin, TX (Remote Option)",
    type: "Full-time",
    experience: "4+ years",
    status: "inactive",
    applicants: 5,
    createdAt: "2023-03-10T08:00:00Z",
    updatedAt: "2023-03-15T10:20:00Z",
    description:
      "Join our data team as a Data Scientist to analyze complex datasets and provide actionable insights.",
    responsibilities: [
      "Develop predictive models and algorithms",
      "Analyze large datasets to identify trends and patterns",
      "Collaborate with cross-functional teams to implement data solutions",
    ],
    requirements: [
      "4+ years of experience in data science or analytics",
      "Proficiency in Python, R, or similar languages",
      "Experience with machine learning frameworks",
    ],
    preferred: ["Experience with SQL", "Knowledge of cloud platforms"],
    salary: {
      min: "110000",
      max: "150000",
      currency: "USD",
    },
    benefits: ["Health insurance", "Professional development budget"],
  },
  {
    id: "4",
    title: "Product Manager",
    department: "product",
    location: "Seattle, WA (Hybrid)",
    type: "Full-time",
    experience: "6+ years",
    status: "active",
    applicants: 10,
    createdAt: "2023-02-05T07:30:00Z",
    updatedAt: "2023-02-10T09:45:00Z",
    description:
      "We are looking for a Product Manager to lead the development of our next-generation products and features.",
    responsibilities: [
      "Define product vision and strategy",
      "Gather and prioritize product requirements",
      "Work closely with engineering, design, and marketing teams",
    ],
    requirements: [
      "6+ years of experience in product management",
      "Strong understanding of Agile methodologies",
      "Excellent communication and leadership skills",
    ],
    preferred: [
      "Experience in SaaS or B2B products",
      "Familiarity with user research techniques",
    ],
    salary: {
      min: "130000",
      max: "180000",
      currency: "USD",
    },
    benefits: [
      "Health insurance",
      "Stock options",
      "Flexible work hours",
      "Annual company retreat",
    ],
  },
  {
    id: "5",
    title: "DevOps Engineer",
    department: "engineering",
    location: "Chicago, IL (Remote Option)",
    type: "Full-time",
    experience: "5+ years",
    status: "active",
    applicants: 7,
    createdAt: "2023-01-20T06:00:00Z",
    updatedAt: "2023-01-25T08:15:00Z",
    description:
      "Join our engineering team as a DevOps Engineer to automate and streamline our operations and processes.",
    responsibilities: [
      "Implement CI/CD pipelines",
      "Manage cloud infrastructure and deployments",
      "Monitor system performance and reliability",
    ],
    requirements: [
      "5+ years of experience in DevOps or related field",
      "Proficiency in Docker, Kubernetes, and cloud platforms (AWS, GCP, Azure)",
      "Strong scripting skills (Bash, Python, etc.)",
    ],
    preferred: ["Experience with infrastructure as code (Terraform)"],
    salary: {
      min: "120000",
      max: "160000",
      currency: "USD",
    },
    benefits: [
      "Health insurance",
      "Remote work flexibility",
      "Professional growth opportunities",
    ],
  },
  {
    id: "6",
    title: "Marketing Specialist",
    department: "marketing",
    location: "Los Angeles, CA (Hybrid)",
    type: "Full-time",
    experience: "3+ years",
    status: "inactive",
    applicants: 4,
    createdAt: "2023-01-10T05:30:00Z",
    updatedAt: "2023-01-15T07:45:00Z",
    description:
      "We are looking for a Marketing Specialist to develop and execute marketing campaigns that drive brand awareness and customer engagement.",
    responsibilities: [
      "Create and manage marketing campaigns across various channels",
      "Analyze campaign performance and optimize for better results",
      "Collaborate with the sales team to align marketing efforts",
    ],
    requirements: [
      "3+ years of experience in marketing or related field",
      "Strong understanding of digital marketing strategies",
      "Excellent written and verbal communication skills",
    ],
    preferred: [
      "Experience with SEO and content marketing",
      "Familiarity with marketing automation tools",
    ],
    salary: {
      min: "80000",
      max: "110000",
      currency: "USD",
    },
    benefits: [
      "Health insurance",
      "Professional development budget",
      "Flexible work hours",
    ],
  },
  {
    id: "7",
    title: "Junior Software Developer",
    department: "engineering",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    experience: "0-2 years",
    status: "inactive",
    applicants: 20,
    createdAt: "2023-03-28T10:20:00Z",
    updatedAt: "2023-04-15T11:30:00Z",
    description:
      "We are looking for a Junior Software Developer to join our engineering team and help build innovative solutions.",
    responsibilities: [
      "Assist in the design and development of software applications",
      "Collaborate with senior developers to implement features",
      "Participate in code reviews and contribute to team knowledge sharing",
    ],
    requirements: [
      "0-2 years of experience in software development",
      "Familiarity with programming languages such as JavaScript, Python, or Java",
      "Basic understanding of web technologies (HTML, CSS, etc.)",
    ],
    preferred: [
      "Experience with front-end frameworks (React, Angular, etc.)",
      "Knowledge of version control systems (Git)",
    ],
    salary: {
      min: "70000",
      max: "90000",
      currency: "USD",
    },
    benefits: ["Health insurance", "Mentorship program", "Flexible work hours"],
  },
];


// Mock applicants data for each job
const mockJobApplicants: Record<string, any[]> = {
  "1": [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      photo: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-05-15T10:30:00Z",
      status: "interview",
      aiScore: 88,
      skills: ["React", "TypeScript", "Next.js", "JavaScript", "CSS"],
      location: "San Francisco, CA",
    },
    {
      id: "2",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@example.com",
      phone: "+1 (555) 234-5678",
      photo: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-05-12T14:20:00Z",
      status: "review",
      aiScore: 92,
      skills: ["React", "Vue.js", "Node.js", "TypeScript"],
      location: "Austin, TX",
    },
    {
      id: "3",
      name: "Emma Chen",
      email: "emma.chen@example.com",
      phone: "+1 (555) 345-6789",
      photo: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-05-10T09:45:00Z",
      status: "hired",
      aiScore: 95,
      skills: ["React", "TypeScript", "GraphQL", "AWS"],
      location: "Seattle, WA",
    },
    {
      id: "4",
      name: "James Wilson",
      email: "james.wilson@example.com",
      phone: "+1 (555) 456-7890",
      photo: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-05-08T16:30:00Z",
      status: "rejected",
      aiScore: 72,
      skills: ["JavaScript", "HTML", "CSS", "jQuery"],
      location: "Remote",
    },
  ],
  "2": [
    {
      id: "5",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "+1 (555) 567-8901",
      photo: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-05-14T11:15:00Z",
      status: "interview",
      aiScore: 89,
      skills: ["Figma", "Sketch", "User Research", "Prototyping"],
      location: "New York, NY",
    },
    {
      id: "6",
      name: "Lisa Park",
      email: "lisa.park@example.com",
      phone: "+1 (555) 678-9012",
      photo: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-05-11T13:45:00Z",
      status: "review",
      aiScore: 91,
      skills: ["Adobe XD", "InVision", "User Testing", "Wireframing"],
      location: "Los Angeles, CA",
    },
  ],
}

interface JobFormData {
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

export default function JobsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const { toast } = useToast();

  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isJobApplicantsModalOpen, setIsJobApplicantsModalOpen] =
    useState(false);

  const itemsPerPage = 7;

  // Get unique departments for filter
  const departments = Array.from(
    new Set(jobsData.map((job) => job.department))
  );

  // Filter jobs based on search term, status, and department
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" || job.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Paginate results
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateJob = async (data: JobFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would make an API call here
    console.log("Creating job:", data);

    // Add the new job to the local data (in a real app, this would be handled by state management)
    // For demo purposes, we'll just show a success message
  };

  const handleEditJob = async (data: JobFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would make an API call here
    console.log("Updating job:", editingJob?.id, data);

    // Update the job in the local data (in a real app, this would be handled by state management)
    // For demo purposes, we'll just show a success message
  };

  const openEditModal = (job: any) => {
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingJob(null);
  };

  const toggleJobStatus = (id: string, currentStatus: string) => {
    // In a real app, this would update the job status in the database
    console.log(
      `Toggling job ${id} from ${currentStatus} to ${
        currentStatus === "active" ? "inactive" : "active"
      }`
    );

    toast({
      title: "Status Updated",
      description: `Job status has been ${
        currentStatus === "active" ? "deactivated" : "activated"
      }.`,
    });
  };


  const handleViewJobApplicants = (job: any) => {
    setSelectedJob(job);
    setIsJobApplicantsModalOpen(true);
  };

  const closeJobApplicantsModal = () => {
    setIsJobApplicantsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="space-y-4 flex flex-col justify-center w-full items-center">
      <Card className="w-full max-w-3xl">
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 border-[var(--word)]/40">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-[var(--word)]/40"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[var(--word)]/40 cursor-pointer"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Select
                value={statusFilter}
                // className="cursor-pointer"
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[var(--word)]/40">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-[var(--green)]/80 hover:-translate-y-0.5 text-white"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Job
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-[var(--word)]/40">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[var(--word)]/40">
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department.charAt(0).toUpperCase() +
                            department.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setDepartmentFilter("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="rounded-md border-2 bg-[var(--word)]/2 border-[var(--word)]/10 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{job.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {job.type} • {job.experience}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {job.department.charAt(0).toUpperCase() +
                      job.department.slice(1)}
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.applicants}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={job.status === "active"}
                        onCheckedChange={() =>
                          toggleJobStatus(job.id, job.status)
                        }
                      />
                      <Label>
                        {job.status === "active" ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                        onClick={() => handleViewJobApplicants(job)}
                      >
                        <span>View</span>
                      </Badge>

                      <Button
                        size="icon"
                        onClick={() => openEditModal(job)}
                        className="text-[var(--green)]/80 hover:text-[var(--green)] cursor-pointer hover:-translate-y-0.5"
                      >
                        <EditIcon className="h-4 w-4 hover:text-[var(--green)]" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => console.log("Delete Job")}
                        className="text-red-500/80 hover:text-red-500 cursor-pointer hover:-translate-y-0.5"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8 mb-2" />
                    <p>No jobs found</p>
                    <p className="text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <div className="flex items-center w-full justify-end">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of{" "}
            {filteredJobs.length} jobs
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      <JobFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateJob}
        mode="create"
      />

      {/* Edit Job Modal */}
      <JobFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEditJob}
        initialData={editingJob}
        mode="edit"
      />
      {selectedJob && (
        <JobApplicantsModal
          isOpen={isJobApplicantsModalOpen}
          onClose={closeJobApplicantsModal}
          job={selectedJob}
          applicants={mockJobApplicants[selectedJob.id] || []}
          onApplicantStatusUpdate={(applicantId, status) => {
            // Update applicant status in mock data
            console.log(`Updated applicant ${applicantId} status to ${status}`);
          }}
        />
      )}
    </div>
  );
}
