import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import UserAvatar from "./UserAvatar";

async function NavigationMenu() {
  const session = await auth();

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
            {session?.user && (
              <UserAvatar
                imageUrl={session.user.image!}
                name={session.user.name!}
              />
            )}
            {!session?.user && (
              <Button asChild>
                <Link href={"/auth/signin"}>Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;
