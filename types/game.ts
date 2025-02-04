export type Rooms = {
  [key: string]: {
    players: {
      [key: string]: Player;
    };
    messages: Array<Message>;
  };
};

type Player = {
  x: number;
  y: number;
  userId: string;
  username: string;
  character: string;
};

type Message = {
  message: string;
  userId: string;
  timestamp: string;
};
