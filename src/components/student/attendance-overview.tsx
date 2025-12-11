"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { AttendanceStatus } from "@/lib/types";
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const monthlyData = [
  { month: "Jan", present: 86, absent: 14 },
  { month: "Feb", present: 92, absent: 8 },
  { month: "Mar", present: 95, absent: 5 },
  { month: "Apr", present: 88, absent: 12 },
  { month: "May", present: 91, absent: 9 },
  { month: "Jun", present: 94, absent: 6 },
];

const recentActivity: { subject: string, date: string, status: AttendanceStatus }[] = [
    { subject: "Mathematics", date: "2024-05-24", status: "Present" },
    { subject: "Science", date: "2024-05-23", status: "Late" },
    { subject: "History", date: "2024-05-22", status: "Present" },
    { subject: "Mathematics", date: "2024-05-21", status: "Absent" },
    { subject: "Science", date: "2024-05-20", status: "Present" },
];

const statusVariant: Record<AttendanceStatus, "default" | "destructive" | "secondary"> = {
    Present: "default",
    Absent: "destructive",
    Late: "secondary",
};

export function AttendanceOverview() {
    const overallPercentage = 91;

    return (
        <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Attendance</CardTitle>
                        <CardDescription>This term</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold">{overallPercentage}%</span>
                            <div className="w-2/3">
                                <Progress value={overallPercentage} aria-label={`${overallPercentage}% attendance`} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Presents</CardTitle>
                        <CardDescription>Days you were present</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">182</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Absents</CardTitle>
                        <CardDescription>Days you were absent</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-destructive">15</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Lates</CardTitle>
                        <CardDescription>Days you arrived late</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">3</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Monthly Breakdown</CardTitle>
                        <CardDescription>Your attendance percentage per month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[300px] w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted))' }}
                                        content={<ChartTooltipContent />}
                                    />
                                    <Bar dataKey="present" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Present" />
                                    <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Absent" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your last 5 attendance records.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentActivity.map((activity, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{activity.subject}</TableCell>
                                        <TableCell>{activity.date}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={statusVariant[activity.status]}>{activity.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
