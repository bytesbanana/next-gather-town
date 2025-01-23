export const ANIMATIONS = {
  down: "player_walk_down",
  left: "player_walk_left",
  right: "player_walk_right",
  up: "player_walk_up",
};

const animations = (
  anims: Phaser.Animations.AnimationState,
  textureKey: string,
) => {
  anims.create({
    key: ANIMATIONS.down,
    frames: anims.generateFrameNames(textureKey, {
      frames: [0, 1, 2],
    }),
    frameRate: 5,
    repeat: -1,
  });
  anims.create({
    key: ANIMATIONS.left,
    frames: anims.generateFrameNames(textureKey, {
      frames: [3, 4, 5],
    }),
    frameRate: 5,
    repeat: -1,
  });
  anims.create({
    key: ANIMATIONS.right,
    frames: anims.generateFrameNames(textureKey, {
      frames: [6, 7, 8],
    }),
    frameRate: 5,
    repeat: -1,
  });

  anims.create({
    key: ANIMATIONS.up,
    frames: anims.generateFrameNames(textureKey, {
      frames: [9, 10, 11],
    }),
    frameRate: 5,
    repeat: -1,
  });
};

export default animations;
