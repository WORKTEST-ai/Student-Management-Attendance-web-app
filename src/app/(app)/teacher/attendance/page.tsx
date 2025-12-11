import { AttendanceSheet } from "@/components/teacher/attendance-sheet";
import { AppHeader } from "@/components/app-header";
import { users } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";

export default function TeacherAttendancePage() {
    const teacher = users.find(u => u.role === 'Teacher')!;
    return (
        <>
            {/* The header is now in the layout, so we don't need it here.
                If we needed to customize the title, we'd use a different pattern. */}
            <AttendanceSheet />
        </>
    );
}
