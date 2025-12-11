import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getReportsAction } from "@/lib/actions";
import { FileText } from "lucide-react";

export default async function AdminStudentReportsPage() {
    const { reports } = await getReportsAction();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Reports</CardTitle>
                <CardDescription>Reports submitted by teachers regarding students.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {reports.length > 0 ? (
                    reports.map(report => (
                        <div key={report.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">{report.studentName}</h4>
                                <span className="text-xs text-muted-foreground">{report.date}</span>
                            </div>
                            <p className="text-sm mb-2">{report.details}</p>
                            <p className="text-xs text-muted-foreground text-right">
                                Reported by: {report.teacherName}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-muted-foreground">No Reports Yet</h3>
                        <p className="text-muted-foreground">There are no student reports to display at this time.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
