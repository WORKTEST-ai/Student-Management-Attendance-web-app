'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, ClipboardCheck, LayoutDashboard, School, Shield, Users, FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const adminNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { 
    href: "#", label: "Management", icon: Users,
    children: [
      { href: "/admin/users", label: "All Users", icon: Users },
      { href: "/admin/teachers", label: "Teachers", icon: Users },
      { href: "/admin/classes", label: "Classes", icon: School },
      { href: "/admin/subjects", label: "Subjects", icon: BookOpen },
    ]
  },
  { href: "/admin/reports", label: "Attendance Reports", icon: BarChart3 },
  { href: "/admin/student-reports", label: "Student Reports", icon: FileText },
  { href: "/admin/audit-log", label: "Audit Log", icon: Shield },
];

const teacherNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher/attendance", label: "Record Attendance", icon: ClipboardCheck },
  { href: "/teacher/students", label: "Manage Students", icon: Users },
  { href: "/teacher/reports", label: "Submit Report", icon: FileText },
];

const studentNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/overview", label: "My Attendance", icon: BarChart3 },
];

const navItems: Record<UserRole, NavItem[]> = {
  Admin: adminNav,
  Teacher: teacherNav,
  Student: studentNav,
};

export function MainNav({ role, className, ...props }: { role: UserRole } & React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const routes = navItems[role] || [];
  
  const cleanHref = (href: string) => {
    return href.split('?')[0];
  }

  return (
    <nav className={cn("flex flex-col gap-2", className)} {...props}>
      {routes.map((item) =>
        item.children ? (
          <Accordion type="single" collapsible key={item.label} defaultValue={item.children.some(child => pathname.startsWith(cleanHref(child.href))) ? `item-${item.label}` : ""}>
            <AccordionItem value={`item-${item.label}`} className="border-b-0">
              <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg:last-child]:rotate-90">
                <item.icon className="h-4 w-4" />
                {item.label}
              </AccordionTrigger>
              <AccordionContent className="pl-4 pt-0 pb-0">
                  <div className="ml-5 flex flex-col gap-1 border-l py-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={cleanHref(child.href)}
                      className={cn(
                        "ml-4 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname.startsWith(cleanHref(child.href)) && "bg-muted text-primary"
                      )}
                    >
                      <child.icon className="h-4 w-4" />
                      {child.label}
                    </Link>
                  ))}
                  </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.href}
            href={cleanHref(item.href)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === cleanHref(item.href) && "bg-muted text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}
