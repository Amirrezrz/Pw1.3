import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DirectExchangeRates } from "@/components/direct-exchange-rates"
import { LatestNews } from "@/components/latest-news"
import { FeaturedJobs } from "@/components/featured-jobs"
import { FeaturedHousing } from "@/components/featured-housing"

export default function Home() {
  return (
    <main className="container px-4 py-6 md:py-10">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            به وبسایت ایرانیان در ایتالیا خوش آمدید
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            منبع جامع اطلاعات، قوانین، آگهی‌های شغلی، مسکن و اخبار برای ایرانیان مقیم ایتالیا
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/rules">قوانین ایتالیا</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">ورود / ثبت نام</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>نرخ ارز</CardTitle>
            <CardDescription>نرخ تبدیل یورو و دلار به ریال</CardDescription>
          </CardHeader>
          <CardContent>
            <DirectExchangeRates />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخرین اخبار</CardTitle>
            <CardDescription>تازه‌ترین اخبار مربوط به ایرانیان در ایتالیا</CardDescription>
          </CardHeader>
          <CardContent>
            <LatestNews />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/news">مشاهده همه اخبار</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>آگهی‌های ویژه</CardTitle>
            <CardDescription>فرصت‌های شغلی و مسکن</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="text-lg font-medium">فرصت‌های شغلی</h3>
              <FeaturedJobs />
            </div>
            <div>
              <h3 className="text-lg font-medium">آگهی‌های مسکن</h3>
              <FeaturedHousing />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/jobs">مشاهده همه آگهی‌های شغلی</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/housing">مشاهده همه آگهی‌های مسکن</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}

