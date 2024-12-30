export class RestartButton {

  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet('buttonR', '../assets/img/restart.png', {
      frameWidth: 190,
      frameHeight: 49
    });
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(400, 350, 'buttonR').setInteractive();
    this.startGameSound = this.relatedScene.sound.add('startGameSample');

    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });


    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    })

    this.startButton.on('pointerdown', () => {
      this.startGameSound.play();
      this.relatedScene.scene.start('Game');
    })

  }
}