"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Import supabase client
import { supabase } from "@/lib/supabaseClient"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    // Validate password match
    if (password !== confirmPassword) {
      setErrorMessage("رمز عبور و تایید آن باید یکسان باشند")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 6) {
      setErrorMessage("رمز عبور باید حداقل 6 کاراکتر باشد")
      setIsLoading(false)
      return
    }

    try {
      // Use Supabase authentication to sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Check if user needs email verification (depends on your Supabase settings)
      if (data.user && data.session) {
        // If auto-confirmation is enabled, redirect to dashboard
        router.push("/dashboard")
        router.refresh()
      } else {
        // Show message that verification email has been sent
        setErrorMessage("لطفا ایمیل خود را برای تایید حساب کاربری بررسی کنید")
      }
    } catch (error: any) {
      // Handle registration errors
      if (error.message.includes("email")) {
        setErrorMessage("این ایمیل قبلا ثبت شده است")
      } else {
        setErrorMessage(error.message || "خطا در ثبت نام. لطفا مجددا تلاش کنید")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md border-sage bg-cream-50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-teal-dark">ثبت نام</CardTitle>
          <CardDescription>برای استفاده از امکانات سایت یک حساب کاربری ایجاد کنید</CardDescription>
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
              <Label htmlFor="password" className="text-teal-dark">
                رمز عبور
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-sage bg-cream"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-teal-dark">
                تایید رمز عبور
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-sage bg-cream"
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-1">
                {errorMessage}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
            </Button>
            <div className="mt-4 text-center text-sm">
              قبلا ثبت نام کرده‌اید؟{" "}
              <Link href="/auth/login" className="text-teal underline-offset-4 hover:text-teal-dark hover:underline">
                وارد شوید
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}