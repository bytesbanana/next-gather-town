import { Scene } from "phaser";

import { Player } from "../objects/Player";
import { OtherPlayer } from "../objects/OtherPlayer";
import { socket } from "@/lib/socket";
import { EventBus, EVENTS } from "../EventBus";
import { Rooms } from "@/types/game";

export class Game extends Scene {
  constructor(
    private myPlayer: Player,
    private otherPlayers: Record<string, OtherPlayer>,
    private frameTime: number = 0,
  ) {
    super({
      key: "game",
      active: false,
    });
    this.otherPlayers = {};
  }

  create({ roomId, userId }: { roomId: number; userId: string }) {
    this.createMap();
    socket.on("userDisconnected", (userId) => {
      this.otherPlayers[userId].destroy();
      delete this.otherPlayers[userId];
    });
    socket.on("gameUpdate", ({ rooms }: { rooms: Rooms }) => {
      if (!this.myPlayer) {
        const myPlayerData = {
          ...rooms[roomId].players[userId],
          name: rooms[roomId].players[userId].username,
        };

        this.myPlayer = Player.build(this, myPlayerData);
      }

      Object.keys(rooms[roomId].players)
        .filter((id) => id !== userId)
        .forEach((playerId) => {
          const playerData = {
            ...rooms[roomId].players[playerId],
            name: rooms[roomId].players[playerId].username,
          };
          if (!this.otherPlayers[playerData.userId]) {
            this.otherPlayers[playerData.userId] = OtherPlayer.build(
              this,
              playerData,
            );
          } else {
            this.otherPlayers[playerData.userId].moveToNewLocation(
              playerData.x,
              playerData.y,
            );
          }
        });
    });

    this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        EventBus.emit(EVENTS.onChatFocus);
      }
    });
  }

  update(time: number, delta: number): void {
    this.frameTime += delta;

    if (this.frameTime > 60) {
      this.frameTime = 0;

      if (this.myPlayer) {
        const { x, y } = this.myPlayer;

        socket.emit("locationUpdate", {
          x: x,
          y: y,
        });
      }
    }
  }

  createMap() {
    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage("tilemap", "tiles");
    map.createLayer("ground_layer", tiles!);
    map.createLayer("fake_layer", tiles!);
    const obstrucleLayer = map.createLayer("obs_layer", tiles!);
    obstrucleLayer?.setCollisionByProperty({ collides: true });
  }
}
