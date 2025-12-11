"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, Save, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { classes, subjects, users as allUsers } from "@/lib/mock-data";
import type { AttendanceStatus, User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";


type StudentAttendance = {
    studentId: string;
    name: string;
    status: AttendanceStatus;
};

export function AttendanceSheet() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [selectedClassId, setSelectedClassId] = React.useState<string>(classes[0].id);
    const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>(subjects[0].id);
    const [students, setStudents] = React.useState<User[]>([]);
    const [attendance, setAttendance] = React.useState<StudentAttendance[]>([]);
    const { toast } = useToast();

    // Effect to update students and attendance when class changes
    React.useEffect(() => {
        const currentClass = classes.find(c => c.id === selectedClassId);
        if (currentClass) {
            const classStudents = allUsers.filter(u => u.role === 'Student' && currentClass.studentIds.includes(u.id));
            setStudents(classStudents);
            // Reset attendance for the new set of students
            setAttendance(
                classStudents.map(s => ({ studentId: s.id, name: s.name, status: "Present" }))
            );
        }
    }, [selectedClassId]);

    // Effect to update available subjects when class changes
    const availableSubjects = subjects.filter(s => s.classId === selectedClassId);
    React.useEffect(() => {
        if (availableSubjects.length > 0) {
            setSelectedSubjectId(availableSubjects[0].id);
        }
    }, [selectedClassId]);


    const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
        setAttendance(prev =>
            prev.map(s => (s.studentId === studentId ? { ...s, status } : s))
        );
    };

    const markAllPresent = () => {
        setAttendance(prev => prev.map(s => ({ ...s, status: "Present" })));
        toast({
            title: "All Present",
            description: "All students have been marked as Present.",
        });
    };
    
    const handleSaveDraft = () => {
        console.log("Saving Draft:", { date, selectedClassId, selectedSubjectId, attendance });
        toast({
            title: "Draft Saved!",
            description: "Your attendance records have been saved as a draft.",
        });
    };

    const handleSubmit = () => {
        console.log("Submitting Attendance:", { date, selectedClassId, selectedSubjectId, attendance });
        toast({
            title: "Attendance Submitted!",
            description: "The attendance records have been finalized and submitted.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Record Attendance</CardTitle>
                <CardDescription>
                    Select the class, subject, and date to record attendance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <div className="grid gap-2">
                        <Label htmlFor="class">Class</Label>
                        <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                                {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(d) => d > new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="flex justify-end mb-4">
                    <Button onClick={markAllPresent} variant="secondary">
                        <Check className="mr-2 h-4 w-4" />
                        Mark All Present
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Name</TableHead>
                                <TableHead className="text-center w-[400px]">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendance.length > 0 ? attendance.map((student) => (
                                <TableRow key={student.studentId}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            value={student.status}
                                            onValueChange={(value) => handleStatusChange(student.studentId, value as AttendanceStatus)}
                                            className="flex justify-around"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Present" id={`${student.studentId}-present`} />
                                                <Label htmlFor={`${student.studentId}-present`}>Present</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Absent" id={`${student.studentId}-absent`} />
                                                <Label htmlFor={`${student.studentId}-absent`}>Absent</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Late" id={`${student.studentId}-late`} />
                                                <Label htmlFor={`${student.studentId}-late`}>Late</Label>
                                            </div>
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center h-24">
                                        No students in this class.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline" onClick={handleSaveDraft}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                </Button>
                <Button onClick={handleSubmit}>
                    <Send className="mr-2 h-4 w-4" />
                    Finalize & Submit
                </Button>
            </CardFooter>
        </Card>
    );
}
