"use client"

import { useState, useCallback, useEffect } from "react"
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
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import MessageViewModal from "@/components/admin/message-view-modal"

import toast, { Toaster } from "react-hot-toast"

import { Message } from "@/types/interface"
const url = process.env.NEXT_PUBLIC_BACKEND_URL;


export default function MessagesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${url}/messages`)
        if (!response.ok) {
          toast.error("Failed to fetch messages!")
          return;
        }
        const data = await response.json();
        console.log("Fetched messages:", data)
        setMessages(data)
      } catch (error) {
        toast.error("Error fetching messages!")
        return;
      }
    }
    fetchMessages();
  }, [])


  console.log("Messages:", messages)

  const itemsPerPage = 7

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.description.toLowerCase().includes(searchTerm.toLowerCase())

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

  const handleStatusUpdate = useCallback(async (messageId: string, newStatus: Message["status"]) => {

    const response = await fetch(
      `${url}/message/change_status?messageId=${messageId}&status=${newStatus}`
    );
    if (!response.ok) {
      toast.error("Failed to update message status!")
      return;
    }
    const data = await response.json();
    if(!data.ok) {
      toast.error("Failed to update message status!")
      return;
    }
    toast.success(`Message status updated to ${newStatus}`)

    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === messageId ? { ...msg, status: newStatus } : msg)),
    )
  }, [])

  const handleReply = useCallback(async (messageId: string, replyContent: string) => {
    // Simulate API call
    const response = await fetch(`${url}/message/reply?messageId=${messageId}&reply=${replyContent}`);
    if (!response.ok) {
      toast.error("Failed to send reply!")
      return;
    }
    const data = await response.json();
    if (!data.ok) {
      toast.error("Failed to send reply!")
      return;
    }
    toast.success("Reply sent successfully!")

    // Update message status to read if it was unread
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === messageId ? { ...msg, status: "seen" } : msg)))
  }, [])

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "unseen":
        return <Clock className="h-4 w-4" />
      case "seen":
        return <CheckCircle className="h-4 w-4" />
      case "archived":
        return <Archive className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: Message["status"]) => {
    switch (status) {
      case "unseen":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "seen":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "archived":
        return "bg-red-100 text-red-700 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-4 m-4 flex flex-col items-center">
      <Toaster position="top-right" reverseOrder={false} />
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
                  <SelectItem value="unseen">Unseen</SelectItem>
                  <SelectItem value="seen">Seen</SelectItem>
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
                    message.status === "unseen" ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleViewMessage(message)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className={message.status === "unseen" ? "font-semibold" : ""}>{message.name}</div>
                        <div className="text-sm text-muted-foreground">{message.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md">
                      <div className={`font-medium truncate ${message.status === "unseen" ? "font-semibold" : ""}`}>
                        {message.subject}
                      </div>
                      <div className="text-sm text-muted-foreground truncate mt-1">
                        {message.description.substring(0, 100)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(message.created_at).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(message.status)}>
                      {getStatusIcon(message.status)}
                      <span className="ml-1 capitalize">{message.status}</span>
                    </Badge>
                  </TableCell>
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
