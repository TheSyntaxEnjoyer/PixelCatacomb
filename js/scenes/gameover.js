export default class GameOver extends Phaser.Scene {
    constructor() {
        super('game-over');
    }

    create() {
        this.add.text(50, 50, 'You Died!', {
            fontFamily: 'Comic Sans',
            fontSize: '32px',
            fill: '#ffffff'
        });
    }
}