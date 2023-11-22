import Phaser from 'phaser';

// import TemplateScene from './Scenes/TemplateScene.mjs';
import WrappedText from './scenes/snippets/WrappedText.mjs';


const config = {
    // type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: '#320822',
    disableContextMenu: true,
    //parent: 'phaser-example',
    scale:
    {
        mode: Phaser.Scale.NONE,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 256,
        height: 200,
        zoom: 3
    },
    scene: WrappedText
};

const game = new Phaser.Game(config);
