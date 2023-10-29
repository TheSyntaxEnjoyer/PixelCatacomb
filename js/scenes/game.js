// Import Gameobjects
import Player from "../objects/player.js";
import Enemy from "../objects/enemy.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }

    create() {
        // Debug
        this.debugGraphics = this.add.graphics();
        this.showCollidingTiles = true;
        this.showFaces = true;
        this.showTiles = true;

        // Add Tilemap
        this.map = this.make.tilemap({ key: "test-world" });
        this.tileset = this.map.addTilesetImage("world-transparent", "tileset");

        this.layers = {
            ground: this.map.createDynamicLayer("ground", this.tileset, 0, 0),
            obstacles: this.map.createDynamicLayer(
                "obstacles",
                this.tileset,
                0,
                0
            ),
            functions: this.map.getObjectLayer("functions"),
        };

        // Add Sprites
        // Sprite Shapes
        this.shapes = {
            player: [
                { x: 14, y: 53 },
                { x: 14, y: 64 },
                { x: 2, y: 64 },
                { x: 2, y: 53 },
            ],
            enemy: [
                { x: 14, y: 53 },
                { x: 14, y: 64 },
                { x: 2, y: 64 },
                { x: 2, y: 53 },
            ],
        };
        // Player
        this.player = new Player(this, 40, 0, "player", {
            shape: { type: "fromVerts", verts: this.shapes.player },
            render: {
                sprite: {
                    xOffset: 0,
                    yOffset: 0.2,
                },
            },
        });

        // Tile Objects
        // Create group for enemies
        this.enemies = this.add.group();
        this.layers.functions.objects.forEach((obj, id) => {
            // Enemy(scene, x, y, label, name, options, frame)
            // The `obj.properties[1].value + id` will be the one we will look for in collisions, aka "label".
            // While the name will be the reference for the sprite's image key.
            let e = new Enemy(this, obj.x, obj.y, obj.properties[1].value + id, obj.properties[1].value, {
                shape: { type: "fromVerts", verts: this.shapes.enemy },
                render: {
                    sprite: {
                        xOffset: 0,
                        yOffset: 0.2,
                    },
                },
            });
            e.setData(obj.properties);
            this.enemies.add(e);
        });

        // Physics
        // Tilemap Physics
        this.layers.ground.setCollisionByProperty({ collides: true });
        this.layers.obstacles.setCollisionByProperty({ collides: true });

        this.layers.ground.setCollisionBetween(1, 999);
        this.layers.obstacles.setCollisionBetween(1, 999);

        this.matter.world.convertTilemapLayer(this.layers.ground, {
            label: "ground",
        });
        this.matter.world.convertTilemapLayer(this.layers.obstacles, {
            label: "obstacles",
        });

        // Collision Logic
        this.matter.world.on("collisionactive", (e, a, b) => {
            // Check if player is touching the ground
            if (
                e.pairs.some(
                    (pair) =>
                        pair.bodyA.label == "player" &&
                        pair.bodyB.label == "ground"
                )
            ) {
                this.playerOnGround = true;
            }

            // Check if player touches an obstacle
            if (
                e.pairs.some(
                    (pair) =>
                        pair.bodyA.label == "player" &&
                        pair.bodyB.label == "obstacles"
                )
            ) {
                this.gameover();
            }

            // Check if player touches an enemy
            this.enemies.children.entries.forEach((enemy, id) => {
                if (
                    e.pairs.some(
                        (pair) =>
                            pair.bodyA.label == "player" &&
                            pair.bodyB.label == enemy.name
                    )
                ) {
                    if (this.player.y < enemy.y - enemy.height / 2) {
                        this.player.setVelocity(0, -7);
                        enemy.destroy();
                    } else {
                        this.gameover();
                    }
                }
            });
        });

        // Misc
        // Keyboard Input Object
        this.keys = this.input.keyboard.addKeys({
            jump: "SPACE",
            left: "A",
            right: "D",
        });

        // Camera
        this.cameras.main.setBounds(0, 0, this.width, this.height, true);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoom = 4;
        this.cameras.main.setLerp(1, 0);

        // Add world bounds
        this.matter.world.setBounds(0, 0, this.scale.width, this.scale.height);

        // Misc Variables

        // Debug
        console.log(
            this.enemies.children.entries[0]
        );
    }

    update() {
        // Misc variables that need to be updated every tick
        this.player.setRotation(0);
        this.enemies.children.entries.forEach((e) => {
            e.setRotation(0);
        });

        // Movement
        if (this.keys.right.isDown) {
            this.player.flipX = false;
            this.player.anims.play("walk", true);
            // this.player.x += 5;
            this.player.setVelocityX(2);
        } else if (this.keys.left.isDown) {
            this.player.flipX = true;
            this.player.anims.play("walk", true);
            // this.player.x -= 5;
            this.player.setVelocityX(-2);
        } else {
            this.player.anims.stop();
            this.player.anims.play("idle");
            // this.player.setVelocity(0, 0);
        }

        // The jump mechanism is seperated from the if chain, and we used .on('down') because unlike the other movements, we only need to trigger the animation once.
        this.keys.jump.on("down", () => {
            if (this.playerOnGround) {
                this.player.anims.play("jump", true);
                this.player.setVelocity(0, -7);
                this.playerOnGround = false;
            }
        });
    }

    gameover() {
        this.scene.pause();
        setTimeout(() => {
            this.scene.start("game-over");
        }, 1000);
    }
}
