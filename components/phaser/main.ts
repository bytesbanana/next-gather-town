import * as Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "phaser-container",
  scene: [Preloader],
};

const StartGame = () => {
  return new Phaser.Game({ ...config });
};

export default StartGame;
