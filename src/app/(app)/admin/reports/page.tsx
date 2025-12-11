import { ReportGenerator } from "@/components/admin/report-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function AdminReportsPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Export Reports</CardTitle>
                    <CardDescription>Download attendance reports in various formats.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    <div className="grid gap-2">
                        <Label>Report Type</Label>
                        <Select defaultValue="class-summary">
                            <SelectTrigger>
                                <SelectValue placeholder="Select report type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="class-summary">Class Summary</SelectItem>
                                <SelectItem value="student-detail">Student Detail</SelectItem>
                                <SelectItem value="full-export">Full Data Export</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label>Date Range</Label>
                        <Select defaultValue="last-30">
                            <SelectTrigger>
                                <SelectValue placeholder="Select date range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="last-7">Last 7 Days</SelectItem>
                                <SelectItem value="last-30">Last 30 Days</SelectItem>
                                <SelectItem value="this-term">This Term</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 self-end">
                         <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Download Report (CSV)
                        </Button>
                    </div>
                </CardContent>
            </Card>
            
            <ReportGenerator />
        </div>
    );
}
