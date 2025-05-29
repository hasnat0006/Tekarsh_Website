"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import toast, { Toaster } from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  ArrowUpRight,
  Archive,
  Flag,
  Reply,
  Send,
  X,
  Clock,
  CheckCircle,
  User,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Message } from "@/types/interface";

interface MessageViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
  onStatusUpdate: (messageId: string, newStatus: Message["status"]) => void;
  onReply: (messageId: string, replyContent: string) => Promise<void>;
}

export default function MessageViewModal({
  isOpen,
  onClose,
  message,
  onStatusUpdate,
  onReply,
}: MessageViewModalProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [replyError, setReplyError] = useState("");

  React.useEffect(() => {
    if (isOpen && message) {
      setShowReplyBox(false);
      setReplyContent("");
      setReplyError("");
    }
  }, [isOpen, message]); // Only depend on isOpen and message ID, not the full message object

  // Add a separate useEffect to handle marking as read only once when modal opens
  React.useEffect(() => {
    if (isOpen && message && message.status === "unseen") {
      // Use a timeout to avoid the infinite loop by deferring the state update
      const timeoutId = setTimeout(() => {
        onStatusUpdate(message.id, "seen");
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, message, onStatusUpdate]); // Only run when these specific values change

  const handleInstantReply = () => {
    setShowReplyBox(true);
    setReplyError("");
    setTimeout(() => {
      const textarea = document.getElementById("reply-textarea");
      if (textarea) {
        textarea.focus();
      }
    }, 100);
  };

  const handleCancelReply = () => {
    setShowReplyBox(false);
    setReplyContent("");
    setReplyError("");
  };

  const handleSendReply = async () => {
    if (!message) return;
    if (!replyContent.trim()) {
      setReplyError("Please enter a reply message");
      return;
    }

    if (replyContent.trim().length < 10) {
      setReplyError("Reply message must be at least 10 characters long");
      return;
    }

    setIsSending(true);
    setReplyError("");

    try {
      await onReply(message.id, replyContent.trim());

      toast.success("Reply sent successfully!");

      // Close reply box and modal
      setShowReplyBox(false);
      setReplyContent("");
      onClose();
    } catch (error) {
      setReplyError(`Failed to send reply. Please try again. Error: ${error}`);
      toast.error("Failed to send reply. Please try again.");
    
    } finally {
      setIsSending(false);
    }
  };

  const handleMarkAsArchived = () => {
    if (!message) return;
    onStatusUpdate(message.id, "archived");
    toast.success("Message archived successfully!");
    setShowReplyBox(false);
    setReplyContent("");
    setReplyError("");
    onClose();
  };

  const handleMarkAsUnread = () => {
    if (!message) return;
    onStatusUpdate(message.id, "unseen");
    toast.success("Message marked as unread successfully!");
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "unseen":
        return <Clock className="h-4 w-4" />;
      case "seen":
        return <CheckCircle className="h-4 w-4" />;
      case "archived":
        return <Archive className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Message["status"]) => {
    switch (status) {
      case "unseen":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "seen":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "archived":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (!message) return null;

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <Toaster position="top-right" reverseOrder={false} />
      <ModalContent className="max-w-4xl max-h-[90vh] font-poppins">
        <ModalHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <ModalTitle className="text-xl text-start">
                  {message.subject}
                </ModalTitle>
                <Badge className={getStatusColor(message.status)}>
                  {getStatusIcon(message.status)}
                  <span className="ml-1 capitalize">{message.status}</span>
                </Badge>
              </div>
              <ModalDescription className="mt-1 text-start">
                Message from {message.name} •{" "}
                {new Date(message.created_at).toLocaleDateString()} at{" "}
                {new Date(message.created_at).toLocaleTimeString()}
              </ModalDescription>
            </div>
          </div>
        </ModalHeader>

        <div className="space-y-6">
          {/* Sender Information */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" alt={message.name} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{message.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <a
                          href={`mailto:${message.email}`}
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {message.email}
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      {message.phone && (
                        <div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <a
                              href={`tel:${message.phone}`}
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              {message.phone}
                              <ArrowUpRight className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Content */}
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.description}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reply Section */}
          {showReplyBox && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Reply className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">
                      Reply to {message.name}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      id="reply-textarea"
                      value={replyContent}
                      onChange={(e) => {
                        setReplyContent(e.target.value);
                        if (replyError) setReplyError("");
                      }}
                      placeholder={`Type your reply to ${message.name}...`}
                      className="min-h-[120px] bg-white"
                      disabled={isSending}
                      aria-describedby={replyError ? "reply-error" : undefined}
                    />
                    {replyError && (
                      <Alert variant="destructive">
                        <AlertDescription id="reply-error">
                          {replyError}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {replyContent.length}/1000 characters
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        className="bg-red-50 text-red-600 hover:bg-red-100"
                        size="sm"
                        onClick={handleCancelReply}
                        disabled={isSending}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleSendReply}
                        disabled={isSending || !replyContent.trim()}
                        className="min-w-[80px] bg-[var(--green)]/10 text-[var(--green)] hover:bg-[var(--green)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-1" />
                            Send
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator />

        <ModalFooter>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {message.status !== "archived" && (
                <Button
                  // variant="outline"
                  size="sm"
                  onClick={handleMarkAsArchived}
                  className="text-red-600 bg-red-50 hover:bg-red-100"
                >
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
              )}
              {message.status === "seen" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAsUnread}
                >
                  <Flag className="h-4 w-4 mr-1" />
                  Mark Unseen
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100"
                 onClick={onClose}>
                Close
              </Button>
              {!showReplyBox && (
                <Button 
                  className="bg-[var(--green)]/10 text-[var(--green)] hover:bg-[var(--green)]/20"
                onClick={handleInstantReply}>
                  <Reply className="h-4 w-4 mr-1" />
                  Instant Reply
                </Button>
              )}
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
