import { CHARACTERS } from "@/lib/constants";
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

    CHARACTERS.forEach(({ key, url }) => {
      this.load.spritesheet(key, url, {
        frameWidth: 20,
        frameHeight: 32,
      });
    });
  }
  create(params: Record<string, unknown>) {
    this.scene.start("game", { ...params });
  }
}
