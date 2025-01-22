import { auth } from "@/auth";
import JoinRoomForm from "@/components/form/JoinRoomForm";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Params = Promise<{ roomId: string }>;

const JoinRoom = async ({ params }: { params: Params }) => {
  const { roomId } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  const user = await db
    .select({
      username: users.username,
      character: users.character,
    })
    .from(users)
    .where(eq(users.email, session.user.email!));
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto flex h-[calc(100vh-65px)] w-screen items-center justify-center p-8">
      {user[0] && <JoinRoomForm roomId={+roomId} user={user[0]} />}
    </div>
  );
};

export default JoinRoom;
