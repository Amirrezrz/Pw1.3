"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Currency name mapping
const currencyNames = {
  price_dollar_rl: "دلار آمریکا",
  price_eur: "یورو",
  price_gbp: "پوند انگلیس",
  price_aed: "درهم امارات",
  price_try: "لیر ترکیه",
  price_cad: "دلار کانادا",
  price_aud: "دلار استرالیا",
  price_sek: "کرون سوئد",
  price_nok: "کرون نروژ",
  price_rub: "روبل روسیه",
  price_chf: "فرانک سوئیس",
  price_jpy: "ین ژاپن",
  price_cny: "یوان چین",
}

// Currency symbols
const currencySymbols = {
  price_dollar_rl: "$",
  price_eur: "€",
  price_gbp: "£",
  price_aed: "د.إ",
  price_try: "₺",
  price_cad: "C$",
  price_aud: "A$",
  price_sek: "kr",
  price_nok: "kr",
  price_rub: "₽",
  price_chf: "CHF",
  price_jpy: "¥",
  price_cny: "¥",
}

export function DetailedExchangeRates() {
  const [rates, setRates] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortKey, setSortKey] = useState("p")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

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

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
  }

  if (loading && !rates) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-64 w-full" />
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

  // Filter and sort currencies
  const filteredCurrencies = rates
    ? Object.entries(rates)
        .filter(([key, currency]) => {
          const name = currencyNames[key] || key
          return (
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            key.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })
        .sort((a, b) => {
          const aValue = a[1][sortKey]
          const bValue = b[1][sortKey]

          if (sortKey === "p" || sortKey === "d" || sortKey === "dp") {
            return sortDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue)
          }

          return sortDirection === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue))
        })
    : []

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          {lastUpdated && <span>آخرین بروزرسانی: {lastUpdated.toLocaleTimeString("fa-IR")}</span>}
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="جستجوی ارز..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[200px]"
          />
          <Button onClick={handleRefresh} variant="outline" className="inline-flex items-center" disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            بروزرسانی
          </Button>
        </div>
      </div>

      {filteredCurrencies.length > 0 ? (
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px]">نماد</TableHead>
                <TableHead>نام</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("p")}>
                  <div className="flex items-center">
                    قیمت (ریال)
                    {sortKey === "p" ? (
                      sortDirection === "asc" ? (
                        <ChevronUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="mr-1 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="mr-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("dp")}>
                  <div className="flex items-center">
                    تغییر
                    {sortKey === "dp" ? (
                      sortDirection === "asc" ? (
                        <ChevronUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="mr-1 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="mr-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </TableHead>
                <TableHead>کمترین</TableHead>
                <TableHead>بیشترین</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCurrencies.map(([key, currency]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{currencySymbols[key] || ""}</TableCell>
                  <TableCell>{currencyNames[key] || key}</TableCell>
                  <TableCell className="font-bold">{Number(currency.p).toLocaleString("fa-IR")}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        Number(currency.dp) > 0
                          ? "bg-green-100 text-green-800"
                          : Number(currency.dp) < 0
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {Number(currency.dp) > 0 ? "+" : ""}
                      {Number(currency.dp).toLocaleString("fa-IR")}%
                    </span>
                  </TableCell>
                  <TableCell>{Number(currency.l || currency.p).toLocaleString("fa-IR")}</TableCell>
                  <TableCell>{Number(currency.h || currency.p).toLocaleString("fa-IR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-lg border bg-background p-6 text-center">
          <p>در حال حاضر اطلاعات نرخ ارز در دسترس نیست یا هیچ نتیجه‌ای با جستجوی شما مطابقت ندارد.</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <a
          href="https://www.tgju.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:text-primary/80 hover:underline"
        >
          منبع: اتحادیه طلا و جواهر تهران (TGJU)
        </a>
      </div>

      <div className="rounded-lg bg-neutral-100 p-4 text-sm text-neutral-700">
        <p>
          <strong>توجه:</strong> نرخ‌های ارائه شده فقط برای اطلاع‌رسانی است و ممکن است با نرخ‌های واقعی در صرافی‌ها متفاوت
          باشد.
        </p>
      </div>
    </div>
  )
}

