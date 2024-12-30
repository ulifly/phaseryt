import { RestartButton } from '../components/restartButton.js';
export class GameOver extends Phaser.Scene {

  constructor() {
    super({ key: 'GameOver' });
    this.restartButton = new RestartButton(this);
  }
  preload() {
    this.load.image('gameover', 'assets/img/gameover.png');
    this.restartButton.preload();
  }

  create() {
    const { width, height } = this.sys.game.config;
    this.gameOverImage = this.add.image(width / 2, height / 2, 'gameover');
    this.restartButton.create();

  }

}