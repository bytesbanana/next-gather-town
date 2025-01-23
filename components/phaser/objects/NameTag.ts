export class NameTag extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
    super(scene, x, y, text, {
      color: "white",
      fontSize: "14px",
    });
    this.setX(x - this.width / 2);
    this.setY(y + 20);
    this.scene.add.existing(this);
  }

  update({ x, y }: { x: number; y: number }): void {
    this.setX(x - this.width / 2);
    this.setY(y + 20);
  }
}
