import { RuleForm } from "@/components/rule-form"

export const metadata = {
  title: "افزودن قانون جدید | ایرانیان در ایتالیا",
  description: "افزودن قانون جدید به وبسایت ایرانیان در ایتالیا",
}

export default function AddRulePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">افزودن قانون جدید</h1>
      <RuleForm />
    </div>
  )
}

