import Phaser from 'phaser';

// import logoImg from './assets/logo.png';

import TemplateScene from './Scenes/TemplateScene.mjs';

/*  window.game =  */ new Phaser.Game({
    // type: Phaser.WEBGL,
    pixelArt: true,
    backgroundColor: '#320822',
    disableContextMenu: true,
    parent: 'phaser-example',
    scale:
    {
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.NONE,
        width: 256,
        height: 200,
        zoom: 3
    },
    scene: TemplateScene
});
