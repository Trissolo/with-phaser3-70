export default class ReverseModePipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline
{

    colorA = 0;

    colorB = 0;

    // flushRequired = true;

    // flushIsNeeded = false;

    // debugFlush = 0;

    // aHasChanged = false;

    // bHasChanged = false;

    constructor(game)
    {
        super({
            game: game,
            name: "ReverseMode",
            fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            uniform vec3 colorA;
            uniform vec3 colorB;

            varying vec2 outTexCoord;
            
            
            void main()
            {
                vec4 texture = texture2D(uMainSampler, outTexCoord);

                texture.rgba = vec4(texture.a == 0.0? colorA : colorB, 1.0);

                // texture.rgba = vec4(colorB * texture.a + colorA * abs(1.0 - texture.a), 1.0);

                gl_FragColor = texture;
                               
            }`,

            uniforms: [
                'uMainSampler',
                'colorA',
                'colorB'
            ]
        });

    }

    // onActive(sh)
    // {
    // }

    onBind(gameObject)
    {
        if (gameObject && (this.colorA !== gameObject.colorA || this.colorB !== gameObject.colorB))
        {

            this.flush();

            if (this.colorA !== gameObject.colorA)
            {

                this.colorA = this.setColorFromHex(gameObject.colorA);

            }

            if (this.colorB !== gameObject.colorB)
            {

                this.colorB = this.setColorFromHex(gameObject.colorB, 'colorB');

            }

        }
        // else
        // {
        //     console.log("NOT ch!");//, gameObject.name, this.debugFlush);
        // }      
    }

    // onBindTest(gameObject)
    // {
    //     if (gameObject)
    //     {
            
    //         if (this.colorA !== gameObject.colorA) // || this.colorB !== gameObject.colorB)
    //         {
    //             console.log("Flush from A");

    //             this.flush()

    //             this.flushRequired = false;

    //             // console.log("Info: Flushing!", gameObject.name); // , this.debugFlush++, this.colorA !== gameObject.colorA, this.colorB !== gameObject.colorB, this.colorA !== gameObject.colorA  ||  this.colorB !== gameObject.colorB);

    //             this.colorA = this.setColorFromHex(gameObject.colorA);

    //         }

    //         if (this.colorB !== gameObject.colorB)
    //         {
    //             if (this.flushRequired)
    //             {
    //                 console.log("Flush from B");

    //                 this.flush();

    //                 this.flushRequired = true;
    //             }

    //             this.colorB = this.setColorFromHex(gameObject.colorB, 'colorB');
    //         }

    //         // else
    //         // {
    //         //     console.log("NOT Flushing!", gameObject.name, this.debugFlush);
    //         // }
    //     }
        
    // }

    // onBatch(gameObject)
    // {

    // }

    setColorFromHex(hexColor, name = 'colorA')
    {
        this.set3f(name,
            (hexColor >> 16 & 0xFF) / 255,
            (hexColor >> 8 & 0xFF) / 255,
            (hexColor & 0xFF) / 255
        );

        return hexColor;
    }

}
