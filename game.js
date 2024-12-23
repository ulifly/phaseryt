import { ScoreBoard } from "./components/scoreboard.js";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  init() {
    this.scoreboard = new ScoreBoard(this);
  }

  preload() {
    this.load.image('background', 'assets/img/background.jpg');
    this.load.image('gameover', 'assets/img/gameover.png');
    this.load.image('platform', 'assets/img/platform.png');
    this.load.image('ball', 'assets/img/ball.png');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    const { width, height } = this.sys.game.config;
    const background = this.add.image(width / 2, height / 2, 'background');
    background.setDisplaySize(width, height);
    this.gameOverImage = this.add.image(width / 2, height / 2, 'gameover');
    this.gameOverImage.visible = false;

    this.scoreboard.create();

    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);

    this.ball = this.physics.add.image(400, 30, 'ball');
    this.ball.setCollideWorldBounds(true);

    let velocity = 100 * Phaser.Math.Between(1.3, 2);

    if (Phaser.Math.Between(0, 10) > 5) {
      velocity = 0 - velocity;
    }

    this.ball.setVelocity(velocity, 10);

    this.physics.add.collider(this.platform, this.ball, this.hitPlatform, null, this);

    this.ball.setBounce(1);

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  hitPlatform(platform, ball) {
    this.scoreboard.increasePoints(10);
    let relativeImpact = ball.x - platform.x;
    if (relativeImpact < 0.5 && relativeImpact > -0.5) {
      ball.setVelocityX(Phaser.Math.Between(-10, 10));
    } else {
      ball.setVelocityX(ball.body.velocity.x + relativeImpact * 10);
    }
  }


  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
    } else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
    } else {
      this.platform.setVelocityX(0);
    }

    if (this.ball.y > 500) {
      this.gameOverImage.visible = true;
      this.physics.pause();
    }

  }
}