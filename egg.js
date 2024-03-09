export class Egg {
  constructor(game) {
    this.game = game;
    this.collisionRadius = 40;
    this.margin = this.collisionRadius * 2;
    this.collisionX =
      this.margin + Math.random() * (this.game.width - this.margin * 2);
    this.collisionY =
      this.game.topMargin +
      Math.random() * (this.game.height - this.game.topMargin - this.margin);
    this.image = document.getElementById('egg');
    this.spriteWidth = 110;
    this.spriteHeight = 135;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.spriteX;
    this.spriteY;
    this.hatchTimer = 0;
    this.hatchInterval = 5000;
    this.markForDeletion = true;
  }
  draw(context) {
    context.drawImage(this.image, this.spriteX, this.spriteY);
    if (this.game.debug) {
      context.beginPath();
      context.arc(
        this.collisionX,
        this.collisionY,
        this.collisionRadius,
        0,
        Math.PI * 2
      );
      context.save();
      context.globalAlpha = 0.5;
      context.fill();
      context.restore();
      context.stroke();
      const displayTImer = this.hatchTimer.toFixed(0);
      context.fillText(
        displayTImer,
        this.collisionX,
        this.collisionY - this.collisionRadius * 2
      );
    }
  }

  update(deltaTime) {
    this.spriteX = this.collisionX - this.width * 0.5;
    this.spriteY = this.collisionY - this.height * 0.5 - 30;

    // coliision
    let collisionObject = [
      this.game.player,
      ...this.game.obstacles,
      ...this.game.enemies,
    ];
    collisionObject.forEach(object => {
      let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(
        this,
        object
      );
      if (collision) {
        const unit_x = dx / distance;
        const unit_y = dy / distance;
        this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
        this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
      }
    });

    //hatching
    if (this.hatchTimer > this.hatchInterval) {
      this.markForDeletion = true;
      this.game.removeGameObjects();
    } else {
      this.hatchTimer += deltaTime;
    }
  }
}
