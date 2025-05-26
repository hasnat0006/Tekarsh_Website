"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle } from "@/components/ui/modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Search,
  MoreVertical,
  Eye,
  Mail,
  Calendar,
  Download,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
} from "lucide-react"
import ApplicantProfileModal from "@/components/admin/applicant-profile-modal"
import { extractCVData, analyzeJobMatch } from "@/lib/ai-service"
import type { ExtractedCVData, JobMatchAnalysis } from "@/lib/ai-service"

interface JobApplicantsModalProps {
  isOpen: boolean
  onClose: () => void
  job: any
  applicants: any[]
  onApplicantStatusUpdate?: (applicantId: string, status: string) => void
}

// Mock CV data for applicants (in production, this would come from your database)
const mockCVData: Record<string, string> = {
  "1": `
SARAH JOHNSON
Frontend Developer
San Francisco, CA | sarah.johnson@example.com | (555) 123-4567

SUMMARY
Experienced Frontend Developer with 6+ years of expertise in building responsive, accessible web applications using React, TypeScript, and modern JavaScript.

SKILLS
- Programming: JavaScript, TypeScript, HTML5, CSS3, React, Next.js, Redux
- Tools & Frameworks: Webpack, Babel, Jest, React Testing Library, Git

EXPERIENCE
Senior Frontend Developer
Tech Solutions Inc. | 2019 - 2023
- Led frontend development of a SaaS platform serving 50,000+ users
- Architected and implemented a component library used across 5 product teams

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2017
`,
  "2": `
MICHAEL CHEN
UX/UI Designer
New York, NY | michael.chen@example.com | (555) 234-5678

SUMMARY
Creative UX/UI Designer with 5+ years of experience designing user-centered digital experiences.

SKILLS
- Design Tools: Figma, Sketch, Adobe Creative Suite, InVision
- Research: User Interviews, Usability Testing, A/B Testing

EXPERIENCE
Senior UX Designer
Design Studio Pro | 2020 - 2023
- Led design for mobile app with 100K+ downloads
- Conducted user research and usability testing

EDUCATION
Bachelor of Fine Arts in Graphic Design
Parsons School of Design | 2018
`,
}

export default function JobApplicantsModal({
  isOpen,
  onClose,
  job,
  applicants,
  onApplicantStatusUpdate,
}: JobApplicantsModalProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("applied_date")
  const [selectedApplicant, setSelectedApplicant] = React.useState<any>(null)
  const [selectedCVData, setSelectedCVData] = React.useState<ExtractedCVData | null>(null)
  const [selectedJobMatch, setSelectedJobMatch] = React.useState<JobMatchAnalysis | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // Filter and sort applicants
  const filteredAndSortedApplicants = React.useMemo(() => {
    const filtered = applicants.filter((applicant) => {
      const matchesSearch =
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.skills?.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || applicant.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort applicants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "ai_score":
          return (b.aiScore || 0) - (a.aiScore || 0)
        case "applied_date":
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

    return filtered
  }, [applicants, searchTerm, statusFilter, sortBy])

  // Calculate statistics
  const stats = React.useMemo(() => {
    const total = applicants.length
    const byStatus = applicants.reduce(
      (acc, applicant) => {
        acc[applicant.status] = (acc[applicant.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const avgScore = applicants.reduce((sum, app) => sum + (app.aiScore || 0), 0) / total || 0

    return {
      total,
      review: byStatus.review || 0,
      interview: byStatus.interview || 0,
      hired: byStatus.hired || 0,
      rejected: byStatus.rejected || 0,
      avgScore: Math.round(avgScore),
    }
  }, [applicants])

  const handleViewApplicant = async (applicant: any) => {
    setIsLoading(true)
    try {
      // Get mock CV data for this applicant
      const cvText = mockCVData[applicant.id] || mockCVData["1"]

      // Extract CV data using AI
      const cvData = await extractCVData(cvText)

      // Create job requirements from the job posting
      const jobRequirements = {
        title: job.title,
        department: job.department,
        requiredSkills: job.requirements || [],
        requiredExperience: job.experience || "",
        preferredSkills: job.preferred || [],
        education: "Bachelor's degree or equivalent experience",
      }

      // Analyze job match
      const jobMatch = await analyzeJobMatch(cvData, jobRequirements)

      setSelectedApplicant(applicant)
      setSelectedCVData(cvData)
      setSelectedJobMatch(jobMatch)
      setIsProfileModalOpen(true)
    } catch (error) {
      console.error("Error processing applicant data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = (applicantId: string, newStatus: string) => {
    if (onApplicantStatusUpdate) {
      onApplicantStatusUpdate(applicantId, newStatus)
    }

    // Update selected applicant if it's the one being updated
    if (selectedApplicant?.id === applicantId) {
      setSelectedApplicant((prev: any) => ({ ...prev, status: newStatus }))
    }
  }

  const closeProfileModal = () => {
    setIsProfileModalOpen(false)
    setSelectedApplicant(null)
    setSelectedCVData(null)
    setSelectedJobMatch(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "interview":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "hired":
        return <CheckCircle className="h-3 w-3" />
      case "rejected":
        return <XCircle className="h-3 w-3" />
      case "interview":
        return <Calendar className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <>
      <Modal open={isOpen} onOpenChange={onClose}>
        <ModalContent className="max-w-6xl max-h-[95vh] overflow-hidden">
          <ModalHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <ModalTitle className="text-2xl flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Applicants for {job.title}
                </ModalTitle>
                <ModalDescription className="text-base mt-1">
                  {job.department.charAt(0).toUpperCase() + job.department.slice(1)} • {job.location} • {job.type}
                </ModalDescription>
              </div>
              <Badge className="bg-violet-50 m-2 text-violet-700 border-violet-200">
                {stats.total} Applicants
              </Badge>
            </div>
          </ModalHeader>

          <div className="flex-1 overflow-hidden flex items-center justify-center flex-col">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 w-full gap-4 mb-6">
              <Card>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-lg font-semibold">{stats.total}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="text-lg font-semibold">{stats.review}</p>
                      <p className="text-xs text-muted-foreground">Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-lg font-semibold">{stats.interview}</p>
                      <p className="text-xs text-muted-foreground">Interview</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-lg font-semibold">{stats.hired}</p>
                      <p className="text-xs text-muted-foreground">Hired</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-lg font-semibold">{stats.avgScore}%</p>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row w-4/5 gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search applicants by name, email, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied_date">Applied Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="ai_score">AI Score</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Applicants List */}
            <div className="flex-1 w-full overflow-y-auto">
              {filteredAndSortedApplicants.length > 0 ? (
                <div className="space-y-3">
                  {filteredAndSortedApplicants.map((applicant) => (
                    <Card
                      key={applicant.id}
                      className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-l-violet-500"
                      onClick={() => handleViewApplicant(applicant)}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={applicant.photo || "/placeholder.svg"} alt={applicant.name} />
                              <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-lg">{applicant.name}</h4>
                                <Badge className={getStatusColor(applicant.status)} variant="secondary">
                                  {getStatusIcon(applicant.status)}
                                  <span className="ml-1 capitalize">{applicant.status}</span>
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate">{applicant.email}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{applicant.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(applicant.appliedDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                              {applicant.skills && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {applicant.skills.slice(0, 4).map((skill: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {applicant.skills.length > 4 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{applicant.skills.length - 4} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className={`text-xl font-bold ${getScoreColor(applicant.aiScore || 0)}`}>
                                {applicant.aiScore || 0}%
                              </div>
                              <p className="text-xs text-muted-foreground">AI Match</p>
                              <Progress
                                value={applicant.aiScore || 0}
                                className="w-16 h-2 mt-1"
                                indicatorClassName={
                                  (applicant.aiScore || 0) >= 90
                                    ? "bg-green-500"
                                    : (applicant.aiScore || 0) >= 80
                                      ? "bg-blue-500"
                                      : (applicant.aiScore || 0) >= 70
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                }
                              />
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleViewApplicant(applicant)
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Schedule Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Resume
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleStatusUpdate(applicant.id, "interview")
                                  }}
                                >
                                  Move to Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleStatusUpdate(applicant.id, "hired")
                                  }}
                                >
                                  Mark as Hired
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No applicants found</h3>
                  <p className="text-sm text-center">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "No one has applied for this position yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ModalContent>
      </Modal>

      {/* Applicant Profile Modal */}
      {selectedApplicant && selectedCVData && selectedJobMatch && (
        <ApplicantProfileModal
          isOpen={isProfileModalOpen}
          onClose={closeProfileModal}
          applicant={selectedApplicant}
          cvData={selectedCVData}
          jobMatch={selectedJobMatch}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </>
  )
}
