"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ScheduledJob {
  id: string
  technicianName: string
  customerName: string
  address: string
  time: string
  status: "scheduled" | "in-progress" | "completed"
}

interface DaySchedule {
  [key: string]: ScheduledJob[]
}

export function ScheduleCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  // Mock data - In a real app, this would come from an API
  const mockSchedule: DaySchedule = {
    "2024-02-15": [
      {
        id: "JOB-001",
        technicianName: "John Doe",
        customerName: "Alice Smith",
        address: "123 Main St",
        time: "09:00 AM",
        status: "scheduled",
      },
      {
        id: "JOB-002",
        technicianName: "Jane Smith",
        customerName: "Bob Johnson",
        address: "456 Oak Ave",
        time: "02:00 PM",
        status: "in-progress",
      },
    ],
  }

  const getStatusColor = (status: ScheduledJob["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500"
      case "in-progress":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const getScheduleForDate = (date: Date): ScheduledJob[] => {
    return mockSchedule[formatDate(date)] || []
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Calendar</CardTitle>
          <CardDescription>Select a date to view scheduled jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Scheduled Jobs - {date?.toLocaleDateString()}
          </CardTitle>
          <CardDescription>
            View and manage jobs scheduled for the selected date
          </CardDescription>
        </CardHeader>
        <CardContent>
          {date && getScheduleForDate(date).length > 0 ? (
            <div className="space-y-4">
              {getScheduleForDate(date).map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{job.customerName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.address}
                        </p>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{job.technicianName}</span>
                      <span>{job.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No jobs scheduled for this date
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
