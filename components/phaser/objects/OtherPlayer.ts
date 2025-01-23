import { DEFAULT_CHARACTER, PLAYER_VELOCITY } from "@/lib/constants";
import createPlayerAnimations, { ANIMATIONS } from "../anims/Player";
import { NameTag } from "./NameTag";
import { Scene } from "phaser";

export class OtherPlayer extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    protected options: {
      x: number;
      y: number;
      name: string;
      texture: string;
    },
    private nameTag?: NameTag,
  ) {
    const { x, y } = options;
    super(scene, x, y, options.texture || DEFAULT_CHARACTER);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setCollideWorldBounds(true);

    this.nameTag = new NameTag(this.scene, x, y, this.options.name);
    createPlayerAnimations(this.anims, this.texture.key);
  }

  public static build(
    scene: Scene,
    {
      x,
      y,
      name,
      character,
    }: {
      x: number;
      y: number;
      name: string;
      character: string;
    },
  ) {
    return new OtherPlayer(scene, {
      x,
      y,
      name,
      texture: character,
    });
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.nameTag?.update({ x: this.x, y: this.y });
  }

  destroy(fromScene?: boolean): void {
    super.destroy(fromScene);
    this.nameTag?.destroy(fromScene);
  }

  public moveToNewLocation(x: number, y: number) {
    const movingLeft = this.x > x;
    const movingRight = this.x < x;
    const movingUp = this.y > y;
    const movingDown = this.y < y;

    if (movingLeft) {
      this.play(ANIMATIONS.left, true);
      this.setVelocityX(-PLAYER_VELOCITY);
    } else if (movingRight) {
      this.play(ANIMATIONS.right, true);
      this.setVelocityX(PLAYER_VELOCITY);
    } else {
      this.setVelocityX(0);
    }

    if (movingUp) {
      if (!movingLeft && !movingRight) {
        this.play(ANIMATIONS.up, true);
      }
      this.setVelocityY(-PLAYER_VELOCITY);
    } else if (movingDown) {
      if (!movingLeft && !movingRight) {
        this.play(ANIMATIONS.down, true);
      }
      this.setVelocityY(PLAYER_VELOCITY);
    } else {
      this.setVelocityY(0);
    }

    if (!movingLeft && !movingRight && !movingUp && !movingDown) {
      this.anims.pause();
    }
  }
}
