export const charcterAssets = new Array(40).fill({}).map((_, index) => ({
  key: `player${String(index).padStart(3, "0")}`,
  url: `/characters/${String(index).padStart(3, "0")}.png`,
}));
