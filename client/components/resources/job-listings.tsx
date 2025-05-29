"use client";
import JobModal from "@/components/job-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Job, JobListingsProps } from "@/types/interface";
import { Briefcase, MapPin, Search, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function JobListings({ category }: JobListingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`${url}/get-jobs`);
      const data = await response.json();
      if (!data) {
        console.error("Failed to fetch jobs data");
        return;
      }
      console.log("Fetched jobs data:", data);
      setJobsData(data);
    };
    fetchJobs().catch((error) => {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error fetching jobs",
        description: "Please try again later.",
        variant: "destructive",
      });
    });
  }, []);

  // Check for job ID in URL params on component mount
  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (jobId) {
      const job = jobsData.find((j) => j.job_id === jobId);
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
    const matchesCategory =
      category === "all" || job.description.department === category;
    const matchesSearch = job.description.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation =
      !locationFilter || job.description.location.includes(locationFilter);
    const matchesExperience =
      !experienceFilter ||
      job.description.experience.includes(experienceFilter);

    return (
      matchesCategory && matchesSearch && matchesLocation && matchesExperience
    );
  });

  const openJobModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    // Update URL with job ID without full page reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("jobId", job.job_id.toString());
    window.history.pushState({}, "", newUrl.toString());
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
    // Remove job ID from URL when modal is closed
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("jobId");
    window.history.pushState({}, "", newUrl.toString());
  };

  const shareJob = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();

    // Create the shareable URL with job ID
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/career?jobId=${job.job_id}#open-positions`;

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

  // Get unique locations for filter
  const locations = Array.from(
    new Set(
      jobsData.map((job) => {
        const locationParts = job.description.location.split("(")[0].trim();
        return locationParts;
      })
    )
  );

  // Get unique experience levels for filter
  const experienceLevels = Array.from(
    new Set(jobsData.map((job) => job.description.experience))
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
              key={job.job_id}
              className="bg-[var(--word)]/4 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold mb-2">
                      {job.description.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                    >
                      {job.description.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
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
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-200"
                    >
                      {job.description.salary?.currency}{": "}
                      {job.description.salary?.min} -{" "}
                      {job.description.salary?.max}{" "}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                    >
                      {job.description.experience}
                    </Badge>
                    {job.description.experience.includes("0-2") && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                      >
                        Entry Level
                      </Badge>
                    )}
                    {job.description.location
                      .toLowerCase()
                      .includes("remote") && (
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
