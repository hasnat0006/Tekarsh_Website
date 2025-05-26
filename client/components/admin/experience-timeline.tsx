"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import type { ExtractedCVData } from "@/lib/ai-service"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ExperienceTimelineProps {
  experience: ExtractedCVData["experience"]
}

export default function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Sort experience by date (most recent first)
  const sortedExperience = [...experience].sort((a, b) => {
    // Extract years from strings like "2019 - 2023" or "2019 - Present"
    const aYears = a.duration.match(/\d{4}/g)
    const bYears = b.duration.match(/\d{4}/g)

    // If we can extract years, compare the start years in reverse order (most recent first)
    if (aYears && bYears) {
      return Number.parseInt(bYears[0]) - Number.parseInt(aYears[0])
    }
    return 0
  })

  return (
    <div className="space-y-6">
      {sortedExperience.map((job, index) => (
        <div key={index} className="relative">
          {index < sortedExperience.length - 1 && (
            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 z-0"></div>
          )}
          <div className="relative z-10">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-violet-600" />
                </div>
              </div>
              <div className="flex-grow">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-lg">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{job.duration}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm">{job.description}</p>
                    </div>

                    {(job.highlights.length > 0 || job.technologies.length > 0) && (
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto" onClick={() => toggleExpand(index)}>
                        {expandedItems[index] ? (
                          <ChevronUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-1" />
                        )}
                        <span>{expandedItems[index] ? "Show less" : "Show more"}</span>
                      </Button>
                    )}

                    {expandedItems[index] && (
                      <div className="mt-4 space-y-4">
                        {job.highlights.length > 0 && (
                          <div>
                            <Separator className="my-2" />
                            <h4 className="text-sm font-medium mb-2">Key Achievements</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {job.highlights.map((highlight, hIndex) => (
                                <li key={hIndex} className="text-sm">
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {job.technologies.length > 0 && (
                          <div>
                            <Separator className="my-2" />
                            <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.technologies.map((tech, tIndex) => (
                                <Badge key={tIndex} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
