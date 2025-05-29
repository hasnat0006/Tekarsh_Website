"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import ApplicantProfileModal from "./applicant-profile-modal";


import { ApplicantType } from "@/types/interface";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RecentApplicants() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<ApplicantType | null>(null);
  const [recentApplicants, setRecentApplicants] = useState<ApplicantType[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      // Simulate fetching applicants from an API
      try {
        const response = await fetch(`${url}/get-applicants`);
        const data = await response.json();
        if (!data.ok) {
          throw new Error(data.message || "Failed to fetch applicants");
        }
        console.log("Fetched applicants:", data);
        data.applicants.slice(0, 10); // Limit to 10 recent applicants
        setRecentApplicants(data.applicants);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchApplicants();
  }, []);

  useEffect(() => {
    console.log("Recent applicants updated:", recentApplicants);
  }, [recentApplicants]);

  const handleViewApplicant = async (applicant: ApplicantType) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
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


  useEffect(() => {
    console.log("Selected applicant:", selectedApplicant);
  }, [selectedApplicant]);


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
              key={applicant.applicants_id}
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
                  <AvatarImage src={"/placeholder.svg"} alt={applicant.name} />
                  <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{applicant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {applicant.job_description.title}
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
          {selectedApplicant &&  (
            <ApplicantProfileModal
              isOpen={isModalOpen}
              onClose={closeModal}
              applicant={selectedApplicant}
              onStatusUpdate={handleStatusUpdate}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
