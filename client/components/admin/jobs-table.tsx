"use client";

import { useEffect, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import JobFormModal from "@/components/admin/job-form-modal";
import JobApplicantsModal from "@/components/admin/job-applicants-modal";
import toast, { Toaster } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { JobFormData, Job } from "@/types/interface";

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
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function JobsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobApplicantsModalOpen, setIsJobApplicantsModalOpen] =
    useState(false);

  const [jobsData, setJobsData] = useState<Job[]>([]);
  const itemsPerPage = 7;
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`${url}/admin/fetch_job_posts?id=${userid}`);
      if (!response.ok) {
        console.error("Failed to fetch jobs");
        return;
      }
      const data = await response.json();
      setJobsData(data);
    };
    fetchJobs();
  }, [isEditModalOpen, isCreateModalOpen, userid]);

  console.log("Jobs Data:", jobsData);

  // Get unique departments for filter
  const departments = Array.from(
    new Set(jobsData.map((job) => job.description.department))
  );

  // Filter jobs based on search term, status, and department
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.description.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || job.status === true ? "active" : "inactive" === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" ||
      job.description.department === departmentFilter;

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Updating job:", editingJob?.job_id, data);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingJob(null);
  };

  const toggleJobStatus = async (id: string, currentStatus: string) => {
    const response = await fetch(`${url}/admin/changeStatus?id=${id}`);
    const data = await response.json();
    if (!data.ok) {
      return;
    }
    // Update the job status in the local state

    setJobsData((prevJobs) =>
      prevJobs.map((job) =>
        job.job_id === id
          ? {
              ...job,
              status: !currentStatus,
            }
          : job
      )
    );

    toast.success(`Job status updated!`, {
      duration: 2000,
      position: "top-right",
    });
  };

  const handleViewJobApplicants = (job: Job) => {
    setSelectedJob(job);
    setIsJobApplicantsModalOpen(true);
  };

  const closeJobApplicantsModal = () => {
    setIsJobApplicantsModalOpen(false);
    setSelectedJob(null);
  };

  const handleDeleteClick = (job: Job) => {
    setJobToDelete(job);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (jobToDelete) {
      const response = await fetch(
        `${url}/admin/delete_job?id=${jobToDelete.job_id}`
      );

      const responseData = await response.json();
      if (!responseData.ok) {
        toast.error("Failed to delete job. Please try again.", {
          duration: 2000,
          position: "top-right",
        });
        setIsDeleteDialogOpen(false);
        setJobToDelete(null);
        return;
      }

      setJobsData((prevJobs) =>
        prevJobs.filter((job) => job.job_id !== jobToDelete.job_id)
      );
      toast.success(`Job ${jobToDelete.description.title} deleted!`, {
        duration: 2000,
        position: "top-right",
      });
      // Reset pagination if needed
      const newFilteredJobs = jobsData.filter(
        (job) => job.job_id !== jobToDelete.job_id
      );
      const newTotalPages = Math.ceil(newFilteredJobs.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }

    setIsDeleteDialogOpen(false);
    setJobToDelete(null);
  };
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setJobToDelete(null);
  };

  return (
    <div className="space-y-4 flex flex-col justify-center w-full items-center">
      <Toaster />
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
                <TableRow key={job.job_id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{job.description.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {job.description.type} • {job.description.experience}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {job.description.department.charAt(0).toUpperCase() +
                      job.description.department.slice(1)}
                  </TableCell>
                  <TableCell>{job.description.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">100</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={job.status === true}
                        onCheckedChange={() =>
                          toggleJobStatus(job.job_id, job.status)
                        }
                      />
                      <Label>
                        {job.status === true ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Badge
                        // variant="outline"
                        className="bg-green-50 cursor-pointer text-green-700 hover:bg-green-100 border-green-200"
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
                        onClick={() => handleDeleteClick(job)}
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

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="font-poppins">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Delete Job Posting
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {jobToDelete?.description.title}
              </span>
              ? This action cannot be undone and will permanently remove the job
              posting and all associated applicant data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 focus:ring-red-600"
            >
              Delete Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
        />
      )}
    </div>
  );
}
