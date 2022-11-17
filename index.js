const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background3.jpg",
});

const healthSphere = new Sprite({
  position: {
    x: 250,
    y: 300,
  },
  imageSrc: "./img/Sprite-health-of6.png",
  scale: 0.5,
  framesMax: 6,
});

const player = new Fighter({
  imageSrc: "./img/player1_idle2-export.png",
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  scale: 1,
  framesMax: 4,
  offset: {
    x: 50,
    y: 10,
  },
  sprites: {
    idle: {
      imageSrc: "./img/player1_idle5.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/player1_run-export.png",
      framesMax: 4,
    },
    jump: {
      imageSrc: "./img/player1_jump6-fix1.png",
      framesMax: 3,
    },
    fall: {
      imageSrc: "./img/player1_fall2.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/player1_atck2_str-fix2.png",
      framesMax: 3,
    },
    attack2: {
      imageSrc: "./img/player1_atck2-fix3.png",
      framesMax: 3,
    },
    takeHit: {
      imageSrc: "./img/player1_damaged.png",
      framesMax: 2,
    },
    death: {
      imageSrc: "./img/player1_death.png",
      framesMax: 8,
    },
  },
  attackBox: {
    offset: {
      x: 55,
      y: 30,
    },
    width: 60,
    height: 50,
  },
});

const enemy = new Fighter({
  imageSrc: "./img/player2-idle.png",
  position: {
    x: 800,
    y: 300,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "#000",

  offset: {
    x: 0,
    y: 0,
  },

  framesMax: 4,
  scale: 1,
  offset: {
    x: 60,
    y: 10,
  },
  sprites: {
    idle: {
      imageSrc: "./img/player2-idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/player2-run.png",
      framesMax: 4,
    },
    jump: {
      imageSrc: "./img/player2-jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/player2-fall1.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/player2-atck1-fix1.png",
      framesMax: 3,
    },
    attack2: {
      imageSrc: "./img/player2-atck2uncut-fix2.png",
      framesMax: 3,
    },
    takeHit: {
      imageSrc: "./img/player2-damaged.png",
      framesMax: 2,
    },
    death: {
      imageSrc: "./img/player2-death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 50,
      y: 0,
    },
    width: 50,
    height: 50,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

decreaseTimer();

animate();

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    // player keys
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -15;
        player.lastKey = "w";
        break;
      case "e":
        player.attack();
        break;
      case "s":
        player.attack2();
        break;
    }
  }
  if (!enemy.dead) {
    // enemy keys
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -15;
        enemy.lastKey = "ArrowUp";
        break;
      case "ArrowDown":
        enemy.attack();
        break;
      case "0":
        enemy.attack2();
        break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
});
