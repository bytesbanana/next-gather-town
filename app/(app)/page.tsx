import { ChatRoomCard } from "@/components/card/ChatRoomCard";
import { chatRooms } from "@/data/chatRooms";

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="mb-6 text-3xl font-bold">Available Chat Rooms</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chatRooms.map((room) => (
          <ChatRoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
