export const MAX_USERS_IN_ROOM = 8;

export const CHARACTERS = new Array(40).fill({}).map((_, index) => ({
  key: `player${String(index).padStart(3, "0")}`,
  url: `/characters/${String(index).padStart(3, "0")}.png`,
}));

export const PLAYER_VELOCITY = 160;

export const DEFAULT_CHARACTER = "player000";
