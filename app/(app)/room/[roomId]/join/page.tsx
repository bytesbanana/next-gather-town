import JoinRoomForm from "@/components/form/JoinRoomForm";

type Params = Promise<{ roomId: string }>;

const JoinRoom = async ({ params }: { params: Params }) => {
  const { roomId } = await params;

  return (
    <div className="container mx-auto flex h-[calc(100vh-65px)] w-screen items-center justify-center p-8">
      <JoinRoomForm roomId={roomId} />
    </div>
  );
};

export default JoinRoom;
