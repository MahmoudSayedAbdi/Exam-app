import { authOptions } from "@/auth";
import HomeComponents from "@/components/HomeComponents";
// import { ModeToggle } from "@/components/ui/theme-toggle";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession(authOptions)

  // console.log(session?.user.email)
  return (
    <main className="flex justify-center items-center min-h-screen p-24">
      <HomeComponents/>
    </main>
  );
}
