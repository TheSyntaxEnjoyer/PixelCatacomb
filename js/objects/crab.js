export default class Crab extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, key, frame, options) {
        super(scene.matter.world, x, y, key, frame, options);
        scene.add.existing(this);
        this.body.label = key;
        scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers(key, {start: 1, end: 2}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers(key, {start: 3, end: 4}),
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