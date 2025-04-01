import { NewsForm } from "@/components/news-form"

export const metadata = {
  title: "افزودن خبر جدید | ایرانیان در ایتالیا",
  description: "افزودن خبر جدید به وبسایت ایرانیان در ایتالیا",
}

export default function AddNewsPage() {
  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">افزودن خبر جدید</h1>
      <NewsForm />
    </div>
  )
}

