"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw } from "lucide-react"
import Link from "next/link"

// Main currency codes we want to display
const mainCurrencies = ["price_dollar_rl", "price_eur", "price_gbp", "price_aed"]

// Currency name mapping
const currencyNames = {
  price_dollar_rl: "دلار آمریکا",
  price_eur: "یورو",
  price_gbp: "پوند انگلیس",
  price_aed: "درهم امارات",
  price_try: "لیر ترکیه",
  price_cad: "دلار کانادا",
}

export function ExchangeRates() {
  const [rates, setRates] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchRates = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/exchange-rates")

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setRates(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err: any) {
      setError(`خطا در دریافت نرخ ارز: ${err.message}`)
      console.error("Error fetching rates:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()

    // Refresh rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    fetchRates()
  }

  if (loading && !rates) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-800">
        <p>{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-2 inline-flex items-center rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
        >
          <RefreshCw className="mr-1 h-4 w-4" />
          تلاش مجدد
        </button>
      </div>
    )
  }

  // Get the currencies to display
  const displayCurrencies = rates
    ? Object.entries(rates)
        .filter(([key]) => mainCurrencies.includes(key))
        .sort((a, b) => mainCurrencies.indexOf(a[0]) - mainCurrencies.indexOf(b[0]))
    : []

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {lastUpdated && <span>آخرین بروزرسانی: {lastUpdated.toLocaleTimeString("fa-IR")}</span>}
        </div>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center rounded-md bg-sage/50 px-2 py-1 text-xs text-teal-dark hover:bg-sage"
          disabled={loading}
        >
          <RefreshCw className={`mr-1 h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          بروزرسانی
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {displayCurrencies.length > 0 ? (
          displayCurrencies.map(([key, currency]) => (
            <div key={key} className="flex items-center justify-between rounded-lg border border-sage bg-cream p-3">
              <div className="font-medium text-teal-dark">{currencyNames[key] || key}</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-teal-dark">{Number(currency.p).toLocaleString("fa-IR")}</span>
                <span
                  className={`text-xs ${
                    Number(currency.dp) > 0
                      ? "text-green-600"
                      : Number(currency.dp) < 0
                        ? "text-red-600"
                        : "text-gray-500"
                  }`}
                >
                  {Number(currency.dp) > 0 ? "+" : ""}
                  {Number(currency.dp).toLocaleString("fa-IR")}%
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 rounded-lg border border-sage bg-cream p-4 text-center text-teal-dark">
            <p>در حال حاضر اطلاعات نرخ ارز در دسترس نیست.</p>
          </div>
        )}
      </div>

      <div className="mt-2 text-center">
        <Link href="/exchange-rates" className="text-xs text-teal hover:text-teal-dark hover:underline">
          مشاهده همه نرخ‌های ارز
        </Link>
      </div>
    </div>
  )
}

