import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { ChevronRight, ChevronUpCircle, Loader2 } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Button variant="outline" size="icon">
      <Loader2 className="animate-spin"></Loader2>
      </Button>
      <p className={" text-5xl "} > Mahmoud</p>
      
      <ModeToggle></ModeToggle>
    </main>
  );
}
