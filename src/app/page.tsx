import { authOptions } from "@/auth";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { ChevronRight, ChevronUpCircle, Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession(authOptions)

    // console.log(session?.user.email)
  return (
    <main className="flex justify-center items-center">
      <h1 className="text-2xl"> Hello ,{session?.user.username}</h1>
    </main>
  );
}
