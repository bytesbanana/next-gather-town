import { ChatRoomCard } from "@/components/card/ChatRoomCard";
import { db } from "@/db/db";
import { rooms } from "@/db/schema";

export default async function Home() {
  const chatRooms = await db
    .select({
      id: rooms.id,
      name: rooms.name,
    })
    .from(rooms);

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
