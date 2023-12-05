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

        graphics.lineStyle(2, 0x88aa88);

        
        this.genarator = this.debugStepByStep(graphics, polygon);
        
        // advance by pressing Z
        this.input.keyboard.on("keydown-Z", () => this.genarator.next())

    }

    *debugPolygonContains(polygon, x, y, graphics)
    {
        let inside = false;
        const line = new Phaser.Geom.Line();
        const point = new Phaser.Math.Vector2(x, y);

        for (var i = -1, j = polygon.points.length - 1; ++i < polygon.points.length; j = i)
        {
            // var ix = polygon.points[i].x;
            // var iy = polygon.points[i].y;
            const {x:ix, y:iy} = polygon.points[i];

            // var jx = polygon.points[j].x;
            // var jy = polygon.points[j].y;
            const {x:jx, y:jy} = polygon.points[j];

            if (((iy <= y && y < jy) || (jy <= y && y < iy)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix))
            {
                inside = !inside;
            }
        }

        return inside;
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

    overlap(a0, a1, b0, b1)
    {
       return Math.min(a0, a1) <= Math.max(b0, b1) && Math.min(b0, b1) <= Math.max(a0, a1);
    }
}  // end Scene Class
