import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DetailedExchangeRates } from "@/components/detailed-exchange-rates"

export const metadata = {
  title: "نرخ ارز | ایرانیان در ایتالیا",
  description: "نرخ لحظه‌ای ارز برای ایرانیان مقیم ایتالیا",
}

export default function ExchangeRatesPage() {
  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">نرخ لحظه‌ای ارز</h1>

      <Card>
        <CardHeader>
          <CardTitle>نرخ ارز</CardTitle>
          <CardDescription>نرخ لحظه‌ای تبدیل ارزهای خارجی به ریال ایران</CardDescription>
        </CardHeader>
        <CardContent>
          <DetailedExchangeRates />
        </CardContent>
      </Card>
    </div>
  )
}

