import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
            &copy; {new Date().getFullYear()} ایرانیان در ایتالیا. تمامی حقوق محفوظ است.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
            درباره ما
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
            تماس با ما
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
            حریم خصوصی
          </Link>
        </div>
      </div>
    </footer>
  )
}

