"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "New" | "Read" | "Replied";
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Project Inquiry",
      message:
        "I'm interested in working with you on a new project. Can we schedule a call to discuss the details?",
      date: "2024-01-15",
      status: "New",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Collaboration Opportunity",
      message:
        "I came across your portfolio and I'm impressed with your work. I have a potential collaboration opportunity that I'd like to discuss with you.",
      date: "2024-01-14",
      status: "Read",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      subject: "Question about your services",
      message:
        "Hi, I have a question about your development services. Do you offer ongoing maintenance and support for completed projects?",
      date: "2024-01-13",
      status: "Replied",
    },
  ]);

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const getStatusColor = (status: Message["status"]) => {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "Read":
        return "bg-yellow-500";
      case "Replied":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Contact Messages</h2>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.date}</TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{message.subject}</DialogTitle>
                            <DialogDescription>
                              From: {message.name} ({message.email})
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            <p className="text-sm text-gray-500">
                              Received on: {message.date}
                            </p>
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
