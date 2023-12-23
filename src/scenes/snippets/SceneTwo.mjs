import Phaser from "phaser";

import PipelineReverseMode from "./PipelineReverseMode.mjs";

export default class SceneTwo extends Phaser.Scene
{
    imgGroup;
    currentlyUsed = new Map();

    enteredCode = [];
    inputMaxLength = 8;
    wantedCode = [];
    shownCode

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
        this.imgGroup = this.add.group({classType: Phaser.GameObjects.Image});

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
        this.load.bitmapFont('wizardry', "wizardry_min.png", "wizardry_min.xml");

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
        // const assemble = num =>  String.fromCharCode(200) + num + String.fromCharCode(200);//= String.fromCharCode(200);

        this.setPipelineColors();

        // const bt = this.add.bitmapText(8, 8, "wizardry", assemble(1)+" "+assemble(2)+"\n\n"+assemble(4)+" "+assemble(5))
        // .setOrigin(0)
        // .setPipeline('RevMod');

        // bt.pipCol = 0xffff00;

        // console.dir(fdata)
        // const testImg = this.add.image(48, 8, 'wizardry', 'wiz6')
        // .setOrigin(0)
        // .setPipeline('RevMod')
        // .setInteractive()
        // .on('pointerover', this.setPipA)
        // .on('pointerout', this.onOut);

        // testImg.pipCol = 0xffffff;

        // let testString = "", maxch = 0;
        // for (const gag in this.cache.bitmapFont.get('wizardry').data.chars)
        // {
        //     testString += String.fromCharCode(gag);
        //     if (maxch++ > 10)
        //     {
        //         testString+="\n";
        //         maxch = 0;
        //     }
        // }
        this.shownCode = this.add.bitmapText(18, 8, "wizardry", "----");

        // this.drawNumericKeypad();
        this.prepare(3);

    }

    prepare(wanted = 3)
    {
        this.setWantedCode(wanted);

        this.drawNumericKeypad();
    }

    drawNumericKeypad()
    {
        this.clearUsed();

        let x = 8;
        const xAdv = 20;

        let y = 24;
        const yAdv = 12;
        let testImg;

        // const tempAry = new Array(10).fill(0);
        // tempAry.forEach((elem, idx, arr) => arr[idx] = idx === 9? 0 : idx + 1);

        for (const element of [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) //= 1; element < 10; element++)
        {
            // console.log(element, x, y)
            testImg = this.imgGroup.get(x, y, 'wizardry', `wiz${element}`) //add.image(48, 8, 'wizardry', 'wiz6')
            .setOrigin(0)
            .setPipeline('RevMod')
            .setInteractive()
            .on('pointerover', this.setPipA)
            .on('pointerout', this.onOut)
            //use '.name' prop as value holder?
            .setName(element)
            .on('pointerdown', this.enterCodeDigit);

            x += xAdv;
            if (x === 68)
            {
                x = 8;
                y += yAdv;
            }

            this.currentlyUsed.set(element, testImg);
        }

        //hardcoded :((
        testImg = this.imgGroup.get(x, y, 'wizardry', `wiz<`)
        .setOrigin(0)
        .setPipeline('RevMod')
        .setInteractive()
        .on('pointerover', this.setPipA)
        .on('pointerout', this.onOut)
        .on('pointerdown', this.deleteLastDigit, this);
        
        this.currentlyUsed.set("checkBtn", testImg);

        x += xAdv;

        testImg = this.imgGroup.get(x, y, 'wizardry', `wiz>`)
            .setOrigin(0)
            .setPipeline('RevMod')
            .setInteractive()
            .on('pointerover', this.setPipA)
            .on('pointerout', this.onOut)
            .on('pointerdown', this.checkCode);
        
        this.currentlyUsed.set("enterBtn", testImg);

        // console.log(Phaser.Math.RND);
        console.dir(this.currentlyUsed);

    }

    checkCode()
    {
        console.log(this.scene.enteredCode, this.scene.wantedCode);
        let test = true;
        const {enteredCode} = this.scene;
        const wantedCode = this.scene.wantedCode + "";
        const {length} = wantedCode;
        // console.log(wantedCode, typeof wantedCode, length, enteredCode.length);
        if (length !== enteredCode.length)
        {
            test = false;
            // return false
        }
        else
        {
            for (let i = 0; i < length; i++)
            {
                // const ent = enteredCode[i];
                // const wan = wantedCode[i];

                if (enteredCode[i] !== +wantedCode[i])
                {
                    test = false;
                    break
                    // return false;
                }
            }
            
        }
        
        console.log(test? "Correct": "Wrong");
        return test;
    }

    enterCodeDigit()
    {
        const {scene} = this;
        scene.enteredCode.push(this.name);
        scene.shownCode.setText(scene.enteredCode.join(''))
    }

    setWantedCode(codeIdx = 0, amo = "9876")
    {
        const {RND: rnd} = Phaser.Math;

        // const seedBck = rnd.state();

        rnd.sow(amo);

        for (let i = 0; i < codeIdx; i++)
        {
            rnd.between(2793, 9999);
        }

        //wantedCode as Array?
        // const {wantedCode} = this;

        // wantedCode.length = 0;
   
        // for (const digit of ("" + rnd.between(2793, 9999)))
        // {
        //     wantedCode.push( +digit );
        // }

        // wantedCode.forEach((el, id, ar) => ar[id] = +el);

        
        // wantedCode as String
        this.wantedCode = rnd.between(2793, 9999);
        
        console.log("WCO after q", this.wantedCode);
    }

    clearUsed()
    {
        for (const thing of this.currentlyUsed)
        {

            thing.disableInteractive()
            .setActive(false)
            .setVisible(false)
            .resetPipeline()
            .off('pointerover')
            .off('pointerout')
            .off('pointerdown');     
        }

        this.currentlyUsed.clear();

        return this;
    }

    deleteLastDigit()
    {
        this.enteredCode.length = Math.max(0, this.enteredCode.length - 1);

        this.shownCode.setText(this.enteredCode.join(""));

        return this;
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
        //Not Atlas, ATM :(
        const texture = this.textures.get('wizardry');

        //better from the bitmapFont directly:
        const bmFont = this.cache.bitmapFont.get('wizardry').data.chars;

        // let fr;

        const custOffsetX = 4;

        const prefix = "wiz";

        // hardcoded
        const charCodes = Phaser.Utils.Array.NumberArray(48, 57);
        charCodes.push(60, 62);

        for (const element of charCodes) // = 0;element < 10; element++)
        {
            const char = String.fromCharCode(element);
            // fr = texture.frames[char];
            // console.log("gag", element, fr, "char", char, fr.cutX)
            const {width, height, cutX, cutY, sourceIndex} = texture.frames[char];
            console.log("hmm", char, element, width, height, cutX, cutY, sourceIndex)
            texture.add(prefix + char, sourceIndex, cutX - custOffsetX, cutY, width + custOffsetX + custOffsetX, height);
        }

        // console.dir("...Texture, after:", bmFont[61])
        // fr = bmFont[61];
        // texture.add(prefix + "=", 0, cutX - custOffsetX, cutY - 1, width + custOffsetX + custOffsetX, height + 2);
    }
}  // end Scene Class
