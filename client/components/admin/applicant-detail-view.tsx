"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "lucide-react"
import type { ExtractedCVData, JobMatchAnalysis } from "@/lib/ai-service"
import ApplicantTimeline from "@/components/admin/applicant-timeline"
import SkillsRadarChart from "@/components/admin/skills-radar-chart"
import ExperienceTimeline from "@/components/admin/experience-timeline"

interface ApplicantDetailViewProps {
  applicant: any
  cvData: ExtractedCVData
  jobMatch: JobMatchAnalysis
  applicantId: string
}

export default function ApplicantDetailView({ applicant, cvData, jobMatch, applicantId }: ApplicantDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Group skills by category
  const skillCategories = cvData.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof cvData.skills>,
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="job-match">Job Match</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={applicant.photo || "/placeholder.svg"} alt={applicant.name} />
                    <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{applicant.name}</h3>
                  <p className="text-muted-foreground">{applicant.appliedFor}</p>
                  <div className="flex gap-2 mt-2">
                    {applicant.linkedin && (
                      <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                        <a href={applicant.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {applicant.github && (
                      <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                        <a href={applicant.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {applicant.website && (
                      <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                        <a href={applicant.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{applicant.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{applicant.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{applicant.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Applied Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(applicant.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Application Status</h4>
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
                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Documents</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>View Resume</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download CV</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary and Key Info */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Professional Summary</CardTitle>
                <CardDescription>AI-generated summary based on CV analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm">{cvData.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Job Match</h4>
                    <div className="flex items-center gap-2">
                      <Progress value={jobMatch.overallMatch} className="h-2" />
                      <span className="text-sm font-medium">{jobMatch.overallMatch}%</span>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Experience</h4>
                    <p className="text-sm">
                      {cvData.experience.length > 0
                        ? `${cvData.experience.length} roles, ${calculateTotalExperience(cvData.experience)} years`
                        : "No experience data"}
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Education</h4>
                    <p className="text-sm">
                      {cvData.education.length > 0
                        ? `${cvData.education[0].degree}, ${cvData.education[0].institution}`
                        : "No education data"}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Top Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills
                      .sort((a, b) => b.level - a.level)
                      .slice(0, 10)
                      .map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-200"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {cvData.languages.map((language, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <Badge variant="outline">
                          {language.name} - {language.proficiency}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education and Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cvData.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-muted pl-4 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium">{edu.degree}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution} | {edu.year}
                      </p>
                      {edu.achievements && <p className="text-sm mt-1">{edu.achievements}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cvData.certifications.map((cert, index) => (
                    <div key={index} className="border-l-2 border-muted pl-4 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium">{cert.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} | {cert.year}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvData.projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{project.name}</h4>
                      {project.url && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <p className="text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
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

        {/* Experience Tab */}
        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle>Professional Experience</CardTitle>
              <CardDescription>
                {cvData.experience.length} roles spanning {calculateTotalExperience(cvData.experience)} years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExperienceTimeline experience={cvData.experience} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Overview</CardTitle>
              <CardDescription>Comprehensive analysis of candidate skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <SkillsRadarChart skills={cvData.skills} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Skill Breakdown</h3>
                  <p className="text-sm text-muted-foreground">
                    The candidate has {cvData.skills.length} skills across {Object.keys(skillCategories).length}{" "}
                    categories
                  </p>

                  <div className="space-y-4 mt-4">
                    {Object.entries(skillCategories).map(([category, skills]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium capitalize mb-2">{category}</h4>
                        <div className="space-y-2">
                          {skills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{skill.name}</span>
                              <div className="flex items-center gap-2">
                                <Progress value={skill.level * 10} className="w-24 h-2" />
                                <span className="text-xs text-muted-foreground">{skill.level}/10</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Match Tab */}
        <TabsContent value="job-match" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Match Analysis</CardTitle>
              <CardDescription>AI-powered assessment of candidate fit for the role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <h4 className="text-sm font-medium mb-2">Overall Match</h4>
                  <div className="relative h-24 w-24 mx-auto">
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-full"
                      style={{
                        background: `conic-gradient(#8b5cf6 ${jobMatch.overallMatch}%, #e5e7eb ${jobMatch.overallMatch}% 100%)`,
                      }}
                    >
                      <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                        <span className="text-xl font-bold">{jobMatch.overallMatch}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Skill Match</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={jobMatch.skillMatch} className="h-2" />
                    <span className="text-sm font-medium">{jobMatch.skillMatch}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Experience Match</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={jobMatch.experienceMatch} className="h-2" />
                    <span className="text-sm font-medium">{jobMatch.experienceMatch}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Education Match</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={jobMatch.educationMatch} className="h-2" />
                    <span className="text-sm font-medium">{jobMatch.educationMatch}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Strengths</h4>
                  <ul className="space-y-2">
                    {jobMatch.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Areas for Consideration</h4>
                  <ul className="space-y-2">
                    {jobMatch.gaps.map((gap, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {jobMatch.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-violet-700">{index + 1}</span>
                      </div>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>Track the progress of this application</CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicantTimeline applicantId={applicantId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to calculate total years of experience
function calculateTotalExperience(experience: ExtractedCVData["experience"]): number {
  let totalYears = 0

  experience.forEach((exp) => {
    const duration = exp.duration
    // Extract years from strings like "2019 - 2023" or "2019 - Present"
    const years = duration.match(/\d{4}/g)

    if (years && years.length >= 2) {
      totalYears += Number.parseInt(years[1]) - Number.parseInt(years[0])
    } else if (years && years.length === 1 && duration.toLowerCase().includes("present")) {
      // For current jobs, calculate based on current year
      const currentYear = new Date().getFullYear()
      totalYears += currentYear - Number.parseInt(years[0])
    } else {
      // If we can't parse the duration, estimate 1 year
      totalYears += 1
    }
  })

  return totalYears
}
