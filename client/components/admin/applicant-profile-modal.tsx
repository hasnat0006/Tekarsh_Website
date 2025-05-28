"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  FileText,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Star,
  TrendingUp,
  Users,
  Clock,
  Target,
} from "lucide-react";
import { ApplicantType } from "@/types/interface";

interface ApplicantProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: ApplicantType;
  onStatusUpdate?: (applicantId: string, status: string) => void;
}

export default function ApplicantProfileModal({
  isOpen,
  onClose,
  applicant,
  onStatusUpdate,
}: ApplicantProfileModalProps) {
  const [activeTab, setActiveTab] = React.useState("overview");

  console.log("Applicant Profile Modal Props:", applicant);

  // Calculate total experience
  const totalExperience = React.useMemo(() => {
    if (
      !applicant.cv_data ||
      !applicant.cv_data.experience ||
      !Array.isArray(applicant.cv_data.experience) ||
      applicant.cv_data.experience.length === 0
    ) {
      return 0;
    }
    return applicant.cv_data.experience.reduce((total, exp) => {
      const duration = exp.duration;
      const years = duration.match(/\d{4}/g);
      if (years && years.length >= 2) {
        return total + (Number.parseInt(years[1]) - Number.parseInt(years[0]));
      } else if (
        years &&
        years.length === 1 &&
        duration.toLowerCase().includes("present")
      ) {
        const currentYear = new Date().getFullYear();
        return total + (currentYear - Number.parseInt(years[0]));
      }
      return total + 1;
    }, 0);
  }, [applicant.cv_data.experience]);

  // Group skills by category
  // const skillCategories = React.useMemo(() => {
  //   return applicant.cv_data.skills.reduce(
  //     (acc, skill) => {
  //       if (!acc[skill.category]) {
  //         acc[skill.category] = []
  //       }
  //       acc[skill.category].push(skill)
  //       return acc
  //     },
  //     {} as Record<string, typeof applicant.cv_data.skills>,
  //   )
  // }, [applicant.cv_data.skills])

  console.log("Applicant Profile Modal Rendered", applicant);

  const handleStatusChange = (newStatus: string) => {
    if (onStatusUpdate) {
      onStatusUpdate(applicant.applicants_id, newStatus);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "interview":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-6xl font-poppins max-h-[95vh] overflow-hidden">
        <ModalHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={"/placeholder.svg"} alt={applicant.name} />
                <AvatarFallback className="text-lg">
                  {applicant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <ModalTitle className="text-2xl text-start">
                  {applicant.name}
                </ModalTitle>
                <ModalDescription className="text-base mt-1">
                  Applied for {applicant.job_description.title} •{" "}
                  {applicant.cv_data.basicInfo.location}
                </ModalDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(applicant.status)}>
                    {applicant.status.charAt(0).toUpperCase() +
                      applicant.status.slice(1)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-violet-50 text-violet-700 border-violet-200"
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {applicant.analysis_data.overallMatch}% Match
                  </Badge>
                  {/* <Button
                    variant="link"
                    size="icon"
                    className="text-blue-600 ml-4 hover:text-blue-800"
                    onClick={() => setViewCV(!viewCV)}
                  >
                    {viewCV ? "Hide CV" : "View CV"}
                  </Button> */}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 m-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    // variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    size="sm"
                  >
                    Change Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("review")}
                  >
                    Under Review
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("interview")}
                  >
                    Interview Scheduled
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("hired")}>
                    Hired
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("rejected")}
                  >
                    Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    // variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    size="icon"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Interview
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </ModalHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="grid grid-cols-4 w-full mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills & Match</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Contact Information */}
                  <Card className="p-4">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <a
                            href={`mailto:${applicant.email}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {applicant.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <a
                            href={`tel:${applicant.phone}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {applicant.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">
                            {applicant.cv_data.basicInfo.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Applied</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              applicant.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex gap-2">
                        {applicant.cv_data.socialInfo.linkedin && (
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                            className="h-8 w-8"
                          >
                            <a
                              href={applicant.cv_data.socialInfo.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {applicant.cv_data.socialInfo.github && (
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                            className="h-8 w-8"
                          >
                            <a
                              href={applicant.cv_data.socialInfo.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {applicant.cv_data.socialInfo.portfolio && (
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                            className="h-8 w-8"
                          >
                            <a
                              href={applicant.cv_data.socialInfo.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Globe className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Insights */}
                  <Card className="lg:col-span-2 p-4">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg justify-center flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        AI-Powered Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${getMatchScoreColor(
                              applicant.analysis_data.overallMatch
                            )}`}
                          >
                            {applicant.analysis_data.overallMatch}%
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Overall Match
                          </p>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${getMatchScoreColor(
                              applicant.analysis_data.skillsMatch
                            )}`}
                          >
                            {applicant.analysis_data.skillsMatch}%
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Skill Match
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {applicant.analysis_data.yearOfExperience}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Years Exp.
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {applicant.cv_data.skills.length}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Skills
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Professional Summary
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {applicant.cv_data.basicInfo.personalSummary ||
                            "No summary provided. The candidate's professional summary is currently unavailable."}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Top Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {applicant.cv_data.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-violet-50 text-violet-700 border-violet-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="flex items-center justify-start">
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Education</p>
                          <p className="text-xs text-muted-foreground">
                            {applicant.cv_data.education.length > 0
                              ? `${applicant.cv_data.education[0].degree}, ${applicant.cv_data.education[0].university}`
                              : "No education data"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="flex items-center justify-start">
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Award className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Certifications</p>
                          <p className="text-xs text-muted-foreground">
                            {applicant.cv_data.certifications?.length}{" "}
                            professional certifications
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="flex items-center justify-start">
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Target className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Projects</p>
                          <p className="text-xs text-muted-foreground">
                            {applicant.cv_data.projects?.length} notable
                            projects
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-6 mt-0">
                <Card className="flex flex-col justify-center items-center">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Professional Experience
                    </CardTitle>
                    <CardDescription className="text-center">
                      {applicant.cv_data.experience?.length} roles spanning{" "}
                      {totalExperience} years
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {applicant.cv_data.experience?.map((exp, index) => (
                        <div
                          key={index}
                          className="relative pl-6 pb-6 border-l-2 border-muted last:border-l-0"
                        >
                          <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-violet-600"></div>
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{exp.role}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {exp.company}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {exp.duration}
                              </Badge>
                            </div>
                            <p className="text-sm leading-relaxed">
                              {exp.responsibilities}
                            </p>
                            {applicant.cv_data.achievements &&
                              applicant.cv_data.achievements?.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">
                                    Key Achievements:
                                  </p>
                                  <ul className="text-xs space-y-1">
                                    {applicant.cv_data.achievements.map(
                                      (achievement, achIndex) => (
                                        <li
                                          key={achIndex}
                                          className="flex items-start gap-2"
                                        >
                                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span>{achievement.title}</span>
                                          <span className="text-xs text-muted-foreground">
                                            {achievement.description || ""}
                                          </span>
                                          <span className="text-xs text-muted-foreground">
                                            {achievement.date || "N/A"}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills & Match Tab */}
              <TabsContent value="skills" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Job Match Analysis */}
                  <Card>
                    <CardHeader className="flex items-center justify-center">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Job Match Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Match</span>
                            <span className="font-medium">
                              {applicant.analysis_data.overallMatch}%
                            </span>
                          </div>
                          <Progress
                            value={applicant.analysis_data.overallMatch}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Skills Match</span>
                            <span className="font-medium">
                              {applicant.analysis_data.skillsMatch}%
                            </span>
                          </div>
                          <Progress
                            value={applicant.analysis_data.skillsMatch}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Experience Match</span>
                            <span className="font-medium">
                              {applicant.analysis_data.yearOfExperience}%
                            </span>
                          </div>
                          <Progress
                            value={applicant.analysis_data.yearOfExperience}
                            className="h-2"
                          />
                        </div>
                        {/* <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Education Match</span>
                            <span className="font-medium">
                              {applicant.analysis_data.educationMatch}%
                            </span>
                          </div>
                          <Progress
                            value={applicant.analysis_data.educationMatch}
                            className="h-2"
                          />
                        </div> */}
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-green-700">
                          Strengths
                        </h4>
                        <ul className="space-y-1">
                          {applicant.analysis_data.strengths
                            .slice(0, 3)
                            .map((strength, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-amber-700">
                          Areas for Consideration
                        </h4>
                        <ul className="space-y-1">
                          {applicant.analysis_data.lackingsArea
                            .slice(0, 2)
                            .map((gap, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm"
                              >
                                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>{gap}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills Breakdown */}
                  <Card>
                    <CardHeader className="flex items-center justify-center">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Skills Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* {Object.entries(skillCategories).map(
                        ([category, skills]) => (
                          <div key={category}>
                            <h4 className="text-sm font-medium capitalize mb-2">
                              {category}
                            </h4>
                            <div className="space-y-2">
                              {skills.slice(0, 4).map((skill, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-sm">{skill.name}</span>
                                  <div className="flex items-center w-24 gap-2">
                                    <Progress
                                      value={skill.level * 10}
                                      className="w-16 h-2"
                                    />
                                    <span className="text-xs text-muted-foreground w-8">
                                      {skill.level}/10
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )} */}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Education */}
                  <Card>
                    <CardHeader className="flex items-center justify-center">
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-48 overflow-y-auto">
                        {applicant.cv_data.education.map((edu, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-muted pl-4"
                          >
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">
                              {edu.university}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {edu.startYear} - {edu.graduationYear}
                            </p>
                            {edu.degree && (
                              <p className="text-sm mt-1">{edu.degree}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card>
                    <CardHeader className="flex items-center justify-center">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-48 overflow-y-auto">
                        {applicant.cv_data.certifications?.map(
                          (cert, index) => (
                            <div
                              key={index}
                              className="border-l-2 border-muted pl-4"
                            >
                              <h4 className="font-medium">{cert.title}</h4>
                              {cert.issuingOrganization && (
                                <p className="text-sm text-muted-foreground">
                                  {cert.issuingOrganization}
                                </p>
                              )}
                              {cert.issueDate && (
                                <p className="text-sm text-muted-foreground">
                                  Issued: {cert.issueDate}
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Projects */}
                <Card>
                  <CardHeader className="flex items-center justify-center">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Notable Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-48 overflow-y-auto">
                      {applicant.cv_data.projects.map((project, index) => (
                        <div
                          key={index}
                          className="border-2 border-[var(--word)]/5 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{project.title}</h4>
                            {project.links && (
                              <Button
                                // variant="ghost"
                                size="icon"
                                asChild
                                className="h-8 w-8 bg-blue-50 hover:bg-blue-100 text-blue-500 hover:text-blue-700"
                              >
                                <a
                                  href={project.links || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ModalContent>
    </Modal>
  );
}
