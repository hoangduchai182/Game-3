import { Particle } from './particle.js';

export class Firefly extends Particle {
  update(deltaTime) {
    this.angle += this.va;
    this.collisionX += Math.cos(this.angle) * this.speedX;
    this.collisionY -= this.speedY;
    if (this.collisionX < 0 - this.radius) {
      this.markForDeletion = true;
      this.game.removeGameObjects();
    }
  }
}

export class Spark extends Particle {
  update(deltaTime) {
    this.angle += this.va * 0.5;
    this.collisionX -= Math.sin(this.angle) * this.speedX;
    this.collisionY -= Math.cos(this.angle) * this.speedY;
    if (this.radius > 0.1) this.radius -= 0.05;
    if (this.radius < 0.2) {
      this.markForDeletion = true;
      this.game.removeGameObjects();
    }
  }
}
