"use client";
import { Card, CardContent } from "@/components/ui/card"

import { Users, Briefcase, MessageSquare, CheckCircle } from "lucide-react"
export const AdminDashboardCard = () => {
    return (
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="">
            <div className="flex items-center gap-4">
              <div className="bg-violet-100  rounded-full">
                <Users className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Applicants
                </p>
                <h3 className="text-2xl font-bold">128</h3>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 h-10 w-10 flex items-center justify-center rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Jobs
                </p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-xs text-green-600">+3 new this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Hired This Month
                </p>
                <h3 className="text-2xl font-bold">15</h3>
                <p className="text-xs text-green-600">+25% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  New Messages
                </p>
                <h3 className="text-2xl font-bold">8</h3>
                <p className="text-xs text-red-600">3 unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
};