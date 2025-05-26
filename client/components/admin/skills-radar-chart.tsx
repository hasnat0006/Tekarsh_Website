"use client"
import type { ExtractedCVData } from "@/lib/ai-service"
import { Card } from "@/components/ui/card"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"

interface SkillsRadarChartProps {
  skills: ExtractedCVData["skills"]
}

export default function SkillsRadarChart({ skills }: SkillsRadarChartProps) {
  // Group skills by category and calculate average level for each category
  const skillCategoryData = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = { count: 0, total: 0 }
      }
      acc[skill.category].count++
      acc[skill.category].total += skill.level
      return acc
    },
    {} as Record<string, { count: number; total: number }>,
  )

  // Convert to format needed for radar chart
  const radarData = Object.entries(skillCategoryData).map(([category, data]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    value: Math.round((data.total / data.count) * 10), // Average on a scale of 0-100
    fullMark: 100,
  }))

  // Get top skills for each category
  const topSkillsByCategory = Object.entries(
    skills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
      },
      {} as Record<string, typeof skills>,
    ),
  ).reduce(
    (acc, [category, categorySkills]) => {
      acc[category] = [...categorySkills].sort((a, b) => b.level - a.level).slice(0, 3)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Skill Level" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const category = payload[0].payload.category.toLowerCase()
              const topSkills = topSkillsByCategory[category] || []

              return (
                <Card className="p-2 bg-white shadow-md border">
                  <p className="font-medium">{payload[0].payload.category}</p>
                  <p className="text-sm text-muted-foreground">Average: {payload[0].value?.toString().slice(0, 5)}%</p>
                  {topSkills.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs font-medium">Top skills:</p>
                      <ul className="text-xs">
                        {topSkills.map((skill, i) => (
                          <li key={i}>
                            {skill.name} ({skill.level}/10)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              )
            }
            return null
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
