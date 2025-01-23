import { Scene, Types } from "phaser";
import { DEFAULT_CHARACTER, PLAYER_VELOCITY } from "@/lib/constants";
import createPlayerAnimations, { ANIMATIONS } from "../anims/Player";
import { NameTag } from "./NameTag";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    protected options: {
      x: number;
      y: number;
      name: string;
      texture: string;
    },
    private nameTag?: NameTag,
    private cursors?: Types.Input.Keyboard.CursorKeys,
    private arrow?: Phaser.GameObjects.Triangle,
  ) {
    super(scene, options.x, options.y, options.texture || DEFAULT_CHARACTER);
    const [x, y] = [this.x, this.y];
    const triangleParams = [-10, 0, 10, 0, 0, 10];
    this.arrow = this.scene.add.triangle(0, 0, ...triangleParams, 0x00ca00, 1);
    this.nameTag = new NameTag(this.scene, x, y, this.options.name);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    createPlayerAnimations(this.anims, this.texture.key);

    this.play(ANIMATIONS.down);

    if (this.scene.input.keyboard) {
      this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
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
    return new Player(scene, {
      x,
      y,
      name,
      texture: character,
    });
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    this.movePlayerManager();

    this.arrow?.setX(this.x + this.width / 2);
    this.arrow?.setY(this.y - this.height);
    this.nameTag?.update({
      x: this.x,
      y: this.y,
    });
  }
  destroy(fromScene?: boolean): void {
    this.arrow?.destroy();
    this.nameTag?.destroy();
    super.destroy(fromScene);
  }

  private movePlayerManager(): void {
    if (!this.cursors) return;
    const { left, right, up, down } = this.cursors;

    if (left.isDown) {
      this.setVelocityX(-PLAYER_VELOCITY);
      this.play(ANIMATIONS.left, true);
    } else if (right.isDown) {
      this.setVelocityX(PLAYER_VELOCITY);
      this.play(ANIMATIONS.right, true);
    } else {
      this.setVelocityX(0);
    }
    if (up.isDown) {
      this.setVelocityY(-PLAYER_VELOCITY);
      if (!left.isDown && !right.isDown) {
        this.play(ANIMATIONS.up, true);
      }
    } else if (down.isDown) {
      this.setVelocityY(PLAYER_VELOCITY);
      if (!left.isDown && !right.isDown) {
        this.play(ANIMATIONS.down, true);
      }
    } else {
      this.setVelocityY(0);
    }

    if (
      !left.isDown &&
      !right.isDown &&
      !up.isDown &&
      !down.isDown &&
      this.anims.isPlaying
    ) {
      this.anims.pause();
    }
  }
}
