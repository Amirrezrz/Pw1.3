import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Home, Settings, Users, BookOpen, MessageSquare, Building, LogOut } from "lucide-react"

export const metadata = {
  title: "پنل مدیریت | ایرانیان در ایتالیا",
  description: "پنل مدیریت وبسایت ایرانیان در ایتالیا",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="border-r bg-muted md:w-64">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center font-bold">
            <Settings className="ml-2 h-5 w-5" />
            پنل مدیریت
          </Link>
        </div>
        <nav className="p-4">
          <div className="space-y-1">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin">
                <Home className="ml-2 h-4 w-4" />
                داشبورد
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/news">
                <FileText className="ml-2 h-4 w-4" />
                مدیریت اخبار
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/rules">
                <BookOpen className="ml-2 h-4 w-4" />
                مدیریت قوانین
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/jobs">
                <MessageSquare className="ml-2 h-4 w-4" />
                مدیریت آگهی‌های شغلی
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/housing">
                <Building className="ml-2 h-4 w-4" />
                مدیریت آگهی‌های مسکن
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/users">
                <Users className="ml-2 h-4 w-4" />
                مدیریت کاربران
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/settings">
                <Settings className="ml-2 h-4 w-4" />
                تنظیمات سایت
              </Link>
            </Button>
          </div>
          <div className="mt-6 pt-6 border-t">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Link href="/">
                <LogOut className="ml-2 h-4 w-4" />
                خروج از پنل مدیریت
              </Link>
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container p-6">{children}</div>
      </main>
    </div>
  )
}

