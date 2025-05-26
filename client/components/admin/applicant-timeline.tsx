// "use client"
// import { Badge } from "@/components/ui/badge"
// import { CalendarClock, CheckCircle, Clock, FileText, MessageSquare, User } from "lucide-react"

// // Mock timeline data
// const timelineData = [
//   {
//     id: "1",
//     type: "application",
//     title: "Application Submitted",
//     description: "Candidate submitted application with resume and cover letter",
//     date: "2023-05-15T10:30:00Z",
//     icon: FileText,
//   },
//   {
//     id: "2",
//     type: "ai-review",
//     title: "AI Resume Analysis",
//     description: "AI analyzed resume and found 88% match with job requirements",
//     date: "2023-05-15T10:35:00Z",
//     icon: CheckCircle,
//   },
//   {
//     id: "3",
//     type: "status-change",
//     title: "Status Changed to Review",
//     description: "Application moved to review stage by HR Manager",
//     date: "2023-05-16T09:15:00Z",
//     icon: Clock,
//   },
//   {
//     id: "4",
//     type: "note",
//     title: "Recruiter Note",
//     description: "Strong frontend skills, good project history. Schedule technical interview.",
//     date: "2023-05-17T14:20:00Z",
//     icon: MessageSquare,
//   },
//   {
//     id: "5",
//     type: "interview",
//     title: "Technical Interview Scheduled",
//     description: "Technical interview scheduled for May 22, 2023 at 10:00 AM",
//     date: "2023-05-18T11:30:00Z",
//     icon: CalendarClock,
//   },
//   {
//     id: "6",
//     type: "status-change",
//     title: "Status Changed to Interview",
//     description: "Application moved to interview stage",
//     date: "2023-05-18T11:35:00Z",
//     icon: User,
//   },
// ]

// interface ApplicantTimelineProps {
//   applicantId: string
// }

// export default function ApplicantTimeline({ applicantId }: ApplicantTimelineProps) {
//   // In a real app, we would fetch timeline data for the specific applicant
//   // For now, we'll just use the mock data

//   return (
//     <div className="space-y-4">
//       {timelineData.map((item, index) => (
//         <div key={item.id} className="flex gap-4">
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                 item.type === "application"
//                   ? "bg-blue-100 text-blue-600"
//                   : item.type === "ai-review"
//                     ? "bg-violet-100 text-violet-600"
//                     : item.type === "status-change"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : item.type === "note"
//                         ? "bg-gray-100 text-gray-600"
//                         : item.type === "interview"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-gray-100 text-gray-600"
//               }`}
//             >
//               <item.icon className="h-5 w-5" />
//             </div>
//             {index < timelineData.length - 1 && <div className="w-0.5 bg-gray-200 h-full mt-2"></div>}
//           </div>
//           <div className="flex-1 pb-6">
//             <div className="flex items-center justify-between">
//               <h4 className="font-medium">{item.title}</h4>
//               <Badge variant="outline" className="text-xs">
//                 {new Date(item.date).toLocaleString()}
//               </Badge>
//             </div>
//             <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
