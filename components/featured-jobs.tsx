import Link from "next/link"

export function FeaturedJobs() {
  // Mock data - in a real app, this would come from an API or database
  const jobs = [
    {
      id: 1,
      title: "مترجم فارسی به ایتالیایی",
      company: "شرکت ترجمه میلان",
      location: "میلان",
      slug: "persian-italian-translator",
    },
    {
      id: 2,
      title: "آشپز رستوران ایرانی",
      company: "رستوران پرشیا",
      location: "رم",
      slug: "iranian-restaurant-chef",
    },
  ]

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <div key={job.id} className="space-y-1">
          <Link href={`/jobs/${job.slug}`} className="block font-medium hover:underline">
            {job.title}
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{job.company}</span>
            <span>•</span>
            <span>{job.location}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

