"use client"

import { useState, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  CheckCircle,
  Archive,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import MessageViewModal from "@/components/admin/message-view-modal"

const messagesData = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 987-6543",
    subject: "Partnership Opportunity",
    message: `Hello,

I'm reaching out from XYZ Corp to discuss a potential partnership opportunity with Tekarsh. We're impressed with your work in the software development space and believe there could be synergies between our companies.

Our company specializes in enterprise solutions and we're looking for a reliable technology partner to help us expand our digital offerings. We've reviewed your portfolio and are particularly interested in your expertise in:

- Custom software development
- Cloud solutions
- Mobile application development

I'd love to schedule a call to discuss this further. Please let me know your availability for the next week. We're flexible with timing and can accommodate your schedule.

Looking forward to hearing from you!

Best regards,
John Smith
Business Development Manager
XYZ Corp`,
    status: "unread" as const,
    createdAt: "2023-06-10T09:15:00Z",
    priority: "high" as const,
    category: "business",
  },
  {
    id: "2",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 234-5678",
    subject: "Job Application Question",
    message: `Hi there,

I'm interested in the Senior Frontend Developer position that was posted on your careers page, but I had a question about the remote work options.

The job posting mentions "Remote Option" but I wanted to clarify:
- Is this position fully remote, hybrid, or office-based with occasional remote work?
- Are there any geographical restrictions for remote candidates?
- What are the expectations for collaboration across time zones?

I have 7 years of experience in frontend development with React, TypeScript, and Next.js. I'm currently based in Austin, TX, and would prefer a fully remote position if possible.

I'd be happy to discuss my qualifications further and provide additional information about my experience.

Thank you for your time!

Best,
Emma Johnson`,
    status: "read" as const,
    createdAt: "2023-06-08T14:30:00Z",
    priority: "normal" as const,
    category: "careers",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    subject: "Service Inquiry - Healthcare Startup",
    message: `Dear Tekarsh Team,

I'd like to learn more about your custom software development services for our healthcare startup, MedTech Solutions.

We're developing a patient management system and need expertise in:
- HIPAA-compliant application development
- Integration with existing healthcare systems
- Mobile app development for both iOS and Android
- Cloud infrastructure setup and security

Our timeline is approximately 6-8 months for the initial MVP, with plans for ongoing development and maintenance.

Could we schedule a consultation to discuss our requirements in detail? I'm available for a call this week or next.

Please let me know what information you'd need from us to provide an initial assessment and quote.

Thank you,
Michael Brown
CTO, MedTech Solutions`,
    status: "unread" as const,
    createdAt: "2023-06-07T11:45:00Z",
    priority: "high" as const,
    category: "services",
  },
  {
    id: "4",
    name: "Sophia Garcia",
    email: "sophia.garcia@example.com",
    subject: "Speaking Engagement Request",
    message: `Hello,

We're organizing TechConf 2023, a technology conference scheduled for September 15-17 in San Francisco, and would love to have someone from Tekarsh speak about modern software development practices.

The conference focuses on:
- Emerging technologies in software development
- Best practices for remote development teams
- Innovation in the tech industry

We're particularly interested in having a speaker discuss "Building Scalable Applications with Modern JavaScript Frameworks" or "The Future of Remote Development Teams."

The speaking slot would be 45 minutes (35 minutes presentation + 10 minutes Q&A) on September 16th. We cover travel expenses and provide an honorarium for speakers.

Would this be something Tekarsh would be interested in? If so, could you recommend someone from your team who might be a good fit?

Looking forward to your response!

Best regards,
Sophia Garcia
Event Coordinator, TechConf 2023`,
    status: "read" as const,
    createdAt: "2023-06-05T16:20:00Z",
    priority: "normal" as const,
    category: "events",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 456-7890",
    subject: "Project Estimate Request",
    message: `Hi,

We're looking to develop a mobile app for our retail business and would like to get an estimate for the project.

Project details:
- E-commerce mobile app for iOS and Android
- Integration with our existing Shopify store
- Features: product catalog, shopping cart, payment processing, user accounts
- Push notifications for promotions and order updates
- Admin panel for inventory management

We're hoping to launch by Q4 2023. Could you provide a rough estimate for timeline and cost?

Also, do you offer ongoing maintenance and support services?

Thanks!
David Wilson
Retail Plus Solutions`,
    status: "archived" as const,
    createdAt: "2023-06-03T10:10:00Z",
    priority: "normal" as const,
    category: "services",
  },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    subject: "Thank You - Excellent Presentation",
    message: `Dear Tekarsh Team,

I wanted to thank your team for the excellent presentation yesterday during our stakeholder meeting. We're very impressed with your approach to our project and the detailed technical proposal you provided.

The way you addressed our concerns about scalability and security was particularly reassuring. Your team's expertise in cloud architecture and modern development practices aligns perfectly with our needs.

We'll be making our final decision by the end of this week and will be in touch soon.

Thank you again for your time and effort in preparing such a comprehensive proposal.

Best regards,
Olivia Martinez
Project Manager, Innovation Labs`,
    status: "read" as const,
    createdAt: "2023-06-01T15:30:00Z",
    priority: "low" as const,
    category: "feedback",
  },
]

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "unread" | "read" | "archived"
  createdAt: string
  category?: string
}

export default function MessagesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(messagesData)

  const itemsPerPage = 7

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || message.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginate results
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage)
  const paginatedMessages = filteredMessages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMessage(null)
  }

  const handleStatusUpdate = useCallback((messageId: string, newStatus: Message["status"]) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === messageId ? { ...msg, status: newStatus } : msg)),
    )
  }, [])

  const handleReply = useCallback(async (messageId: string, replyContent: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would send the reply via API
    console.log(`Sending reply to message ${messageId}:`, replyContent)

    // Update message status to read if it was unread
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === messageId ? { ...msg, status: "read" } : msg)))
  }, [])

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "unread":
        return <Clock className="h-4 w-4" />
      case "read":
        return <CheckCircle className="h-4 w-4" />
      case "archived":
        return <Archive className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: Message["status"]) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "read":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "archived":
        return "bg-red-100 text-red-700 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getPriorityIcon = (priority?: string) => {
    if (priority === "high") {
      return <AlertCircle className="h-3 w-3 text-red-500" />
    }
    return null
  }

  return (
    <div className="space-y-4 m-4 flex flex-col items-center">
      <Card className="md:w-4/5">
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search messages by name, email, subject, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </CardContent>
      </Card>

      <div className="rounded-md border border-[var(--word)]/10 w-full">
        <Table className="p-4">
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMessages.length > 0 ? (
              paginatedMessages.map((message) => (
                <TableRow
                  key={message.id}
                  className={`cursor-pointer transition-colors ${
                    message.status === "unread" ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleViewMessage(message)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className={message.status === "unread" ? "font-semibold" : ""}>{message.name}</div>
                        <div className="text-sm text-muted-foreground">{message.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md">
                      <div className={`font-medium truncate ${message.status === "unread" ? "font-semibold" : ""}`}>
                        {message.subject}
                      </div>
                      <div className="text-sm text-muted-foreground truncate mt-1">
                        {message.message.substring(0, 100)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(message.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(message.status)}>
                      {getStatusIcon(message.status)}
                      <span className="ml-1 capitalize">{message.status}</span>
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="text-right">
                    <div>
                      <Badge
                        variant="default"
                        className={`text-xs`}
                      >
                        View
                      </Badge>

                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewMessage(message)
                          }}
                        >
                          View Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {message.status === "unread" && (
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStatusUpdate(message.id, "read")
                            }}
                          >
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                        {message.status === "read" && (
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStatusUpdate(message.id, "unread")
                            }}
                          >
                            Mark as Unread
                          </DropdownMenuItem>
                        )}
                        {message.status !== "archived" && (
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStatusUpdate(message.id, "archived")
                            }}
                          >
                            Archive Message
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8 mb-2" />
                    <p>No messages found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredMessages.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredMessages.length)} of {filteredMessages.length} messages
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Message View Modal */}
      <MessageViewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={selectedMessage}
        onStatusUpdate={handleStatusUpdate}
        onReply={handleReply}
      />
    </div>
  )
}
