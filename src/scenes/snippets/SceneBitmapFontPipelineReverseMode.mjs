import Phaser from "phaser";

import PipelineReverseMode from "./PipelineReverseMode.mjs";

// const {RGBStringToColor, IntegerToColor} = Phaser.Display.Color;

export default class SceneBitmapFontPipelineReverseMode extends Phaser.Scene
{
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
        this.renderer.pipelines.add("RevMod", new PipelineReverseMode(this.game));
    }

    preload ()
    {
        this.load.bitmapFont('fontwiz', "assets/nonpermanent/font_bianco.png", "assets/nonpermanent/font_bianco.xml")
        // this.load.bitmapFont('fontwiz', "assets/nonpermanent/font_eng.png", "assets/nonpermanent/font_eng.xml")

    }
    
    create ()
    {
        const {chars} = this.cache.bitmapFont.get('fontwiz').data;

        chars[183] = chars[32];

        const fakeSpace = String.fromCharCode(183);

        const sent = fakeSpace + "Orcus\n12,5\nsOugx\nj,Ox\nÈÈÈÈ\nÈOrcus}" + fakeSpace; //`${fakeSpace}AMAZE${fakeSpace}THE\nMINOTAUR${fakeSpace}03`

        this.text = this.add.bitmapText(4, 32, 'fontwiz', sent, 8)
        .setOrigin(0)
        .setTintFill(0x999944);
        // .setPipeline('RevMod');


        this.input.on('pointerdown', pointer =>
        {
            // first test:
            // if (this.text.pipeline === this.text.defaultPipeline)
            // {
            //     this.text.setPipeline('RevMod');

            //     this.text.pipeline.setColorA(Math.random(), Math.random(), Math.random());
            //     this.text.pipeline.setColorB(Math.random(), Math.random(), Math.random()); 

            // }
            // else
            // {
            //     this.text.resetPipeline();
            // }

            //Second test
            this.testTimeline();
        },
        this);

    }  //End Create

    testTimeline(text = this.text)
    {
        const timeline = this.add.timeline([
            {
                at: 0,
                target: text,
                run: function(){ this.setPipeline('RevMod')}
            },

            {
                at: 0,
                // target: pipeline,
                run: () => {
                    text.pipeline.bgColorFromHex(0xff0000);
                    text.pipeline.charColorFromHex(0x3478db);
                }
            },
            {
                at: 800,
                run: () => {
                    text.pipeline.bgColorFromHex();
                    text.pipeline.charColorFromHex();
                }
            },
            {
                at: 1600,
                run: () => {
                    text.pipeline.bgColorFromHex(0xff0000);
                    text.pipeline.charColorFromHex(0x3478db);
                }
            },
            {
                at: 2400,
                run: () => {
                    text.pipeline.bgColorFromHex();
                    text.pipeline.charColorFromHex();
                }
            },
            {
                at: 3200,
                run: () => {
                    text.pipeline.bgColorFromHex(0xff4466);
                    text.pipeline.charColorFromHex(0xffff00);
                }
            },
            {
                at: 4000,
                run: () => {
                    text.pipeline.bgColorFromHex(0x55ba65);
                    text.pipeline.charColorFromHex(0xffffff);
                }
            },
            {
                at:5800,
                target: text,
                run: text.resetPipeline
            }
        ]);

        timeline.play();
    }

}
