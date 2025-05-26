"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { extractCVData, analyzeJobMatch } from "@/lib/ai-service";
import type { ExtractedCVData, JobMatchAnalysis } from "@/lib/ai-service";
import { jobRequirements, mockCVData, applicantsData } from "../resources/cv-data";
import ApplicantProfileModal from "./applicant-profile-modal";
// Mock data for recent applicants
const recentApplicants = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "2023-05-15T10:30:00Z",
    status: "interview",
    aiScore: 88,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    appliedFor: "UX/UI Designer",
    appliedDate: "2023-05-10T14:45:00Z",
    status: "review",
    aiScore: 92,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    appliedFor: "Backend Engineer",
    appliedDate: "2023-05-08T09:15:00Z",
    status: "hired",
    aiScore: 95,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    appliedFor: "Product Manager",
    appliedDate: "2023-05-05T16:20:00Z",
    status: "rejected",
    aiScore: 72,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    appliedFor: "DevOps Engineer",
    appliedDate: "2023-05-03T11:10:00Z",
    status: "review",
    aiScore: 85,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "2023-05-15T10:30:00Z",
    status: "interview",
    aiScore: 88,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    appliedFor: "UX/UI Designer",
    appliedDate: "2023-05-10T14:45:00Z",
    status: "review",
    aiScore: 92,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    appliedFor: "Backend Engineer",
    appliedDate: "2023-05-08T09:15:00Z",
    status: "hired",
    aiScore: 95,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    appliedFor: "Product Manager",
    appliedDate: "2023-05-05T16:20:00Z",
    status: "rejected",
    aiScore: 72,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    appliedFor: "DevOps Engineer",
    appliedDate: "2023-05-03T11:10:00Z",
    status: "review",
    aiScore: 85,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function RecentApplicants() {
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [selectedCVData, setSelectedCVData] = useState<ExtractedCVData | null>(
    null
  );
  const [selectedJobMatch, setSelectedJobMatch] =
    useState<JobMatchAnalysis | null>(null);
  const [applicants, setApplicants] = useState(applicantsData);

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
    <Card className="w-full p-2">
      <CardContent>
        <div className="space-y-4">
          {recentApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Avatar
                  style={{
                    backgroundColor: `#${Math.floor(Math.random() * 16777215)
                      .toString(16)
                      .padStart(6, "0")}33`,
                  }}
                >
                  <AvatarImage
                    src={applicant.avatar || "/placeholder.svg"}
                    alt={applicant.name}
                  />
                  <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{applicant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {applicant.appliedFor}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewApplicant(applicant)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
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
      </CardContent>
    </Card>
  );
}
