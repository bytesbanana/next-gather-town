import { Scene } from "phaser";

import { Player } from "../objects/Player";
import { OtherPlayer } from "../objects/OtherPlayer";
import { socket } from "@/lib/socket";

export class Game extends Scene {
  constructor(
    private currentPlayer: Player,
    private otherPlayers: Record<string, OtherPlayer>,
    private frameTime: number = 0,
    private lastLocation: { x: number; y: number },
  ) {
    super("game");
    this.otherPlayers = {};
  }

  create() {
    this.createMap();
    this.currentPlayer = Player.build(this, {
      x: 100,
      y: 100,
      name: "player",
      character: "player000",
    });
    this.lastLocation = { x: this.currentPlayer.x, y: this.currentPlayer.y };
  }

  update(time: number, delta: number): void {
    this.frameTime += delta;

    if (this.frameTime > 120) {
      this.frameTime = 0;

      const { x, y } = this.currentPlayer;
      if (x !== this.lastLocation.x || y !== this.lastLocation.y) {
        socket.emit("locationUpdate", {
          x: x,
          y: y,
        });
        this.lastLocation = { x, y };
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
