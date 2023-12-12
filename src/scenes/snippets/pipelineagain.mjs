const {clear, log, dir} = console;
clear();


// const Colors = {
//     bg: 0x005784,
//     text: 0x31a2f2,
//     ovBg: 0xeb8931,
//     ovText: 0xf7e26b
// };

class TestScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'TestScene'
        });
    }

    init() {
        this.ary = [];
        this.revmod = new PipelineReverseMode(this.game)
        this.renderer.pipelines.add("RevMod", this.revmod);


    }

    preload() {
        this.load.image('bitsy', 'https://i.imgur.com/d7rFH8C.png');
    }
    create() {
        const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.:;,!`;

        const config = {
            image: 'bitsy',
            width: 8,
            height: 8,
            chars: chars,
            charsPerRow: 14,
            //spacing: { x: 1, y: 1 }
        };

        this.cache.bitmapFont.add('bitsy', Phaser.GameObjects.RetroFont.Parse(this, config));
        
        this.buildStuff();

        this.input.on('pointerdown', () => {

            console.log("remo!");
            this.renderer.pipelines.remove('RevMod');
            this.ary.forEach(el => el.resetPipeline());
        });
    }

    buildStuff()
    {
        let go;
        let x = 10;
        let y = 8;
        for (let i = 0; i < 10; i++)
        {

            go = this.add.bitmapText(x, y, 'bitsy', i)
                .setName(i)
                .setInteractive()
                .on('pointerover', this.onOver)
                .on('pointerout', this.onOut)
                .setPipeline('RevMod');

            go.palette = true;

            this.ary.push(go);

            x += 20;

            if (x === 70)
            {
                x = 10;
                y += 12;
            }
        }

    }

    onOver()
    {
      
        this.palette = false;
    }

    onOut()
    {
        this.palette = true;
    }
} //end TestScene

const config = {
    type: Phaser.WEBGL,
    parent: "gameContainer",
    pixelArt: true,
    backgroundColor: '#320822',
    mipmapFilter: 'NEAREST',
    scale: {
        mode: Phaser.Scale.NONE,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 200,
        height: 200,
        zoom: 2
    },
    //loader: {
    //  baseURL: 'https://i.ibb.co/YhGPn4S',
    //  crossOrigin: 'anonymous'
    //},
    scene: TestScene
};

window.game = new Phaser.Game(config);




class PipelineReverseMode extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline
{
    changed = 0;
 
    constructor(game) {
        super({
            game: game,
            name: "ReverseMode",
            fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            uniform vec3 colorA;
            uniform vec3 colorB;
            uniform vec3 colorC;
            uniform vec3 colorD;
            uniform bool palette;

            varying vec2 outTexCoord;
            

            
            void main()
            {
                vec4 texture = texture2D(uMainSampler, outTexCoord);

                if (palette == false)
                {
                    texture.rgba = vec4(texture.a == 0.0? colorA : colorB, 1.0);            
                }
                else
                {
                    texture.rgba = vec4(texture.a == 0.0? colorC : colorD, 1.0);            
                }

                //texture.rgba = vec4(colorB * texture.a + colorA * abs(1.0 - texture.a), 1.0);

                gl_FragColor = texture;
                               
            }`,

            uniforms: [
                'uMainSampler',
                'colorA',
                'colorB',
                'colorC',
                'colorD',
                'palette'
            ]
        });

    }

    onBind(go)
    {
      if (go)
      {
        if (this.changed !== go.palette)
        {
            this.changed = go.palette;

            this.flush();
            
            console.log("flushing");
        }
        else
        {
           console.log("Skipping flush");
        }
        this.setPalette(go.palette);
      }
    }

    onActive(sh)
    {
        console.log("Active!", sh.name, this.name);

        let i = 0;

        for (let col of [0xeb8931, 0xf7e26b, 0x005784, 0x31a2f2])
        {
            this.setColor(i++, col);
        }
        
    }

    // onBatch(go)
    // {          
    //     // if (go)
    //     // {
    //     // }
    // }


    setColor(id = 0, color = 0xffffff)
    {
        this.set3f(`color${String.fromCharCode(65 + id)}`,
            (color >> 16 & 0xFF) / 255,
            (color >> 8 & 0xFF) / 255,
            (color & 0xFF) / 255
        );

        return this;
    }

    setPalette(val)
    {
        this.setBoolean('palette', val? true : false);

        return this;
    }

}