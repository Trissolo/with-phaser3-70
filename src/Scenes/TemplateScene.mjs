import Phaser from "phaser";

export default class TemplateScene extends Phaser.Scene
{
    constructor()
    {
        super({
              key: 'TemplateScene',
              active: false,
              visible: false,
              plugins: [
                'Clock',  //this.time
                //'DataManagerPlugin',  //this.data
                'InputPlugin',  //this.input
                'Loader',  //this.load
                //'TweenManager',  //this.tweens
                //'LightsPlugin'  //this.lights
                ],
              cameras:
              {
                // height: 128,
                // width: 30,
                backgroundColor: "#225"
              }
            });
    }

    init()
    {
        console.log('init', this.sys.settings.key);

        this.events.once('create', () => {
            
            console.log("on create evt", this.sys.settings.key, this.scene.getStatus(this));
            // this.scene.sleep(this);
            
        });
    }

    preload()
    {
        console.log('preload', this.sys.settings.key);
    }

    create()
    {
        console.log('create', this.scene.key);

    }
}  // end Scene Class
