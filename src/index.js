import Phaser from 'phaser';
import logoImg from './assets/logo.png';

import TemplateScene from './Scenes/TemplateScene.mjs';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        //  This is an example of a bundled image:
        this.load.image('logo', logoImg);

        //  This is an example of loading a static image from the public folder:
        this.load.image('background', 'assets/bg.jpg');

        this.load.image('bitsy', 'assets/nonpermanent/bitsy-6x8.png')
    }
      
    create ()
    {
        this.add.image(8, 8, 'bitsy').setOrigin(0);

        this.add.image(11, 12, 'logo').setOrigin(0);
      
        this.scene.launch('TemplateScene');

    }
}

const config = {
    // type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: '#320822',
    disableContextMenu: true,
    parent: 'phaser-example',
    scale:
    {
        mode: Phaser.Scale.NONE,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 256,
        height: 200,
        zoom: 3
    },
    scene: [MyGame, TemplateScene]
};

const game = new Phaser.Game(config);
