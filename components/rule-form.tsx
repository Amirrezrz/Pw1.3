"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function RuleForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [published, setPublished] = useState(true)
  const [category, setCategory] = useState("")

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to the rules page
      router.push("/admin/rules")
      router.refresh()
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
        <CardTitle>افزودن قانون جدید</CardTitle>
        <CardDescription>قانون جدیدی برای نمایش در سایت ایجاد کنید.</CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="title">عنوان قانون</Label>
            <Input id="title" name="title" placeholder="عنوان قانون را وارد کنید" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">دسته‌بندی</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category" name="category">
                <SelectValue placeholder="انتخاب دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residence">اقامت</SelectItem>
                <SelectItem value="work">کار</SelectItem>
                <SelectItem value="education">تحصیل</SelectItem>
                <SelectItem value="tax">مالیات</SelectItem>
                <SelectItem value="health">بهداشت و درمان</SelectItem>
                <SelectItem value="other">سایر</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">خلاصه قانون</Label>
            <Textarea id="excerpt" name="excerpt" placeholder="خلاصه‌ای از قانون را وارد کنید" rows={2} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">متن کامل قانون</Label>
            <Textarea id="content" name="content" placeholder="متن کامل قانون را وارد کنید" rows={10} required />
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
              انتشار قانون
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
              "ذخیره قانون"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

