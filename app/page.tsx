import { ChatRoomCard } from "../components/card/chat-room-card";
import { chatRooms } from "@/data/chatRooms";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Available Chat Rooms</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chatRooms.map((room) => (
          <ChatRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
