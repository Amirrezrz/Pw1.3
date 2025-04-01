import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Trash2, Plus, Search, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function NewsManagementPage() {
  // Mock data for news posts
  const newsPosts = [
    {
      id: 1,
      title: "تغییرات جدید در قوانین اقامت ایتالیا",
      date: "۱۴۰۴/۰۱/۱۵",
      author: "مدیر سایت",
      status: "published",
      slug: "new-residence-rules",
    },
    {
      id: 2,
      title: "برگزاری جشنواره فرهنگی ایرانیان در رم",
      date: "۱۴۰۴/۰۱/۱۰",
      author: "مدیر سایت",
      status: "published",
      slug: "cultural-festival-rome",
    },
    {
      id: 3,
      title: "راهنمای ثبت نام در دانشگاه‌های ایتالیا",
      date: "۱۴۰۴/۰۱/۰۵",
      author: "مدیر سایت",
      status: "published",
      slug: "university-registration-guide",
    },
    {
      id: 4,
      title: "تغییرات جدید در سیستم بانکی ایتالیا",
      date: "۱۴۰۴/۰۱/۰۲",
      author: "مدیر سایت",
      status: "draft",
      slug: "banking-system-changes",
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">مدیریت اخبار</h1>
        <Button asChild>
          <Link href="/admin/news/add">
            <Plus className="ml-2 h-4 w-4" />
            افزودن خبر جدید
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست اخبار</CardTitle>
          <CardDescription>مدیریت اخبار و مطالب سایت</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="جستجو در اخبار..." className="pr-10" />
            </div>
            <Button variant="outline">فیلتر</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>عنوان</TableHead>
                  <TableHead>تاریخ</TableHead>
                  <TableHead>نویسنده</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      {post.status === "published" ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          <CheckCircle className="ml-1 h-3 w-3" />
                          منتشر شده
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                          <XCircle className="ml-1 h-3 w-3" />
                          پیش‌نویس
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button asChild size="icon" variant="ghost">
                          <Link href={`/news/${post.slug}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">مشاهده</span>
                          </Link>
                        </Button>
                        <Button asChild size="icon" variant="ghost">
                          <Link href={`/admin/news/edit/${post.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">ویرایش</span>
                          </Link>
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">حذف</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

