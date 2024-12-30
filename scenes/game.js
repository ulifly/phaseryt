import { ScoreBoard } from "../components/scoreboard.js";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  init() {
    this.scoreboard = new ScoreBoard(this);
  }

  preload() {
    // images
    this.load.image('background', 'assets/img/background.jpg');
    this.load.image('platform', 'assets/img/platform.png');
    this.load.image('ball', 'assets/img/ball.png');
    this.load.image('blueBrick', 'assets/img/brickBlue.png');
    this.load.image('blackBrick', 'assets/img/brickBlack.png');
    this.load.image('greenBrick', 'assets/img/brickGreen.png');
    this.load.image('orangeBrick', 'assets/img/brickOrange.png');
    this.load.image('congrats', 'assets/img/congratulations.png');

    //audios
    this.load.audio('gameOverSample', 'assets/sounds/gameover.mp3');
    this.load.audio('brickImpactSample', 'assets/sounds/brick-impact.ogg');
    this.load.audio('platformImpactSample', 'assets/sounds/platform-impact.ogg')
    this.load.audio('startGameSample', 'assets/sounds/start-game.ogg');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    const { width, height } = this.sys.game.config;//mover a la configuración del juego
    const background = this.add.image(width / 2, height / 2, 'background');
    background.setDisplaySize(width, height);

    this.scoreboard.create();

    this.bricks = this.physics.add.staticGroup({
      key: ['blackBrick', 'blueBrick', 'greenBrick', 'orangeBrick'],
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

    this.congratsImage = this.add.image(width / 2, height / 2, 'congrats');
    this.congratsImage.visible = false;

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

    //input
    this.cursors = this.input.keyboard.createCursorKeys();

    //sounds
    this.gameOverSound = this.sound.add('gameOverSample');
    this.brickImpactSound = this.sound.add('brickImpactSample');
    this.platformImpactSound = this.sound.add('platformImpactSample');

  }

  hitPlatform(platform, ball) {
    let relativeImpact = ball.x - platform.x;
    this.platformImpactSound.play();
    if (relativeImpact < 0.5 && relativeImpact > -0.5) {
      ball.setVelocityX(Phaser.Math.Between(-10, 10));
    } else {
      ball.setVelocityX(ball.body.velocity.x + relativeImpact * 10);
    }
  }

  bricksHit(ball, brick) {
    this.brickImpactSound.play();
    brick.disableBody(true, true);
    this.scoreboard.increasePoints(20);
    if (this.bricks.countActive() === 30) {
      this.scene.start('Congrats');
    }
  }


  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-600);
      if (this.ball.getData('glued')) {
        this.ball.setVelocityX(-600);
      }
    } else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(600);
      if (this.ball.getData('glued')) {
        this.ball.setVelocityX(600);
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
      this.gameOverSound.play();
      this.scene.start('GameOver');
    }

  }
}