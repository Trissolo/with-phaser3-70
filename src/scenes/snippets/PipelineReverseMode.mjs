import Phaser from "phaser";

export default class PipelineReverseMode extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline
{
    constructor (game)
    {
        super({
            game: game,
            name: "ReverseMode",
            fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            uniform vec4 colorA;
            uniform vec4 colorB;

            varying vec2 outTexCoord;
            

            
            void main()
            {
                vec4 texture = texture2D(uMainSampler, outTexCoord);

                texture.rgba =  texture.a > 0.99? colorB: colorA;

                gl_FragColor = texture;
                               
            }`,
            
            uniforms: [
                'uMainSampler',
                'colorA',
                'colorB'
            ]
        });

        // this.setCharCol();

        // this.setBGCol();
    }

    setCharCol(r = 0.2, g = 0.2, b = 1, a)
    {
        this.set4f('colorB', r, g, b, 1);
    }

    setBGCol(r = 0.5, g = 0.6, b = 1, a)
    {
        // this.set4f('colorA', r, g, b, 1);
        // this.customPipeline.set4f('color_b', 0.2, 0.2, 1, 1);
    }
}
