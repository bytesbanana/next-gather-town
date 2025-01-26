import * as Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/Game";

const config: Phaser.Types.Core.GameConfig = {
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

const StartGame = ({ roomId, userId }: { roomId: number; userId: string }) => {
  const game = new Phaser.Game({ ...config });
  console.log({ roomId, userId });
  game.scene.start("preloader", { roomId, userId });
  return game;
};

export default StartGame;
