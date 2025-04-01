"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createNewsPost } from "@/app/actions/news"
import { Loader2 } from "lucide-react"

export function NewsForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [published, setPublished] = useState(true)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await createNewsPost(formData)

      if (result.success) {
        // Redirect to the news page or the newly created post
        router.push("/news")
        router.refresh()
      } else {
        setError(result.error || "خطایی رخ داد. لطفا دوباره تلاش کنید.")
      }
    } catch (err) {
      setError("خطایی در ارسال فرم رخ داد. لطفا دوباره تلاش کنید.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>افزودن خبر جدید</CardTitle>
        <CardDescription>خبر جدیدی برای نمایش در سایت ایجاد کنید.</CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="title">عنوان خبر</Label>
            <Input id="title" name="title" placeholder="عنوان خبر را وارد کنید" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">خلاصه خبر</Label>
            <Textarea id="excerpt" name="excerpt" placeholder="خلاصه‌ای از خبر را وارد کنید" rows={2} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">متن کامل خبر</Label>
            <Textarea id="content" name="content" placeholder="متن کامل خبر را وارد کنید" rows={10} required />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              name="published"
              checked={published}
              onCheckedChange={setPublished}
              value={published ? "true" : "false"}
            />
            <Label htmlFor="published" className="mr-2">
              انتشار خبر
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            انصراف
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                در حال ارسال...
              </>
            ) : (
              "ذخیره خبر"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

