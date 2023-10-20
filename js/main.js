import Game from './scenes/game.js';
import Preload from './scenes/preload.js';
import GameOver from './scenes/gameover.js';

export default new Phaser.Game({
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    backgroundColor: 0x303030,
    physics: {
        default: "matter",
        matter: {
            debug: true
        },
    },
    pixelArt: true,
    scene: [Preload, Game, GameOver]
});