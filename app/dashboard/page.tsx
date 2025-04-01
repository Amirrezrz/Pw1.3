"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExchangeRates } from "@/components/exchange-rates"
import { Bell, Home, MessageSquare, PlusCircle, Settings, User } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "کاربر نمونه",
    email: "user@example.com",
    joinDate: "۱۴۰۳/۱۰/۱۵",
  }

  // Mock user activity
  const userAds = [
    { id: 1, type: "job", title: "دنبال کار پاره وقت", date: "۱۴۰۳/۱۲/۱۰", status: "فعال" },
    { id: 2, type: "housing", title: "آپارتمان برای اجاره", date: "۱۴۰۳/۱۱/۲۵", status: "منقضی شده" },
  ]

  return (
    <div className="container py-10">
      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        <div className="hidden md:block">
          <Card className="border-sage bg-cream-50">
            <CardHeader>
              <CardTitle className="text-teal-dark">پنل کاربری</CardTitle>
              <CardDescription>{user.name}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <Home className="ml-2 h-4 w-4" />
                  داشبورد
                </Button>
                <Button
                  variant={activeTab === "ads" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("ads")}
                >
                  <MessageSquare className="ml-2 h-4 w-4" />
                  آگهی‌های من
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="ml-2 h-4 w-4" />
                  اعلان‌ها
                </Button>
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="ml-2 h-4 w-4" />
                  پروفایل
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="ml-2 h-4 w-4" />
                  تنظیمات
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="md:hidden">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">داشبورد</TabsTrigger>
              <TabsTrigger value="ads">آگهی‌ها</TabsTrigger>
              <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
              <TabsTrigger value="profile">پروفایل</TabsTrigger>
              <TabsTrigger value="settings">تنظیمات</TabsTrigger>
            </TabsList>
          </Tabs>

          {activeTab === "overview" && (
            <div className="space-y-6">
              <Card className="border-sage bg-cream-50">
                <CardHeader>
                  <CardTitle className="text-teal-dark">خوش آمدید، {user.name}</CardTitle>
                  <CardDescription>تاریخ عضویت: {user.joinDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 text-lg font-medium text-teal-dark">آگهی‌های اخیر شما</h3>
                      {userAds.length > 0 ? (
                        <div className="space-y-3">
                          {userAds.map((ad) => (
                            <div
                              key={ad.id}
                              className="flex items-center justify-between rounded-lg border border-sage bg-cream p-3"
                            >
                              <div>
                                <div className="font-medium text-teal-dark">{ad.title}</div>
                                <div className="text-sm text-muted-foreground">{ad.date}</div>
                              </div>
                              <div
                                className={`rounded-full px-2 py-1 text-xs ${
                                  ad.status === "فعال" ? "bg-sage text-teal-dark" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {ad.status}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">شما هنوز آگهی ثبت نکرده‌اید.</p>
                      )}
                      <div className="mt-4">
                        <Button asChild variant="outline" className="w-full border-teal text-teal hover:bg-teal/10">
                          <Link href="/dashboard/ads/new">
                            <PlusCircle className="ml-2 h-4 w-4" />
                            ثبت آگهی جدید
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-4 text-lg font-medium text-teal-dark">نرخ ارز</h3>
                      <ExchangeRates />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "ads" && (
            <Card>
              <CardHeader>
                <CardTitle>آگهی‌های من</CardTitle>
                <CardDescription>مدیریت آگهی‌های شغلی و مسکن</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-end">
                  <Button asChild>
                    <Link href="/dashboard/ads/new">
                      <PlusCircle className="ml-2 h-4 w-4" />
                      ثبت آگهی جدید
                    </Link>
                  </Button>
                </div>
                {userAds.length > 0 ? (
                  <div className="space-y-4">
                    {userAds.map((ad) => (
                      <div key={ad.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <div className="font-medium">{ad.title}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>نوع: {ad.type === "job" ? "شغلی" : "مسکن"}</span>
                            <span>•</span>
                            <span>تاریخ: {ad.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`rounded-full px-2 py-1 text-xs ${
                              ad.status === "فعال" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {ad.status}
                          </div>
                          <Button variant="outline" size="sm">
                            ویرایش
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-lg font-medium">هیچ آگهی ثبت نشده است</h3>
                    <p className="mb-4 text-muted-foreground">
                      برای ثبت آگهی جدید شغلی یا مسکن، روی دکمه زیر کلیک کنید.
                    </p>
                    <Button asChild>
                      <Link href="/dashboard/ads/new">
                        <PlusCircle className="ml-2 h-4 w-4" />
                        ثبت آگهی جدید
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>پروفایل کاربری</CardTitle>
                <CardDescription>مشاهده و ویرایش اطلاعات شخصی</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>نام کاربری</Label>
                    <Input value={user.name} readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label>ایمیل</Label>
                    <Input value={user.email} readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label>تاریخ عضویت</Label>
                    <Input value={user.joinDate} readOnly />
                  </div>
                  <Button>ویرایش پروفایل</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

