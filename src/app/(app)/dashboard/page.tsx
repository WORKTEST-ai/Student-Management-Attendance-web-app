import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
  } from "lucide-react"

  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link"
  
  export default function Dashboard() {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">452</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Overall Attendance
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.3%</div>
                  <p className="text-xs text-muted-foreground">
                    +1.2% from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Classes</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    2 new classes added this term
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Issues to Address</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    Students with attendance below 75%
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Recent attendance records and system actions.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Emily White</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            Teacher
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Attendance Marked</Badge>
                        </TableCell>
                        <TableCell className="text-right">2024-05-24</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Admin User</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            Admin
                          </div>
                        </TableCell>
                        <TableCell>
                           <Badge>User Added</Badge>
                        </TableCell>
                        <TableCell className="text-right">2024-05-23</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Alex Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            Student
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Report Downloaded</Badge>
                        </TableCell>
                        <TableCell className="text-right">2024-05-22</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Students</CardTitle>
                  <CardDescription>
                    New students added this month.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="https://picsum.photos/seed/3/100/100" alt="Avatar" data-ai-hint="student portrait" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Alex Johnson
                      </p>
                      <p className="text-sm text-muted-foreground">
                        alex.johnson@sma.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">Grade 10</div>
                  </div>
                  <div className="flex items-center gap-4">
                     <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="https://picsum.photos/seed/4/100/100" alt="Avatar" data-ai-hint="person smiling" />
                      <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Michael Brown
                      </p>
                      <p className="text-sm text-muted-foreground">
                        michael.brown@sma.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">Grade 10</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="https://picsum.photos/seed/5/100/100" alt="Avatar" data-ai-hint="woman smiling" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Jessica Davis
                      </p>
                      <p className="text-sm text-muted-foreground">
                        jessica.davis@sma.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">Grade 10</div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </>
    )
  }
