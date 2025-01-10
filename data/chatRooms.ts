export interface ChatRoom {
  id: string;
  name: string;
  participants: number;
  maxParticipants: number;
}

export const chatRooms: ChatRoom[] = [
  {
    id: "1",
    name: "General 1",
    participants: 0,
    maxParticipants: 8,
  },
  {
    id: "2",
    name: "Tech Talk",
    participants: 0,
    maxParticipants: 8,
  },
  {
    id: "3",
    name: "Book Club",
    participants: 0,
    maxParticipants: 8,
  },
  {
    id: "4",
    name: "Movie Buffs",
    participants: 0,
    maxParticipants: 8,
  },
  {
    id: "5",
    name: "Fitness Fanatics",
    participants: 0,
    maxParticipants: 8,
  },
];
