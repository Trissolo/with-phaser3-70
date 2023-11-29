import Phaser from "phaser";

export default class GeneratorFuncTestDebug extends Phaser.Scene
{
    constructor()
    {
        super({
              key: 'GeneratorFuncTestDebug',
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
        console.log('initc', this.sys.settings.key);
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
        const polygon = new Phaser.Geom.Polygon([
            40, 10,
            20, 27,
            14, 43,
            65, 80
        ]);

        const graphics = this.add.graphics({ x: 0, y: 0 });

        graphics.lineStyle(2, 0x00aa00);

        graphics.strokePoints(polygon.points, true);

        
        this.genarator = this.debugStepByStep(graphics, polygon);
        
        // advance by pressing Z
        this.input.keyboard.on("keydown-Z", () => this.genarator.next())

    }

    *debugStepByStep(graphics, polygon)
    {
        graphics.lineStyle(2, 0xddaa87);

        const {points} = polygon;

        for (let i = 0, {length} = points, j = length - 1; i < length; j = i++)
        { 
            const {x, y} = points[i];
            const {x: bx, y: by}  = points[j];

            console.log(`(from ${i} to ${j}):\nax: ${x}, ay: ${y}\nbx: ${bx}, by: ${by}`);

            yield graphics.lineBetween(points[i].x, points[i].y, points[j].x, points[j].y)
        }

        yield console.log("Done.");
    }
}  // end Scene Class
