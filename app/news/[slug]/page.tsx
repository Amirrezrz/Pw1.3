import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, User, ArrowRight, Edit } from "lucide-react"

// This would be a database query in a real app
async function getNewsPost(slug: string) {
  // Mock data
  const news = {
    title: "تغییرات جدید در قوانین اقامت ایتالیا",
    content: `
      <p>اخیراً تغییراتی در قوانین اقامت ایتالیا اعمال شده است که بر وضعیت اقامتی ایرانیان مقیم این کشور تأثیر می‌گذارد.</p>
      
      <p>بر اساس این تغییرات، متقاضیان اقامت باید مدارک بیشتری ارائه دهند و روند بررسی درخواست‌ها نیز طولانی‌تر خواهد شد.</p>
      
      <p>همچنین، شرایط تمدید اقامت نیز سخت‌گیرانه‌تر شده است و متقاضیان باید شرایط بیشتری را احراز کنند.</p>
      
      <p>توصیه می‌شود ایرانیان مقیم ایتالیا که قصد تمدید اقامت خود را دارند، از چند ماه قبل اقدامات لازم را انجام دهند.</p>
      
      <p>برای کسب اطلاعات بیشتر می‌توانید با دفاتر مهاجرتی معتبر تماس بگیرید یا به سایت رسمی اداره مهاجرت ایتالیا مراجعه کنید.</p>
    `,
    date: "۱۴۰۴/۰۱/۱۵",
    author: "مدیر سایت",
    slug: "new-residence-rules",
  }

  return news
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getNewsPost(params.slug)

  return {
    title: `${post.title} | ایرانیان در ایتالیا`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  }
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const post = await getNewsPost(params.slug)

  return (
    <div className="container py-10">
      <div className="mb-4">
        <Button asChild variant="outline" size="sm" className="mb-6">
          <Link href="/news" className="flex items-center">
            <ArrowRight className="ml-2 h-4 w-4" />
            بازگشت به اخبار
          </Link>
        </Button>
      </div>

      <article className="prose prose-lg mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

        <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <CalendarIcon className="ml-1 h-4 w-4" />
            {post.date}
          </span>
          <span className="flex items-center">
            <User className="ml-1 h-4 w-4" />
            {post.author}
          </span>
          <Button asChild variant="ghost" size="sm" className="mr-auto">
            <Link href={`/admin/news/edit/${post.slug}`} className="flex items-center">
              <Edit className="ml-1 h-4 w-4" />
              ویرایش
            </Link>
          </Button>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  )
}

