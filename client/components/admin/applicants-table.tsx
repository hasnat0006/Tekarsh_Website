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
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ApplicantProfileModal from "@/components/admin/applicant-profile-modal";
import { extractCVData, analyzeJobMatch } from "@/lib/ai-service";
import type { ExtractedCVData, JobMatchAnalysis } from "@/lib/ai-service";

import {
  mockCVData,
  applicantsData,
  jobRequirements,
} from "../resources/cv-data";

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ApplicantsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const [applicantData, setApplicantData] = useState<any[]>([]);
  const [selectedCVData, setSelectedCVData] = useState<ExtractedCVData | null>(
    null
  );
  const [selectedJobMatch, setSelectedJobMatch] =
    useState<JobMatchAnalysis | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicants, setApplicants] = useState(applicantsData);

  const itemsPerPage = 5;

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    const fetchApplicants = async () => {
      const response = await fetch(`${url}/get-applicants?id=${userid}`);
      if (!response.ok) {
        console.error("Failed to fetch applicants");
        return;
      }
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setApplicantData(data);
      } else {
        console.error("Invalid applicants data format", data);
      }
    };
    fetchApplicants();
  }, [userid]);

  useEffect(() => {
    console.log("Applicants data: ", applicantData);
  }, [applicantData]);

  // Get unique positions for filter
  const positions = Array.from(
    new Set(applicants.map((applicant) => applicant.appliedFor))
  );

  // Filter applicants based on search term, status, and position
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.appliedFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || applicant.status === statusFilter;
    const matchesPosition =
      positionFilter === "all" || applicant.appliedFor === positionFilter;

    return matchesSearch && matchesStatus && matchesPosition;
  });

  // Paginate results
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const paginatedApplicants = filteredApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewApplicant = async (applicant: any) => {
    try {
      // Get mock CV data for this applicant
      const cvText = mockCVData[applicant.id] || mockCVData["1"];

      // Extract CV data using AI
      const cvData = await extractCVData(cvText);

      // Analyze job match
      const jobMatch = await analyzeJobMatch(cvData, jobRequirements);

      setSelectedApplicant(applicant);
      setSelectedCVData(cvData);
      setSelectedJobMatch(jobMatch);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error processing applicant data:", error);
    }
  };

  const handleStatusUpdate = (applicantId: string, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === applicantId
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );

    // Update selected applicant if it's the one being updated
    if (selectedApplicant?.id === applicantId) {
      setSelectedApplicant((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplicant(null);
    setSelectedCVData(null);
    setSelectedJobMatch(null);
  };

  return (
    <div className="space-y-4 flex flex-col items-center">
      <Card className="w-4/5">
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search applicants by name, email, position, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Select
                    value={positionFilter}
                    onValueChange={setPositionFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Positions</SelectItem>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
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
                      setPositionFilter("all");
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

      <div className="rounded-md border-2 border-[var(--word)]/10 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>AI Match</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedApplicants.length > 0 ? (
              paginatedApplicants.map((applicant) => (
                <TableRow
                  key={applicant.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewApplicant(applicant)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={applicant.photo || "/placeholder.svg"}
                          alt={applicant.name}
                        />
                        <AvatarFallback>
                          {applicant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {applicant.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{applicant.appliedFor}</div>
                      <div className="text-sm text-muted-foreground">
                        {applicant.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {applicant.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        applicant.status === "hired"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : applicant.status === "rejected"
                          ? "bg-red-100 text-red-800 hover:bg-red-200"
                          : applicant.status === "interview"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }
                    >
                      {applicant.status.charAt(0).toUpperCase() +
                        applicant.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={applicant.aiScore}
                        className="h-2 w-16"
                        indicatorClassName={
                          applicant.aiScore >= 90
                            ? "bg-green-500"
                            : applicant.aiScore >= 80
                            ? "bg-blue-500"
                            : applicant.aiScore >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      />
                      <span className="text-sm">{applicant.aiScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewApplicant(applicant);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Change Status
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Download Resume
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8 mb-2" />
                    <p>No applicants found</p>
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
      {filteredApplicants.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredApplicants.length)} of{" "}
            {filteredApplicants.length} applicants
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

      {/* Applicant Profile Modal */}
      {selectedApplicant && selectedCVData && selectedJobMatch && (
        <ApplicantProfileModal
          isOpen={isModalOpen}
          onClose={closeModal}
          applicant={selectedApplicant}
          cvData={selectedCVData}
          jobMatch={selectedJobMatch}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
