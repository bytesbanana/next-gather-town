import { Button } from "@/components/ui/button";

import JoinRoomForm from "@/components/form/JoinRoomForm";

type Params = Promise<{ roomId: string }>;

const JoinRoom = async ({ params }: { params: Params }) => {
  const { roomId } = await params;

  return (
    <div className="container mx-auto flex h-screen w-screen items-center justify-center p-8">
      <div className="absolute left-4 top-4 p-4 transition hover:scale-110 hover:cursor-pointer">
        <Button asChild></Button>
      </div>
      <JoinRoomForm roomId={roomId} />
    </div>
  );
};

export default JoinRoom;
