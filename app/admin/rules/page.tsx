import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Trash2, Plus, Search, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function RulesManagementPage() {
  // Mock data for rules
  const rules = [
    {
      id: 1,
      title: "قوانین اقامت در ایتالیا",
      category: "اقامت",
      date: "۱۴۰۴/۰۱/۱۵",
      author: "مدیر سایت",
      status: "published",
      slug: "residence-rules",
    },
    {
      id: 2,
      title: "قوانین کار در ایتالیا",
      category: "کار",
      date: "۱۴۰۴/۰۱/۱۰",
      author: "مدیر سایت",
      status: "published",
      slug: "work-rules",
    },
    {
      id: 3,
      title: "قوانین تحصیل در ایتالیا",
      category: "تحصیل",
      date: "۱۴۰۴/۰۱/۰۵",
      author: "مدیر سایت",
      status: "published",
      slug: "education-rules",
    },
    {
      id: 4,
      title: "قوانین مالیاتی ایتالیا",
      category: "مالیات",
      date: "۱۴۰۴/۰۱/۰۲",
      author: "مدیر سایت",
      status: "draft",
      slug: "tax-rules",
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">مدیریت قوانین</h1>
        <Button asChild>
          <Link href="/admin/rules/add">
            <Plus className="ml-2 h-4 w-4" />
            افزودن قانون جدید
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست قوانین</CardTitle>
          <CardDescription>مدیریت قوانین و مقررات ایتالیا</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="جستجو در قوانین..." className="pr-10" />
            </div>
            <Button variant="outline">فیلتر</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>عنوان</TableHead>
                  <TableHead>دسته‌بندی</TableHead>
                  <TableHead>تاریخ</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.title}</TableCell>
                    <TableCell>{rule.category}</TableCell>
                    <TableCell>{rule.date}</TableCell>
                    <TableCell>
                      {rule.status === "published" ? (
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
                          <Link href={`/rules/${rule.slug}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">مشاهده</span>
                          </Link>
                        </Button>
                        <Button asChild size="icon" variant="ghost">
                          <Link href={`/admin/rules/edit/${rule.id}`}>
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

