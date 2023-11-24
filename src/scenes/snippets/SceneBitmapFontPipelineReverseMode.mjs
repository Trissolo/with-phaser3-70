export default class SceneBitmapFontPipelineReverseMode extends Phaser.Scene
{
    customPipeline;
    time = 0;
    bunny;

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

    preload ()
    {
        // this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');
        // this.load.image('font_wiz', 'https://i.imgur.com/d7rFH8C.png')
        // this.load.image('bikkuriman', 'assets/sprites/bikkuriman.png');
        // this.load.image('bunny', 'assets/sprites/bunny.png');
        this.load.bitmapFont('fontwiz', "assets/nonpermanent/font_bianco.png", "assets/nonpermanent/font_bianco.xml")
    }

    create ()
    {
        this.customPipeline = this.renderer.pipelines.add('Custom', new CustomPipeline(this.game));

        this.customPipeline.set4f('color_a', 0.5, 0.6, 1, 1);
        this.customPipeline.set4f('color_b', 0.2, 0.2, 1, 1);

        //  var config = {
        //     image: 'font_wiz',
        //     width: 8,
        //     height: 8,
        //     chars: Phaser.GameObjects.RetroFont.TEXT_SET4,
        //     charsPerRow: 14//,
        //     //spacing: { x: 1, y: 1 }
        // };

        // this.cache.bitmapFont.add('fontwiz', Phaser.GameObjects.RetroFont.Parse(this, config));

        const qqq = this.cache.bitmapFont.get('fontwiz');//.data.chars;

        // qqq[100] = qqq[32];

        // const fakeSpace = String.fromCharCode(100);

        //qqq.setLineSpacing(1);

        //console.log(this.cache.bitmapFont.get('fontwiz').data.chars);

const sent = "Orcus\nJaji\nsgug\njjjj\nÈÈÈÈÈOrcus}"; //`${fakeSpace}AMAZE${fakeSpace}THE\nMINOTAUR${fakeSpace}03`

        this.dynamic = this.add.bitmapText(4, 32, 'fontwiz', sent, 8)
        .setOrigin(0)
        // .setLineSpacing(1)
        .setPipeline('Custom');

                //this.add.sprite(400, 300, 'atari').setPipeline('Custom');
    this.bunny = this.add.bitmapText(96, 32, 'fontwiz', sent, 8).setOrigin(0)//.setPipeline('Custom');
        //this.add.sprite(700, 300, 'bikkuriman');

        // this.bunny.text+= `\n${fakeSpace}${fakeSpace}${fakeSpace}ANC\nORC540`

        

        this.input.on('pointerdown', pointer =>
        {
            //console.log(this);

            //this.customPipeline.set4f('color_b', 1, 0.6, 1, 1);
            this.customPipeline.set4f('color_b', Math.random(), Math.random(), Math.random(), 1);
            this.customPipeline.set4f('color_a', Math.random(), Math.random(), Math.random(), 1);
/*
            if (this.bunny.pipeline === this.customPipeline)
            {
                this.bunny.resetPipeline();
            }
            else
            {
                this.bunny.setPipeline('Custom');
            }
*/
        }, this);
    }

    // update ()
    // {
    //     //this.customPipeline.set1f('uTime', this.time);

    //     this.time += 0.05;

    //     //this.bunny.rotation += 0.01;
    // }
}


// const config = {
//     type: Phaser.WEBGL,
//     pixelArt: true,
//     scale: {
//     width: 128,
//     height: 98,
//     zoom: 3
//     },
//     parent: 'gameContainer',
//     scene: Example
// };


class CustomPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline
{
    constructor (game)
    {
        super({
            game: game,
            fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            uniform vec4 color_a;
            uniform vec4 color_b;

            varying vec2 outTexCoord;
            

            
            void main()
            {
                vec4 texture = texture2D(uMainSampler, outTexCoord);

                texture.rgba =  texture.a > 0.99? color_b: color_a;

                gl_FragColor = texture;
                               
            }
            `,
            uniforms: [
                'uMainSampler',
                'color_a',
                'color_b'
            ]
        });
    }
}
