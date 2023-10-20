export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, key, frame, options) {
        super(scene.matter.world, x, y, key, frame, options);
        scene.add.existing(this);
        this.body.label = 'player';
        scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {start: 8, end: 10}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 5}),
            frameRate: 10,
            repeat: 0
        })

        scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
        })
    }
}