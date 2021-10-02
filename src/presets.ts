export default class Presets {
  static blinker = {
    width: 5,
    height: 5,
    delay: 250,
    seedlings: [
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  };

  static seedlings = [
    [4, 5],
    [5, 6],
    [5, 7],
    [4, 7],
    [6, 7],
  ];

  static block = {
    width: 4,
    height: 4,
    delay: 250,
    seedlings: [
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ],
  };

  static glider = {
    width: 20,
    height: 20,
    delay: 250,
    seedlings: [
      [2, 1],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
  };
}
