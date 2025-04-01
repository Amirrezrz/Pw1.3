"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  // Don't show admin links in the public navigation
  const isAdminPage = pathname.startsWith("/admin")

  // If we're on an admin page, don't show the main nav
  if (isAdminPage) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  صفحه اصلی
                </Link>
                <Link href="/rules" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  قوانین ایتالیا
                </Link>
                <Link href="/news" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  اخبار
                </Link>
                <Link href="/jobs" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  آگهی‌های شغلی
                </Link>
                <Link href="/housing" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  آگهی‌های مسکن
                </Link>
                <Link href="/dashboard" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  پنل کاربری
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">ایرانیان در ایتالیا</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/"}>
                    صفحه اصلی
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>خدمات</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/rules"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">قوانین ایتالیا</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            اطلاعات جامع درباره قوانین اقامت، کار و زندگی در ایتالیا
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/news"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">اخبار</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            آخرین اخبار مربوط به ایرانیان در ایتالیا
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/jobs"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">آگهی‌های شغلی</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            جستجو و ارسال آگهی‌های شغلی برای ایرانیان در ایتالیا
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/housing"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">آگهی‌های مسکن</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            جستجو و ارسال آگهی‌های مسکن برای ایرانیان در ایتالیا
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/exchange-rates" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>نرخ ارز</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>پنل کاربری</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="outline" size="sm">
              ورود
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm">ثبت نام</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

