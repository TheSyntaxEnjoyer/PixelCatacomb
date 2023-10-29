export default class Enemy extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, label, name, options, frame) {
        super(scene.matter.world, x, y, name, frame, options);
        scene.add.existing(this);
        this.body.label = label;
        this.name = label;

        scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers(name, {start: 1, end: 2}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers(name, {start: 3, end: 4}),
            frameRate: 10,
            repeat: 0
        })

        scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(name, {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
        })
    }
}