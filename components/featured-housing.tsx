import Link from "next/link"

export function FeaturedHousing() {
  // Mock data - in a real app, this would come from an API or database
  const housing = [
    {
      id: 1,
      title: "آپارتمان دو خوابه در مرکز میلان",
      price: "۱,۲۰۰ یورو / ماه",
      location: "میلان، مرکز شهر",
      slug: "two-bedroom-milan-center",
    },
    {
      id: 2,
      title: "اتاق مبله در خانه مشترک",
      price: "۵۰۰ یورو / ماه",
      location: "رم، نزدیک دانشگاه",
      slug: "furnished-room-rome",
    },
  ]

  return (
    <div className="space-y-3">
      {housing.map((item) => (
        <div key={item.id} className="space-y-1">
          <Link href={`/housing/${item.slug}`} className="block font-medium hover:underline">
            {item.title}
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{item.price}</span>
            <span>•</span>
            <span>{item.location}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

