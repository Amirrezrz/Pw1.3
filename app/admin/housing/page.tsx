import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Trash2, Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HousingManagementPage() {
  // Mock data for housing ads
  const housingAds = [
    {
      id: 1,
      title: "آپارتمان دو خوابه در مرکز میلان",
      price: "۱,۲۰۰ یورو / ماه",
      location: "میلان، مرکز شهر",
      date: "۱۴۰۴/۰۱/۱۵",
      user: "کاربر ۱۲۳",
      status: "approved",
      slug: "two-bedroom-milan-center",
    },
    {
      id: 2,
      title: "اتاق مبله در خانه مشترک",
      price: "۵۰۰ یورو / ماه",
      location: "رم، نزدیک دانشگاه",
      date: "۱۴۰۴/۰۱/۱۰",
      user: "کاربر ۴۵۶",
      status: "approved",
      slug: "furnished-room-rome",
    },
    {
      id: 3,
      title: "خانه ویلایی در حومه فلورانس",
      price: "۱,۸۰۰ یورو / ماه",
      location: "فلورانس، حومه شهر",
      date: "۱۴۰۴/۰۱/۰۵",
      user: "کاربر ۷۸۹",
      status: "pending",
      slug: "villa-florence-suburbs",
    },
    {
      id: 4,
      title: "استودیو کوچک در ونیز",
      price: "۸۰۰ یورو / ماه",
      location: "ونیز، مرکز شهر",
      date: "۱۴۰۴/۰۱/۰۲",
      user: "کاربر ۱۰۱",
      status: "rejected",
      slug: "small-studio-venice",
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">مدیریت آگهی‌های مسکن</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>آگهی‌های مسکن</CardTitle>
          <CardDescription>مدیریت آگهی‌های مسکن ارسال شده توسط کاربران</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="mb-4 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">همه</TabsTrigger>
                <TabsTrigger value="pending">در انتظار تایید</TabsTrigger>
                <TabsTrigger value="approved">تایید شده</TabsTrigger>
                <TabsTrigger value="rejected">رد شده</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="جستجو در آگهی‌ها..." className="w-[250px] pr-10" />
              </div>
            </div>

            <TabsContent value="all" className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>عنوان</TableHead>
                    <TableHead>قیمت</TableHead>
                    <TableHead>موقعیت</TableHead>
                    <TableHead>تاریخ</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead className="text-left">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {housingAds.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell className="font-medium">{ad.title}</TableCell>
                      <TableCell>{ad.price}</TableCell>
                      <TableCell>{ad.location}</TableCell>
                      <TableCell>{ad.date}</TableCell>
                      <TableCell>
                        {ad.status === "approved" ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            <CheckCircle className="ml-1 h-3 w-3" />
                            تایید شده
                          </span>
                        ) : ad.status === "pending" ? (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                            <Clock className="ml-1 h-3 w-3" />
                            در انتظار تایید
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                            <XCircle className="ml-1 h-3 w-3" />
                            رد شده
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button asChild size="icon" variant="ghost">
                            <Link href={`/housing/${ad.slug}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">مشاهده</span>
                            </Link>
                          </Button>
                          <Button asChild size="icon" variant="ghost">
                            <Link href={`/admin/housing/edit/${ad.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">ویرایش</span>
                            </Link>
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">حذف</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pending" className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>عنوان</TableHead>
                    <TableHead>قیمت</TableHead>
                    <TableHead>موقعیت</TableHead>
                    <TableHead>تاریخ</TableHead>
                    <TableHead className="text-left">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {housingAds
                    .filter((ad) => ad.status === "pending")
                    .map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell>{ad.price}</TableCell>
                        <TableCell>{ad.location}</TableCell>
                        <TableCell>{ad.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button asChild size="icon" variant="ghost">
                              <Link href={`/housing/${ad.slug}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">مشاهده</span>
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-50">
                              <CheckCircle className="ml-1 h-4 w-4" />
                              تایید
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                              <XCircle className="ml-1 h-4 w-4" />
                              رد
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

