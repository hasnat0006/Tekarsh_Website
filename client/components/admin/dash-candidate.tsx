
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card"
import RecentApplicants from "@/components/admin/recent-applicants"

const applicationStatus = [
  { name: "Review", value: 35 },
  { name: "Interview", value: 25 },
  { name: "Hired", value: 15 },
  { name: "Rejected", value: 25 },
];

const STATUS_COLORS = ["#ffc658", "#8884d8", "#82ca9d", "#ff8042"];
  
export const CandidateInfo = () => {
    return (
      <Tabs defaultValue="applicants" className="space-y-4 col-span-7">
        <TabsList className="w-full  flex justify-center items-center">
          <TabsTrigger value="applicants">Recent Applicants</TabsTrigger>
          <TabsTrigger value="status">Application Status</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants" className="space-y-4">
          <RecentApplicants />
        </TabsContent>
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardDescription>
                Current status of all applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {applicationStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </TabsContent>
      </Tabs>
    );
}