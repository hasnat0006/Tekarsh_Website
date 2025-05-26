"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Histogram, OverViewGraph, PieChartComponent } from "../ui/graph"
import { AdminDashboardCard } from "./admin-card"
import { CandidateInfo } from "./dash-candidate";



export default function Overview() {
  return (
    <div className="space-y-6 p-4 grid gap-4 md:grid-cols-20">
      <div className="col-span-13 space-y-4">
        <div className="grid gap-4 md:gap-8">
          {/* Stats Cards */}
          <div className="">
            <AdminDashboardCard />
          </div>
          {/* Charts */}
          <div className="grid gap-4 ">
            <Tabs className=" " defaultValue="bar">
              <TabsList className="w-full  flex justify-center items-center">
                <TabsTrigger value="histogram" className=" text-center">
                  Applicants by Month
                </TabsTrigger>
                <TabsTrigger value="bar" className=" text-center">
                  Application by Day
                </TabsTrigger>
                <TabsTrigger value="pie" className=" text-center">
                  Applicants by Department
                </TabsTrigger>
              </TabsList>
              <TabsContent value="histogram">
                <Histogram />
              </TabsContent>
              <TabsContent value="pie">
                <PieChartComponent />
              </TabsContent>
              <TabsContent value="bar">
                <OverViewGraph />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <CandidateInfo />
    </div>
  );
}
