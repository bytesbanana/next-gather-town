import { Scene } from "phaser";

import { Player } from "../objects/Player";
import { OtherPlayer } from "../objects/OtherPlayer";

export class Game extends Scene {
  constructor(
    private currentPlayer: Player,
    private otherPlayers: Record<string, OtherPlayer>,
    private frameTime: number = 0,
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
