"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Upload,
  Loader2,
  Share2,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JobModalProps {
  job: any;
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
    coverLetter: "",
  });

  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted!",
        description: "We've received your application for " + job.title,
      });
      onClose();
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: "",
      });
    }, 1500);
  };

  const shareJob = () => {
    // Create the shareable URL with job ID
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/careers?jobId=${job.id}#open-positions`;

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

  const shareToSocial = (platform: string) => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/careers?jobId=${job.id}#open-positions`;
    const title = `Job Opening: ${job.title}`;
    const text = `Check out this job opportunity: ${job.title} at our company!`;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <DialogTitle className="text-2xl">{job.title}</DialogTitle>
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
                        `${window.location.origin}/career?jobId=${job.id}#open-positions`
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
                  {job.department.charAt(0).toUpperCase() +
                    job.department.slice(1)}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
              >
                {job.type}
              </Badge>
              {job.experience.includes("0-2") && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
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
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
              >
                {job.experience}
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
                <p className="text-gray-700">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--green)] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--green)] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Nice to Have</h3>
                <ul className="space-y-2">
                  {job.preferred.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--green)] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                      <Button type="button" variant="outline" size="sm">
                        Browse Files
                      </Button>
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
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
