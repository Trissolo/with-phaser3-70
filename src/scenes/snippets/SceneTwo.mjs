import Phaser from "phaser";

import PipelineReverseMode from "./PipelineReverseMode.mjs";

export default class SceneTwo extends Phaser.Scene
{
    constructor()
    {
        super({
              key: 'SceneTwo',
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
        

        // this.load.on('loaderror', console.log)

        // this.load.on('load', console.log)

        // this.events.once('create', () => {
            
            this.renderer.pipelines.add("RevMod", new PipelineReverseMode(this.game));
            this.renderer.pipelines.add("SecRevMod", new PipelineReverseMode(this.game));

            // console.log("on create evt", this.sys.settings.key, this.scene.getStatus(this));
            
        // });
    }

    preload()
    {
        this.load.setBaseURL("assets/nonpermanent");
        // console.log(this.load.baseURL);

        // this.load.bitmapFont('wizardry', "wizardry.png", "wizardry.xml");
        this.load.bitmapFont('wizardry', "wizardryb.png", "wizardryb.xml");

    }

    create()
    {
        // console.log('create', this.sys.settings.key);
        this.addSpecialFrames();

        const fdata = this.cache.bitmapFont.get('wizardry');

        // let res = "";

        // for (const val in fdata.data.chars)
        // {
        //     // res += String.fromCharCode(val);
        //     // // console.log(res.length, res.length % 20)
        //     // if (!(res.length % 8))
        //     // {
        //     //     res+="\n";
        //     // }
        //     const ob = fdata.data.chars[val]
        //     ob.y ++;
        //     console.log(String.fromCharCode(val), fdata.data.chars[val])
        // }

        const fakeSpace = String.fromCharCode(200);
        const assemble = num =>  String.fromCharCode(200) + num + String.fromCharCode(200);//= String.fromCharCode(200);

        this.setPipelineColors();

        const bt = this.add.bitmapText(8, 8, "wizardry", assemble(1)+" "+assemble(2)+"\n\n"+assemble(4)+" "+assemble(5))
        .setOrigin(0)
        .setPipeline('RevMod');

        // bt.pipCol = 0xffff00;

        // console.dir(fdata)
        const testImg = this.add.image(48, 8, 'wizardry', 'wiz6')
        .setOrigin(0)
        .setPipeline('RevMod')
        .setInteractive()
        .on('pointerover', this.setPipA)
        .on('pointerout', this.onOut);

        // testImg.pipCol = 0xffffff;

    }

    setPipelineColors()
    {
        let pip = this.renderer.pipelines.get('RevMod')
        pip.bgColorFromHex(0x121212);
        pip.charColorFromHex(0x898989);

        pip = this.renderer.pipelines.get('SecRevMod')
        pip.bgColorFromHex(0xbdca78);
        pip.charColorFromHex(0x8b861d);
    }

    setPipA()
    {
        // console.log(this)
        this.setPipeline('SecRevMod');
        // this.pipeline('RevMod')
        // this.pipCol = 0xbdca78;
        this.pipeline.bgColorFromHex(0xbdca78);
    }

    onOut()
    {
        // this.pipCol = 0x345678;
        // this.pipeline.bgColorFromHex(0x345678);
        this.setPipeline('RevMod');
    }

    addSpecialFrames()
    {
        const texture = this.textures.get('wizardry');
        // console.log(texture);
        let fr;
        let custOffsetX = 4;

        const prefix = "wiz";

        for (let i = 0; i < 10; i++)
        {
            fr = texture.frames[`${i}`];
            // console.log("gag", i, fr, fr.cutX)
            const {width, height, cutX, cutY, sourceIndex} = fr;
            // console.log("hmm", i, width, height, cutX, cutY, sourceIndex)
            texture.add(prefix + i, sourceIndex, cutX - custOffsetX, cutY - 1, width + custOffsetX + custOffsetX, height + 2);
        }

        // console.dir("After:", this.textures.get('wizardry'))
    }
}  // end Scene Class
