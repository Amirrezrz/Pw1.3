"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you would authenticate with a backend
    // For demo purposes, we'll simulate a login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md border-sage bg-cream-50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-teal-dark">ورود به حساب کاربری</CardTitle>
          <CardDescription>برای استفاده از امکانات سایت وارد حساب کاربری خود شوید</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-teal-dark">
                ایمیل
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-sage bg-cream"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-teal-dark">
                  رمز عبور
                </Label>
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-teal underline-offset-4 hover:text-teal-dark hover:underline"
                >
                  فراموشی رمز عبور
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-sage bg-cream"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "در حال ورود..." : "ورود"}
            </Button>
            <div className="mt-4 text-center text-sm">
              حساب کاربری ندارید؟{" "}
              <Link href="/auth/register" className="text-teal underline-offset-4 hover:text-teal-dark hover:underline">
                ثبت نام کنید
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

