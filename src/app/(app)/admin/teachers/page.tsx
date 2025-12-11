
'use client';

import { useEffect, useState, useActionState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTeachersAction, addTeacherAction, deleteTeacherAction } from '@/lib/actions';
import type { Teacher } from '@/lib/credentials';
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

export default function AdminTeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const [addState, addFormAction, isAddPending] = useActionState(addTeacherAction, { success: false, error: undefined });
    const [isDeletePending, setIsDeletePending] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

    const fetchTeachers = async () => {
        setLoading(true);
        const { teachers } = await getTeachersAction();
        setTeachers(teachers);
        setLoading(false);
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    useEffect(() => {
        if (addState.success) {
            toast({ title: "Success", description: "Teacher added successfully." });
            fetchTeachers();
            formRef.current?.reset();
        } else if (addState.error) {
            toast({ variant: "destructive", title: "Error", description: addState.error });
        }
    }, [addState]);

    const handleDelete = async (teacherId: string) => {
        setIsDeletePending(true);
        const result = await deleteTeacherAction(teacherId);
        setIsDeletePending(false);
        setTeacherToDelete(null); // Close the dialog

        if (result.success) {
            toast({ title: "Success", description: "Teacher deleted successfully." });
            fetchTeachers();
        } else if (result.error) {
            toast({ variant: "destructive", title: "Error", description: result.error });
        }
    };

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Teacher</CardTitle>
                    <CardDescription>Enter the details for the new teacher.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} action={addFormAction} className="grid gap-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Teacher Name</Label>
                            <Input id="name" name="name" placeholder="e.g., Jane Doe" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <div className="grid gap-2 self-end">
                            <Button type="submit" disabled={isAddPending}>
                                {isAddPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                                Add Teacher
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Manage Teachers</CardTitle>
                    <CardDescription>View and remove existing teachers.</CardDescription>
                </CardHeader>
                <CardContent>
                     <AlertDialog open={!!teacherToDelete} onOpenChange={(open) => !open && setTeacherToDelete(null)}>
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
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teachers.map((teacher) => (
                                        <TableRow key={teacher.id}>
                                            <TableCell className="font-mono">{teacher.id}</TableCell>
                                            <TableCell>{teacher.name}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu for {teacher.name}</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem
                                                            onSelect={() => setTeacherToDelete(teacher)}
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
                        {teacherToDelete && (
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the account for <span className="font-semibold">{teacherToDelete.name}</span>.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDelete(teacherToDelete.id)}
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
