import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from "lucide-react";

export default function AdminClassesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Class Management</CardTitle>
                <CardDescription>Manage all classes, sections, and student enrollments.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <School className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground">Coming Soon</h3>
                <p className="text-muted-foreground">This section is under construction.</p>
            </CardContent>
        </Card>
    );
}
