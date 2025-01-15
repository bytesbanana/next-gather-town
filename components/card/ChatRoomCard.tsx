import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { ChatRoom } from "@/data/chatRooms";
import Link from "next/link";

interface ChatRoomCardProps {
  room: ChatRoom;
}

export function ChatRoomCard({ room }: ChatRoomCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users size={20} />
          <span>
            {room.participants} / {room.maxParticipants}
          </span>
        </div>
        <Button asChild>
          <Link href={`/room/${room.id}/join`}>Join Room</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
