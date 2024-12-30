import { RestartButton } from '../components/restartButton.js';

export class Congrats extends Phaser.Scene {

  constructor() {
    super({ key: 'Congrats' });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('congrats', 'assets/img/congratulations.png');
    this.restartButton.preload();
  }

  create() {
    const { width, height } = this.sys.game.config;
    this.congratsImage = this.add.image(width / 2, height / 2, 'congrats');
    this.restartButton.create();
  }

}