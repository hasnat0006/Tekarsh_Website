"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  CheckCircle2,
  Copy,
  Facebook,
  Linkedin,
  Loader2,
  MapPin,
  Share2,
  Twitter,
  Upload,
} from "lucide-react";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/auth";
import toast, { Toaster } from "react-hot-toast";

import { Job, AnalysisData, CVDataAdmin } from "@/types/interface";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

interface JobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobModal({ job, isOpen, onClose }: JobModalProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | null,
    cvUrl: "",
    coverLetter: "",
  });

  const [anaData, setAnaData] = useState<AnalysisData | null>(null);
  const [cvData, setCVData] = useState<CVDataAdmin | null>(null);

  // Ensure job_id updates when job changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      job_id: job.job_id,
    }));
  }, [job.job_id]);

  console.log("Job data:", job);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleCVUpload = async () => {
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    if (!formData.resume) {
      toast.error("Please select a CV file to upload.");
      console.error("No CV file selected");
      return;
    }
    supabase.storage
      .from("cv")
      .upload(fileName, formData.resume)
      .then(({ error }) => {
        if (error) {
          setFormData((prev) => ({ ...prev, cvUrl: "" }));
        } else {
          setFormData((prev) => ({
            ...prev,
            cvUrl: fileName,
          }));
          toast.success("CV uploaded successfully!");
        }
      })
      .finally(() => {
        console.log("CV upload process completed.");
      });
    return formData.cvUrl;
  };

  const handleCVAnalysis = async () => {
    if (!formData.cvUrl) {
      toast.error("No CV uploaded!!");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/analyze-cv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvUrl: formData.cvUrl,
          jobId: job.job_id,
        }),
      });

      const data = await response.json();

      if (!data) {
        toast.error("CV analysis failed!!");
        return;
      }

      console.log("CV Analysis Result:", data);
      setAnaData(data.analysis);
      setCVData(data.cvData);
      toast.success("CV analysis complete!");
      console.log("CV Analysis Data:", data.analysis);
      return data;
    } catch (error) {
      toast.error("There was an error analyzing your CV.");
    }
  };

  // useEffect(() => {
  //   console.log("Form Data from effect:", formData);
  // }, [formData]);

  const [isCVUploading, setIsCVUploading] = useState(false);
  const [isAnalysis, setIsAnalysis] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsSubmitting(true);

    // upload resume to Supabase storage
    if (formData.resume) {
      console.log("Uploading CV:", formData.resume.name);

      setIsCVUploading(true);
      const uurl = await handleCVUpload();
      setIsCVUploading(false);
      console.log("CV uploaded successfully:", uurl);
      // If CV analysis is enabled, call the analysis function

      console.log("Starting CV analysis...");
      setIsAnalysis(true);
      const analysisResult = await handleCVAnalysis();
      setIsAnalysis(false);

      if (
        analysisResult.analysis.overallMatch < 30 &&
        analysisResult.analysis.skillsMatch < 30
      ) {
        toast.error(
          "Your CV does not meet the minimum requirements for this job.",
          {
            duration: 10000,
          }
        );
        return;
      } else {
        toast.success(
          `Your CV matches ${analysisResult.analysis.overallMatch}% with this job.`,
          {
            duration: 5000,
          }
        );
      }

      console.log("Submitting application with data:", {
        jobId: job.job_id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume: formData.cvUrl,
        coverLetter: formData.coverLetter,
        analysisData: anaData,
        cvData: cvData,
      });

      if (
        !analysisResult ||
        !analysisResult.analysis ||
        !analysisResult.cvData
      ) {
        toast.error("CV analysis failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${backendUrl}/apply-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cvData: cvData || analysisResult.cvData,
          analysisData: anaData || analysisResult.analysis,
        }),
      });
      const data = await response.json();
      if (!data.ok) {
        toast.error(
          `Application submission failed: ${data.message || "Unknown error"}`
        );
        console.error("Error submitting application:", data);
      } else {
        console.log("Application submitted successfully:", data);
        toast.success("Application submitted successfully!");
      }

      setIsSubmitting(false);
      onClose();
    } else {
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

  const shareJob = () => {
    // Create the shareable URL with job ID
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/careers?jobId=${job.job_id}#open-positions`;

    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: `Job Opening: ${job.description.title}`,
          text: `Check out this job opportunity: ${job.description.title} at our company!`,
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

  const shareToSocial = (platform: string) => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/careers?jobId=${job.job_id}#open-positions`;
    // const title = `Job Opening: ${job.description.title}`;
    const text = `Check out this job opportunity: ${job.description.title} at our company!`;

    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  console.log("Form submitted:", {
    jobId: job.job_id,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    resume: formData.cvUrl,
    coverLetter: formData.coverLetter,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Toaster position="top-right" />
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <DialogTitle className="text-2xl">
                {job.description.title}
              </DialogTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    className="rounded-full bg-[var(--green)]/10  text-[var(--green)] hover:-translate-y-0.5 transition-transform border-2 border-[var(--green)]/20 hover:bg-[var(--green)]/20"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share job</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/career?jobId=${job.job_id}#open-positions`
                      )
                    }
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Copy link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareToSocial("facebook")}>
                    <Facebook className="mr-2 h-4 w-4" />
                    <span>Share to Facebook</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareToSocial("twitter")}>
                    <Twitter className="mr-2 h-4 w-4" />
                    <span>Share to Twitter</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareToSocial("linkedin")}>
                    <Linkedin className="mr-2 h-4 w-4" />
                    <span>Share to LinkedIn</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>
                  {job.description.department.charAt(0).toUpperCase() +
                    job.description.department.slice(1)}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.description.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
              >
                {job.description.type}
              </Badge>
              {job.description.experience.includes("0-2") && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Entry Level
                </Badge>
              )}
              {job.description.location.toLowerCase().includes("remote") && (
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                >
                  Remote
                </Badge>
              )}
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
              >
                {job.description.experience}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          defaultValue="details"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="apply">Apply Now</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About the Role</h3>
                <p className="text-gray-700">{job.description.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                <ul className="space-y-2">
                  {job.description.responsibilities.map(
                    (item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[var(--green)] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {job.description.requirements.map(
                    (item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[var(--green)] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Nice to Have</h3>
                <ul className="space-y-2">
                  {job.description.preferred.map(
                    (item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[var(--green)] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={shareJob} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share This Job
              </Button>
              <Button
                className="bg-[var(--green)]/80 hover:bg-[var(--green)]/90 text-[var(--word)] hover:-translate-y-0.5"
                onClick={() => setActiveTab("apply")}
              >
                Apply for this Position
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="apply" className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/CV *</Label>
                  <div className="border-2 relative overflow-hidden border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume" className="cursor-pointer">
                      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm font-medium mb-1">
                        {formData.resume
                          ? formData.resume.name
                          : "Upload your resume"}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        PDF, DOC, or DOCX up to 5MB
                      </p>
                      <Button size="sm">Browse Files</Button>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    className="min-h-[120px]"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <DialogFooter className="mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("details")}
                >
                  Back to Details
                </Button>
                <Button
                  type="submit"
                  className="bg-[var(--green)]/50 hover:bg-[var(--green)]/70 text-[var(--word)] hover:-translate-y-0.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isCVUploading
                        ? "Uploading CV..."
                        : isAnalysis
                        ? "Analyzing CV..."
                        : "Submitting..."}
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
        {/* <AlertDialog
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
                ? This action cannot be undone and will permanently remove the
                job posting and all associated applicant data.
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
        </AlertDialog> */}
      </DialogContent>
    </Dialog>
  );
}
