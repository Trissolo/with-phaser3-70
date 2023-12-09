class PipelineReverseMode extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {

    lastTextColor = 0;
    lastBgColor = 0;
    flushNeeded = false;

    constructor(game) {
        super({
            game: game,
            name: "ReverseModeFlush",
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

                //texture.rgba = vec4(colorB * texture.a + colorA * abs(1.0 - texture.a), 1.0);

                gl_FragColor = texture;
                               
            }`,

            uniforms: [
                'uMainSampler',
                'colorA',
                'colorB'
            ]
        });

    }

    onBind(go)
    {
      if (go)
      {
        if (go.bgColor !== this.lastBgColor)
        {
          this.lastBgColor = go.bgColor;
          this.bgColorFromHex(go.bgColor);
          this.flushNeeded = true;
        }
        
        if (go.textColor !== this.lastTextColor)
        {
          this.lastTextColor = go.textColor;
          this.charColorFromHex(go.textColor);
          this.flushNeeded = true;
        }
      }
    }

    // onActive(sh)
    // {
    //   console.log("Active!", sh.name, this.name);
    //   this.bgColorFromHex(this.lastBgColor);
    //   this.charColorFromHex(this.lastTextColor);
    // }

    onBatch(go) {
        //console.log("BATCH!");
        
      
        if (this.flushNeeded)
         {
        
           this.flush();
        }


    }


    bgColorFromHex(bgcolor = 0xffffff) {
        this.set3f('colorA',
            (bgcolor >> 16 & 0xFF) / 255,
            (bgcolor >> 8 & 0xFF) / 255,
            (bgcolor & 0xFF) / 255
        );

        return this;
    }

    charColorFromHex(charColor = 0) {
        this.set3f('colorB',
            (charColor >> 16 & 0xFF) / 255,
            (charColor >> 8 & 0xFF) / 255,
            (charColor & 0xFF) / 255
        );

        return this;
    }

}