
'use client';

import { useEffect, useState, useActionState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStudentsAction, addStudentAction, deleteStudentAction } from '@/lib/actions';
import type { Student } from '@/lib/credentials';
import { Loader2, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { classes } from '@/lib/mock-data';

export default function TeacherStudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const [addState, addFormAction, isAddPending] = useActionState(addStudentAction, { success: false, error: undefined });
    const [isDeletePending, setIsDeletePending] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

    const fetchStudents = async () => {
        setLoading(true);
        const { students } = await getStudentsAction();
        setStudents(students);
        setLoading(false);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        if (addState.success) {
            toast({ title: "Success", description: "Student added successfully." });
            fetchStudents();
            formRef.current?.reset();
        } else if (addState.error) {
            toast({ variant: "destructive", title: "Error", description: addState.error });
        }
    }, [addState]);

    const handleDelete = async (studentId: string) => {
        setIsDeletePending(true);
        const result = await deleteStudentAction(studentId);
        setIsDeletePending(false);
        setStudentToDelete(null);

        if (result.success) {
            toast({ title: "Success", description: "Student deleted successfully." });
            fetchStudents();
        } else if (result.error) {
            toast({ variant: "destructive", title: "Error", description: result.error });
        }
    };

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Student</CardTitle>
                    <CardDescription>Enter the details for the new student.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} action={addFormAction} className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Student Name</Label>
                            <Input id="name" name="name" placeholder="e.g., John Smith" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <div className="grid gap-2">
                           <Label htmlFor="classId">Class</Label>
                            <Select name="classId" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2 self-end">
                            <Button type="submit" disabled={isAddPending}>
                                {isAddPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                                Add Student
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Manage Students</CardTitle>
                    <CardDescription>View and remove existing students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AlertDialog open={!!studentToDelete} onOpenChange={(open) => !open && setStudentToDelete(null)}>
                        {loading ? (
                            <div className="flex justify-center items-center h-24">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-mono">{student.id}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{classes.find(c => c.id === student.classId)?.name}</TableCell>
                                            <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu for {student.name}</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                             <DropdownMenuItem
                                                                onSelect={() => setStudentToDelete(student)}
                                                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                              >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                         {studentToDelete && (
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the account for <span className="font-semibold">{studentToDelete.name}</span>.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDelete(studentToDelete.id)}
                                        className="bg-destructive hover:bg-destructive/90"
                                        disabled={isDeletePending}
                                    >
                                        {isDeletePending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        )}
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    );
}
