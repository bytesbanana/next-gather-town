import { auth } from "@/auth";
import JoinRoomForm from "@/components/form/JoinRoomForm";
import { redirect } from "next/navigation";

type Params = Promise<{ roomId: string }>;

const JoinRoom = async ({ params }: { params: Params }) => {
  const { roomId } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto flex h-[calc(100vh-65px)] w-screen items-center justify-center p-8">
      <JoinRoomForm roomId={+roomId} user={session.user} />
    </div>
  );
};

export default JoinRoom;
