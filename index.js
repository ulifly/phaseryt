import { Game } from './scenes/game.js';
import { GameOver } from './scenes/gameOver.js';
import { Congrats } from './scenes/congrats.js';


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [Game, GameOver, Congrats],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

const game = new Phaser.Game(config);