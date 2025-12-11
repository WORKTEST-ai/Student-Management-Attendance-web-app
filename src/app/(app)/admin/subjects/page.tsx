import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function AdminSubjectsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Subject Management</CardTitle>
                <CardDescription>Manage all subjects taught in the institution.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground">Coming Soon</h3>
                <p className="text-muted-foreground">This section is under construction.</p>
            </CardContent>
        </Card>
    );
}
