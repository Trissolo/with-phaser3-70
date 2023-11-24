// const {clear, log, dir} = console;
// clear();

export default class GeomPointLineSide extends Phaser.Scene
{
  point = new Phaser.Math.Vector2(20, 90);

  line = new Phaser.Geom.Line(30, 50, 150, 150);

  state = 0;

  beh = [];

  text;

  mentalvar = "https://gist.githubusercontent.com/Trissolo/0135ed23866b2134016e566365718f60/raw/63e4e9132d75240701b2d54c8e07b1444805cce6/font_bianco."

  constructor ()
  {
    super({ key: 'TestScene' });
  }

  preload()
  {
    this.load.bitmapFont("font1", this.mentalvar + "png", this.mentalvar +"xml");
  }

  init()
  {
    this.beh.push(
      
        pointer => {

            if (pointer.rightButtonDown())
            {
              this.line.setTo(this.line.x2, this.line.y2, this.line.x1, this.line.y1);
            }
            else
            {
              this.point.copy(pointer);
            }
        },

        pointer =>
        {
            if (pointer.rightButtonDown())
            {
              this.line.x2 = pointer.x;
              this.line.y2 = pointer.y;
            }
            else
            {
              this.line.x1 = pointer.x;
              this.line.y1 = pointer.y;
            }
        }
    );
    
  }

  action(pointer)
  {
    // if (pointer.middleButtonDown())
    // {
    //   return this.state = Math.abs(1 - this.state);
    // }
    
    this.beh[this.state](pointer);
    
    this.draw()
  }
  
  create()
  {
    this.buildGui();
    
    this.graphics = this.add.graphics(
            {lineStyle: {width: 2, color: 0xaadaaa}, fillStyle: { color: 0x0000aa}
        });
    
    
    this.text = this.add.bitmapText(1,1, "font1", "afont1");
    
    this.draw();
  }

  determinant(line, point)
  {
    return (line.x2 - line.x1) * (point.y - line.y1) - (point.x - line.x1) * (line.y2 - line.y1) < 0;
  }

  pointIsOnLeft(line, point)
  {
    return this.determinant(line, point) === (line.y1 > line.y2);
  }

  draw()
  {
    this.graphics
      .clear()
      .strokeLineShape(this.line)
      .fillCircle(this.point.x, this.point.y, 3)
      .fillStyle(0x767676)
      .fillPoint(this.line.x2, this.line.y2, 4)
      .fillStyle(0x76fefe)
      .fillPoint(this.line.x1, this.line.y1, 4);
    
    this.text.setText(this.pointIsOnLeft(this.line, this.point)? "Left":"Right");
  }

  buildGui()
  {
    const {width, height} = this.cameras.main;
    const side = 16;
    log(width, height);
    
    this.add.rectangle(width, 0, side, side, 0x808080)
    .setOrigin(1, 0)
    .setInteractive()
    .on('pointerdown', () => this.state = Math.abs(1 - this.state));
    
    this.add.rectangle(0, side, width, height - side, 0xacacac)
    .setOrigin(0)
    .setInteractive()
    .on('pointerdown', this.action, this);
  }
}//end TestScene
    
// const config = {
//     type: Phaser.WEBGL,
//     parent: "gameContainer",
//     pixelArt: true,
//     backgroundColor: '#320822',
//     mipmapFilter: 'NEAREST',
//     scale: {
//         mode: Phaser.Scale.NONE,
//         //autoCenter: Phaser.Scale.CENTER_BOTH,
//         width: 200,
//         height: 200,
//         zoom: 2
//     },
//     disableContextMenu: true,
//     //loader: {
//     //  baseURL: 'https://i.ibb.co/YhGPn4S',
//     //  crossOrigin: 'anonymous'
//     //},
//     scene: [GeomPointLineSide]
// };

// window.game = new Phaser.Game(config);
