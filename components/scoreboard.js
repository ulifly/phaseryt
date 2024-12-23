export class ScoreBoard {

  constructor(scene) {
    this.relatedScene = scene;
    this.score = 0;
  }

  create() {
    this.scoreText = this.relatedScene.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
  }

  increasePoints(points) {
    this.score += points;
    this.scoreText.setText('Score: ' + this.score);
  }
}
