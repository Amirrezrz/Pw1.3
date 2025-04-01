import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import "@/app/globals.css"
import localFont from "next/font/local"

// Load B Yekan font
const bYekan = localFont({
  src: [
    {
      path: "../public/fonts/BYekan.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BYekanBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-byekan",
})

export const metadata = {
  title: "ایرانیان در ایتالیا",
  description: "وبسایت جامع برای ایرانیان مقیم ایتالیا",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${bYekan.variable}`}>
      <body className="font-byekan">
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="relative flex min-h-screen flex-col">
            <MainNav />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'