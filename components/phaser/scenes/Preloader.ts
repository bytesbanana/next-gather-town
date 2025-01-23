import { charcterAssets } from "@/data/game";
import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.setPath("/assets");
    this.load.image("tiles", "/kenney_rpg-urban-pack/Tilemap/tilemap.png");
    this.load.tilemapTiledJSON(
      "map",
      "kenney_rpg-urban-pack/Tilemap/urban.tmj",
    );

    charcterAssets.forEach(({ key, url }) => {
      this.load.spritesheet(key, url, {
        frameWidth: 20,
        frameHeight: 32,
      });
    });
  }

  create() {
    this.scene.start("game");
  }
}
