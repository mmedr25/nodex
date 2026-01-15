import { redirect } from "next/navigation"

function HomePage() {
  return (
    redirect("/workflows")
  )
}

export default HomePage