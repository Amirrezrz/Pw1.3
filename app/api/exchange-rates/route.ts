import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Use the correct TGJU API endpoint for currency data
    const response = await fetch("https://api.tgju.org/v1/data/sana/json", {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store", // Don't cache to ensure fresh data
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Check if we got the expected data structure
    if (data && data.sana && data.sana.data) {
      // Format the data to match our expected structure
      const formattedData = {}
      data.sana.data.forEach((item) => {
        formattedData[item.slug] = {
          p: item.price,
          d: item.change,
          dp: item.percent,
          h: item.high || item.price,
          l: item.low || item.price,
          t: item.updated_at || new Date().toISOString(),
        }
      })

      return NextResponse.json(formattedData)
    } else {
      throw new Error("Unexpected API response format")
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error)

    // Return fallback data in case the API fails
    return NextResponse.json({
      price_dollar_rl: { p: "580000", d: "2000", dp: "0.5", h: "585000", l: "575000", t: new Date().toISOString() },
      price_eur: { p: "620000", d: "1000", dp: "0.2", h: "625000", l: "615000", t: new Date().toISOString() },
      price_gbp: { p: "730000", d: "-2000", dp: "-0.3", h: "735000", l: "725000", t: new Date().toISOString() },
      price_aed: { p: "158000", d: "500", dp: "0.1", h: "160000", l: "156000", t: new Date().toISOString() },
      price_try: { p: "17500", d: "-100", dp: "-0.4", h: "18000", l: "17000", t: new Date().toISOString() },
      price_cad: { p: "425000", d: "1500", dp: "0.3", h: "430000", l: "420000", t: new Date().toISOString() },
    })
  }
}

