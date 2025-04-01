import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, User } from "lucide-react"

export const metadata = {
  title: "اخبار | ایرانیان در ایتالیا",
  description: "آخرین اخبار مربوط به ایرانیان در ایتالیا",
}

export default function NewsPage() {
  // Mock data - in a real app, this would come from an API or database
  const news = [
    {
      id: 1,
      title: "تغییرات جدید در قوانین اقامت ایتالیا",
      excerpt:
        "اخیراً تغییراتی در قوانین اقامت ایتالیا اعمال شده است که بر وضعیت اقامتی ایرانیان مقیم این کشور تأثیر می‌گذارد.",
      date: "۱۴۰۴/۰۱/۱۵",
      author: "مدیر سایت",
      slug: "new-residence-rules",
    },
    {
      id: 2,
      title: "برگزاری جشنواره فرهنگی ایرانیان در رم",
      excerpt: "جشنواره فرهنگی ایرانیان در شهر رم با حضور هنرمندان و فرهیختگان ایرانی مقیم ایتالیا برگزار خواهد شد.",
      date: "۱۴۰۴/۰۱/۱۰",
      author: "مدیر سایت",
      slug: "cultural-festival-rome",
    },
    {
      id: 3,
      title: "راهنمای ثبت نام در دانشگاه‌های ایتالیا",
      excerpt: "راهنمای کامل مراحل ثبت نام و پذیرش در دانشگاه‌های ایتالیا برای دانشجویان ایرانی.",
      date: "۱۴۰۴/۰۱/۰۵",
      author: "مدیر سایت",
      slug: "university-registration-guide",
    },
  ]

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">اخبار و رویدادها</h1>
        <Button asChild>
          <Link href="/admin/news/add">افزودن خبر جدید</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center">
                  <CalendarIcon className="ml-1 h-3 w-3" />
                  {item.date}
                </span>
                <span className="flex items-center">
                  <User className="ml-1 h-3 w-3" />
                  {item.author}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/news/${item.slug}`}>ادامه مطلب</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

