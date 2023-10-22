// Where every asset is preloaded for every scene
export default class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        // images
        this.load.image(
            "tileset",
            "./assets/gfx/tilesets/transparent_packed.png"
        );

        // maps
        this.load.tilemapTiledJSON(
            "test-world",
            "./assets/maps/test-world.json"
        );

        // spritesheets
        this.load.spritesheet(
            "player",
            "./assets/gfx/spritesheets/player.png",
            { frameWidth: 16, frameHeight: 16 }
        );
        this.load.spritesheet("crab", "./assets/gfx/spritesheets/crab.png", {
            frameWidth: 16, frameHeight: 16,
        }),
        this.load.spritesheet("spider", "./assets/gfx/spritesheets/spider.png", {
            frameWidth: 16, frameHeight: 16,
        }),

        // atlas & json
        this.load.json(
            "player_shapes",
            "./assets/gfx/spritesheets/player.atlas.json"
        );

        // sfx

        // Call next scene
        setTimeout(() => this.scene.start("game"), 1000);
    }
}
