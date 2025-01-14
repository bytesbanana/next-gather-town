import Link from "next/link";
import { Button } from "@/components/ui/button";

function NavigationMenu() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              ChatRooms
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button>Sign In</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;
