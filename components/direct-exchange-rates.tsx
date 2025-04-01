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

// Fallback data in case the API fails
const fallbackData = {
  price_dollar_rl: { p: "580000", d: "2000", dp: "0.5" },
  price_eur: { p: "620000", d: "1000", dp: "0.2" },
  price_gbp: { p: "730000", d: "-2000", dp: "-0.3" },
  price_aed: { p: "158000", d: "500", dp: "0.1" },
}

export function DirectExchangeRates() {
  const [rates, setRates] = useState<any>(fallbackData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date())

  const fetchRates = async () => {
    try {
      setLoading(true)

      // Try to fetch directly from TGJU API
      const response = await fetch("https://call.tgju.org/ajax.json", {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()

      // Check if we got the expected data structure
      if (data && data.current) {
        // Format the data to match our expected structure
        const formattedData = {}

        // Map the currencies we need
        if (data.current.price_dollar_rl) {
          formattedData["price_dollar_rl"] = {
            p: data.current.price_dollar_rl.p,
            d: data.current.price_dollar_rl.d,
            dp: data.current.price_dollar_rl.dp,
          }
        }

        if (data.current.price_eur) {
          formattedData["price_eur"] = {
            p: data.current.price_eur.p,
            d: data.current.price_eur.d,
            dp: data.current.price_eur.dp,
          }
        }

        if (data.current.price_gbp) {
          formattedData["price_gbp"] = {
            p: data.current.price_gbp.p,
            d: data.current.price_gbp.d,
            dp: data.current.price_gbp.dp,
          }
        }

        if (data.current.price_aed) {
          formattedData["price_aed"] = {
            p: data.current.price_aed.p,
            d: data.current.price_aed.d,
            dp: data.current.price_aed.dp,
          }
        }

        // If we got data for at least one currency, use it
        if (Object.keys(formattedData).length > 0) {
          setRates(formattedData)
          setLastUpdated(new Date())
          setError(null)
          return
        }
      }

      // If we didn't get the expected data, use fallback
      setRates(fallbackData)
      setLastUpdated(new Date())
      setError("استفاده از داده‌های پیش‌فرض به دلیل عدم دسترسی به API")
    } catch (err: any) {
      console.error("Error fetching rates directly:", err)
      // Use fallback data
      setRates(fallbackData)
      setLastUpdated(new Date())
      setError("استفاده از داده‌های پیش‌فرض به دلیل خطا در دسترسی به API")
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
          className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs hover:bg-secondary/80"
          disabled={loading}
        >
          <RefreshCw className={`mr-1 h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          بروزرسانی
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {displayCurrencies.map(([key, currency]) => (
          <div key={key} className="flex items-center justify-between rounded-lg border p-3">
            <div className="font-medium">{currencyNames[key] || key}</div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{Number(currency.p).toLocaleString("fa-IR")}</span>
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
        ))}
      </div>

      {error && (
        <div className="rounded-lg bg-neutral-100 p-2 text-xs text-neutral-700">
          <p>{error}</p>
        </div>
      )}

      <div className="mt-2 text-center">
        <Link href="/exchange-rates" className="text-xs text-primary hover:text-primary/80 hover:underline">
          مشاهده همه نرخ‌های ارز
        </Link>
      </div>
    </div>
  )
}

