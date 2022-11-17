function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  healthSphere.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }
  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.switchSprite("run");
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.switchSprite("run");
    enemy.velocity.x = 5;
  } else {
    enemy.switchSprite("idle");
  }
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }
  //attack collision detection
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 1
  ) {
    enemy.takeHit();
    player.isAttacking = false;
    document.querySelector("#player2Health").style.width = enemy.health + "%";
  }
  // in case of miss
  if (player.isAttacking && player.framesCurrent === 1) {
    player.isAttacking = false;
  }
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 1
  ) {
    player.takeHit();
    enemy.isAttacking = false;
    document.querySelector("#player1Health").style.width = player.health + "%";
  }
  // in case of miss
  if (enemy.isAttacking && enemy.framesCurrent === 1) {
    enemy.isAttacking = false;
  }
  if (enemy.health <= 0 || player.health <= 0) {
    determinedWinner({ player, enemy, timerId });
  }
}
function determinedWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#winnerIs").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#winnerIs").innerHTML = "Tie!!!";
  } else if (player.health > enemy.health) {
    document.querySelector("#winnerIs").innerHTML = "Player1 Won!";
  } else if (player.health < enemy.health) {
    document.querySelector("#winnerIs").innerHTML = "Player2 Won!";
  }
}
let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) determinedWinner({ player, enemy, timerId });
}
