import { Scene } from "phaser";

import { Player } from "../objects/Player";
import { OtherPlayer } from "../objects/OtherPlayer";
import { socket } from "@/lib/socket";

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
    socket.on(
      "gameUpdate",
      ({
        rooms,
      }: {
        rooms: Record<
          string,
          Record<
            string,
            {
              userId: string;
              x: number;
              y: number;
              username: string;
              character: string;
            }
          >
        >;
      }) => {
        if (!this.myPlayer) {
          const myPlayerData = {
            ...rooms[roomId][userId],
            name: rooms[roomId][userId].username,
          };

          this.myPlayer = Player.build(this, myPlayerData);
        }

        Object.keys(rooms[roomId])
          .filter((id) => id !== userId)
          .forEach((playerId) => {
            const playerData = {
              ...rooms[roomId][playerId],
              name: rooms[roomId][playerId].username,
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
      },
    );
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
