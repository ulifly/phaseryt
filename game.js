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
    this.load.image('blueBrick', 'assets/img/brickBlue.png');
    this.load.image('blackBrick', 'assets/img/brickBlack.png');
    this.load.image('greenBrick', 'assets/img/brickGreen.png');
    this.load.image('orangeBrick', 'assets/img/brickOrange.png');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    const { width, height } = this.sys.game.config;
    const background = this.add.image(width / 2, height / 2, 'background');
    background.setDisplaySize(width, height);
    
    this.scoreboard.create();
    
    this.bricks = this.physics.add.staticGroup({
      key: ['blackBrick', 'blueBrick',  'greenBrick', 'orangeBrick'],
      frameQuantity: 10,
      gridAlign: {
        width: 10,
        height: 4,
        cellWidth: 68,
        cellHeight: 32,
        x: 70,
        y: 100
      }
    });
    
    this.gameOverImage = this.add.image(width / 2, height / 2, 'gameover');
    this.gameOverImage.visible = false;

    // Platform
    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);


    // Ball
    this.ball = this.physics.add.image(400, 440, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setData('glued', true);

    this.physics.add.collider(this.platform, this.ball, this.hitPlatform, null, this);

    this.physics.add.collider(this.bricks, this.ball, this.bricksHit, null, this);

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

  bricksHit(ball, brick) {
    brick.disableBody(true, true);
    this.scoreboard.increasePoints(20);
  }


  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
      if (this.ball.getData('glued')) {
        this.ball.setVelocityX(-500);
      }
    } else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData('glued')) {
        this.ball.setVelocityX(500);
      }
    } else {
      this.platform.setVelocityX(0);
      if (this.ball.getData('glued')) {
        this.ball.setVelocityX(0);
      }
    }

    if (this.cursors.space.isDown) {
      this.ball.setVelocityY(-300);
      this.ball.setData('glued', false);
    }

    if (this.ball.y > 500) {
      this.gameOverImage.visible = true;
      this.physics.pause();
    }

  }
}