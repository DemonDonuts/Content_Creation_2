var playerData = {
  info: {
    src: `images/seela.png`,
    "no_antialiasing": true,
    "flip_x": true
  },
  states: {
    idle: {
      fps: 1,
      cycle: true,
      frames: [
        { startX: 6237, startY: 1478, width: 560, height: 1470, offsetX: -269, offsetY: -18, fullWidth: 1080, fullHeight: 1520 },
        { startX: 6237, startY: 1478, width: 560, height: 1470, offsetX: -269, offsetY: -18, fullWidth: 1080, fullHeight: 1520 },
        { startX: 0, startY: 4448, width: 587, height: 1443, offsetX: -255, offsetY: -45, fullWidth: 1080, fullHeight: 1520 },
        { startX: 0, startY: 4448, width: 587, height: 1443, offsetX: -255, offsetY: -45, fullWidth: 1080, fullHeight: 1520 },
        { startX: 1338, startY: 2984, width: 605, height: 1423, offsetX: -246, offsetY: -65, fullWidth: 1080, fullHeight: 1520 },
        { startX: 1338, startY: 2984, width: 605, height: 1423, offsetX: -246, offsetY: -65, fullWidth: 1080, fullHeight: 1520 },
        { startX: 0, startY: 4448, width: 587, height: 1443, offsetX: -255, offsetY: -45, fullWidth: 1080, fullHeight: 1520 },
        { startX: 0, startY: 4448, width: 587, height: 1443, offsetX: -255, offsetY: -45, fullWidth: 1080, fullHeight: 1520 },
        { startX: 6237, startY: 2948, width: 539, height: 1483, offsetX: -279, offsetY: -5, fullWidth: 1080, fullHeight: 1520 },
        { startX: 6237, startY: 2948, width: 539, height: 1483, offsetX: -279, offsetY: -5, fullWidth: 1080, fullHeight: 1520 }
      ]
    },

    walk: {
      fps: 1,
      cycle: true,
      frames: [
        { startX: 5623, startY: 2955, width: 605, height: 1478, offsetX: -308, offsetY: -13, fullWidth: 1080, fullHeight: 1520 },
        { startX: 5623, startY: 2955, width: 605, height: 1478, offsetX: -308, offsetY: -13, fullWidth: 1080, fullHeight: 1520 },
        { startX: 5623, startY: 1478, width: 614, height: 1477, offsetX: -299, offsetY: -13, fullWidth: 1080, fullHeight: 1520 },
        { startX: 5623, startY: 1478, width: 614, height: 1477, offsetX: -299, offsetY: -13, fullWidth: 1080, fullHeight: 1520 },
        { startX: 4982, startY: 0, width: 641, height: 1480, offsetX: -266, offsetY: 2, fullWidth: 1080, fullHeight: 1520 },
        { startX: 4982, startY: 0, width: 641, height: 1480, offsetX: -266, offsetY: 2, fullWidth: 1080, fullHeight: 1520 },
        { startX: 0, startY: 2984, width: 670, height: 1464, offsetX: -267, offsetY: -26, fullWidth: 1080, fullHeight: 1520 },
        { startX: 0, startY: 2984, width: 670, height: 1464, offsetX: -267, offsetY: -26, fullWidth: 1080, fullHeight: 1520 },
        { startX: 4290, startY: 0, width: 692, height: 1465, offsetX: -260, offsetY: -25, fullWidth: 1080, fullHeight: 1520 },
        { startX: 4290, startY: 0, width: 692, height: 1465, offsetX: -260, offsetY: -25, fullWidth: 1080, fullHeight: 1520 }
      ]
    },

    jump: {
      fps: 2,
      cycle: false,
      frames: [
        { startX: 1748, startY: 1492, width: 764, height: 1481, offsetX: -123, offsetY: -41, fullWidth: 1080, fullHeight: 1520 },
        { startX: 3563, startY: 0, width: 727, height: 1524, offsetX: -145, offsetY: 2, fullWidth: 1080, fullHeight: 1520 },
        { startX: 3563, startY: 0, width: 727, height: 1524, offsetX: -145, offsetY: 2, fullWidth: 1080, fullHeight: 1520 },
        { startX: 2512, startY: 1492, width: 751, height: 1477, offsetX: -132, offsetY: -45, fullWidth: 1080, fullHeight: 1520 }
      ]
    },

    crouch: {
      fps: 2,
      cycle: true,
      frames: [
        { startX: 587, startY: 4448, width: 698, height: 1192, offsetX: -247, offsetY: -298, fullWidth: 1080, fullHeight: 1520 },
        { startX: 6808, startY: 0, width: 670, height: 1193, offsetX: -261, offsetY: -297, fullWidth: 1080, fullHeight: 1520 },
        { startX: 6808, startY: 0, width: 670, height: 1193, offsetX: -261, offsetY: -297, fullWidth: 1080, fullHeight: 1520 },
        { startX: 1943, startY: 2984, width: 729, height: 1177, offsetX: -230, offsetY: -313, fullWidth: 1080, fullHeight: 1520 }
      ]
    },

    attack: {
      fps: 1,
      cycle: false,
      frames: [
        { startX: 904, startY: 0, width: 893, height: 1492, offsetX: -80, offsetY: -17, fullWidth: 1080, fullHeight: 1520 },
        { startX: 904, startY: 0, width: 893, height: 1492, offsetX: -80, offsetY: -17, fullWidth: 1080, fullHeight: 1520 },
        { startX: 2683, startY: 0, width: 880, height: 1492, offsetX: -89, offsetY: -17, fullWidth: 1080, fullHeight: 1520 },
        { startX: 2683, startY: 0, width: 880, height: 1492, offsetX: -89, offsetY: -17, fullWidth: 1080, fullHeight: 1520 }
      ]
    }
  }
}
