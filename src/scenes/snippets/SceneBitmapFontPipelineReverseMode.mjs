import Phaser from "phaser";

import PipelineReverseMode from "./PipelineReverseMode.mjs";

export default class SceneBitmapFontPipelineReverseMode extends Phaser.Scene
{
    customPipeline;

    constructor()
    {
        super({
              key: 'SceneBitmapFontPipelineReverseMode',
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
            })
    }

    init()
    {
        const gag = new PipelineReverseMode(this.game);
        
        this.renderer.pipelines.add("RevMod", gag);

        gag.set4f("colorA", 1, 0, 0, 1)
        gag.set4f("colorB", 1, 1, 0, 1)

    }

    preload ()
    {
        this.load.bitmapFont('fontwiz', "assets/nonpermanent/font_bianco.png", "assets/nonpermanent/font_bianco.xml")
        // this.load.bitmapFont('fontwiz', "assets/nonpermanent/font_eng.png", "assets/nonpermanent/font_eng.xml")

    }
    
    create ()
    {
        // const testFont = this.cache.bitmapFont.get('fontwiz');//.data.chars;

        // const {chars} = testFont.data;

        const sent = "Orcus\n12,5\nsOugx\nj,Ox\nÈÈÈÈ\nÈOrcus}"; //`${fakeSpace}AMAZE${fakeSpace}THE\nMINOTAUR${fakeSpace}03`

        this.text = this.add.bitmapText(4, 32, 'fontwiz', sent, 8)
        .setOrigin(0)
        .setPipeline('RevMod');

        console.log(this.text.pipeline.name);


        this.input.on('pointerdown', pointer =>
        {
            if (this.text.pipeline === this.text.defaultPipeline)
            {
                this.text.setPipeline('RevMod');

                this.text.pipeline.set4f('colorA', Math.random(), Math.random(), Math.random(), 1);
                this.text.pipeline.set4f('colorB', Math.random(), Math.random(), Math.random(), 1);

            }
            else
            {
                this.text.resetPipeline();
            }
        },
        this);

    }  //End Create

}
