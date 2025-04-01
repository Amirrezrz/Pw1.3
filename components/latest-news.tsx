import Link from "next/link"

export function LatestNews() {
  // Mock data - in a real app, this would come from an API or database
  const news = [
    {
      id: 1,
      title: "تغییرات جدید در قوانین اقامت ایتالیا",
      date: "۱۴۰۴/۰۱/۱۵",
      slug: "new-residence-rules",
    },
    {
      id: 2,
      title: "برگزاری جشنواره فرهنگی ایرانیان در رم",
      date: "۱۴۰۴/۰۱/۱۰",
      slug: "cultural-festival-rome",
    },
    {
      id: 3,
      title: "راهنمای ثبت نام در دانشگاه‌های ایتالیا",
      date: "۱۴۰۴/۰۱/۰۵",
      slug: "university-registration-guide",
    },
  ]

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.id} className="space-y-1">
          <Link href={`/news/${item.slug}`} className="block font-medium hover:underline">
            {item.title}
          </Link>
          <p className="text-xs text-muted-foreground">{item.date}</p>
        </div>
      ))}
      <div className="pt-2 text-center">
        <Link href="/admin/news/add" className="text-xs text-primary hover:underline">
          افزودن خبر جدید +
        </Link>
      </div>
    </div>
  )
}

