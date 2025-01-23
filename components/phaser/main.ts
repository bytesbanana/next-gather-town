import * as Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/Game";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "phaser-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
        x: 0,
      },
    },
  },
  scene: [Preloader, Game],
};

const StartGame = () => {
  return new Phaser.Game({ ...config });
};

export default StartGame;
