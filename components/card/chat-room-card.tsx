import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { ChatRoom } from "@/data/chatRooms";

interface ChatRoomCardProps {
  room: ChatRoom;
}

export function ChatRoomCard({ room }: ChatRoomCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users size={20} />
          <span>
            {room.participants} / {room.maxParticipants}
          </span>
        </div>
        <Button>Join Room</Button>
      </CardContent>
    </Card>
  );
}
