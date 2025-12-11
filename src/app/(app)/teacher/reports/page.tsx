'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useActionState, useRef } from "react";
import type { Student } from "@/lib/credentials";
import { getStudentsAction, submitReportAction } from "@/lib/actions";
import { useUser } from "@/hooks/use-user";

export default function TeacherReportsPage() {
    const { toast } = useToast();
    const { user } = useUser();
    const [students, setStudents] = useState<Student[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    
    const submitReportActionWithUser = submitReportAction.bind(null, user!);
    const [state, formAction, isPending] = useActionState(submitReportActionWithUser, { success: false, error: undefined });


    useEffect(() => {
        const fetchStudents = async () => {
            const { students } = await getStudentsAction();
            setStudents(students);
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        if (state.success) {
            toast({
                title: "Report Submitted",
                description: "Your report has been sent to the administration.",
            });
            formRef.current?.reset();
        } else if (state.error) {
            toast({
                variant: "destructive",
                title: "Error Submitting Report",
                description: state.error,
            });
        }
    }, [state, toast]);

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submit a Student Report</CardTitle>
                <CardDescription>
                    Use this form to report an incident or provide feedback about a student.
                </CardDescription>
            </CardHeader>
            <form ref={formRef} action={formAction}>
                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="student">Select Student</Label>
                        <Select name="studentId" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a student" />
                            </SelectTrigger>
                            <SelectContent>
                                {students.map(student => (
                                    <SelectItem key={student.id} value={student.id}>
                                        {student.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="details">Report Details</Label>
                        <Textarea
                            id="details"
                            name="details"
                            placeholder="Describe the incident or feedback in detail..."
                            className="min-h-[150px]"
                            required
                        />
                    </div>
                </CardContent>
                <CardContent className="flex justify-end">
                     <Button type="submit" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Submit Report
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}
