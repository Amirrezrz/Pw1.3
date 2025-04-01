import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, BookOpen, MessageSquare, Building, Clock, AlertCircle } from "lucide-react"

export default function AdminDashboardPage() {
  // Mock data for dashboard stats
  const stats = {
    totalNews: 15,
    totalRules: 8,
    totalJobs: 24,
    totalHousing: 18,
    totalUsers: 120,
    pendingAds: 7,
  }

  // Mock data for recent activity
  const recentActivity = [
    { id: 1, type: "news", action: "ایجاد", title: "تغییرات جدید در قوانین اقامت", time: "۱۰ دقیقه پیش" },
    { id: 2, type: "job", action: "تایید", title: "آگهی استخدام مترجم فارسی", time: "۲ ساعت پیش" },
    { id: 3, type: "housing", action: "رد", title: "اجاره آپارتمان در میلان", time: "۵ ساعت پیش" },
    { id: 4, type: "user", action: "ثبت نام", title: "کاربر جدید: علی محمدی", time: "۱ روز پیش" },
  ]

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">داشبورد مدیریت</h1>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">تعداد اخبار</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">آگهی‌های شغلی</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">آگهی‌های مسکن</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHousing}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Pending Ads */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="ml-2 h-5 w-5 text-amber-500" />
              آگهی‌های در انتظار تایید
            </CardTitle>
            <CardDescription>آگهی‌هایی که نیاز به بررسی و تایید دارند</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.pendingAds > 0 ? (
              <div className="rounded-lg bg-amber-50 p-4 text-amber-800">
                <p className="font-medium">{stats.pendingAds} آگهی در انتظار تایید</p>
                <p className="mt-1 text-sm">لطفا آگهی‌های جدید را بررسی و تایید کنید.</p>
              </div>
            ) : (
              <p className="text-muted-foreground">در حال حاضر همه آگهی‌ها بررسی شده‌اند.</p>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/jobs?status=pending">آگهی‌های شغلی</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/housing?status=pending">آگهی‌های مسکن</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="ml-2 h-5 w-5" />
              فعالیت‌های اخیر
            </CardTitle>
            <CardDescription>آخرین فعالیت‌های انجام شده در سایت</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.action} • {activity.time}
                    </p>
                  </div>
                  <div>
                    {activity.type === "news" && <FileText className="h-4 w-4 text-blue-500" />}
                    {activity.type === "job" && <MessageSquare className="h-4 w-4 text-green-500" />}
                    {activity.type === "housing" && <Building className="h-4 w-4 text-amber-500" />}
                    {activity.type === "user" && <Users className="h-4 w-4 text-purple-500" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <h2 className="mb-4 mt-8 text-xl font-bold">دسترسی سریع</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <Button asChild className="h-auto flex-col gap-2 p-4">
          <Link href="/admin/news/add">
            <FileText className="h-6 w-6" />
            <span>افزودن خبر جدید</span>
          </Link>
        </Button>
        <Button asChild className="h-auto flex-col gap-2 p-4">
          <Link href="/admin/rules/add">
            <BookOpen className="h-6 w-6" />
            <span>افزودن قانون جدید</span>
          </Link>
        </Button>
        <Button asChild className="h-auto flex-col gap-2 p-4">
          <Link href="/admin/jobs">
            <MessageSquare className="h-6 w-6" />
            <span>مدیریت آگهی‌های شغلی</span>
          </Link>
        </Button>
        <Button asChild className="h-auto flex-col gap-2 p-4">
          <Link href="/admin/housing">
            <Building className="h-6 w-6" />
            <span>مدیریت آگهی‌های مسکن</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

