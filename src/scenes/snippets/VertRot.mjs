import Phaser from "phaser";

// from:
//https://bisqwit.iki.fi/jutut/kuvat/programming_examples/portalrendering/vertrot.bas

export default class VertRot extends Phaser.Scene
{
    constructor()
    {
        super({
              key: 'VertRot',
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
                // backgroundColor: "#225"
              }
            })
    }

    // init()
    // {
    // }
    
    preload()
    {
        this.load.setBaseURL("assets/nonpermanent");
        this.load.bitmapFont('simple', "font_eng.png", "font_eng.xml");
    }

    create()
    {

        this.graphics = this.add.graphics(1, 1);
        // .fillStyle(0x10a01, 1)
        // .fillRect(0, 0, 80, 80)
        // .lineStyle(2, 0x4589bd)
        // .lineBetween(40,40,60,50)

        // .translateCanvas(80, 0)
        // .fillStyle(0x010b01)
        // .fillRect(0, 0, 80, 80)
        // .lineBetween(40,40,60,50)

        // a wall
        this.line = new Phaser.Geom.Line(70, 20, 70, 70);

        // our player
        this.player = new Phaser.Math.Vector2(50, 50)
        this.angle = 0;
        // this.potPos = new Phaser.Math.Vector2(this.player);


        this.cursors = this.input.keyboard.createCursorKeys();


        // info
        this.text = this.add.bitmapText(2, 2, "simple", "");

        //not using 'update', for now...
        this.time.addEvent({ delay: 90, callback: this.onEvent, callbackScope: this, loop: true, args: [] });

    }

    onEvent()
    {
        this.manageInput();

        this.graphics.clear();
        this.renderA();
        this.renderB();

        this.printInfo();
    }



    manageInput()
    {
        const {cursors} = this;
        if (cursors.left.isDown)
        {
           this.angle -= 0.1 ;
        }
        else if (cursors.right.isDown)
        {
            this.angle += 0.1 ;
        }

        if (cursors.up.isDown)
        {
            this.player.x += Math.cos(this.angle);
            this.player.y += Math.sin(this.angle);
            // potPos.copy(player);
          
            // potPos.x += Math.cos(this.angle);
            // potPos.y += Math.sin(this.angle);
        }
        else if (cursors.down.isDown)
        {
            this.player.x -= Math.cos(this.angle);
            this.player.y -= Math.sin(this.angle);

            // potPos.copy(player);
            // potPos.x -= Math.cos(angle);
            // potPos.y -= Math.sin(angle);
        }
    }

    // Draw the absolute map
    renderA()
    {
        const {graphics} = this;

        // choose area to be drawn
        graphics.translateCanvas(0, 0);

        //wall
        graphics.lineStyle(2, 0x44aa44)
        .strokeLineShape(this.line)
        //.lineBetween(line)
        //Line for facing dir...
        const directionLineLength = 11;
        graphics.lineStyle(2, 0x4589bd)
        graphics.lineBetween(this.player.x, this.player.y, this.player.x + Math.cos(this.angle) * directionLineLength , this.player.y + Math.sin(this.angle)* directionLineLength)
        
        //... and the player as a point.
        graphics.fillStyle(0xffffff, 1);
        graphics.fillPointShape(this.player, 3);
    }
    
    //Draw the transformed map, relative to the player)
    renderB()
    {
        const {graphics, player, angle} = this;

        let {x1: lineX1, y1: lineY1, x2: lineX2, y2: lineY2} = this.line;
        const {x: playerX, y: playerY} = player;
        // we ll'recycle this:
        let translatedX1 = lineX1 - playerX;
        let translatedY1 = lineY1 - playerY;
        
        let translatedX2 = lineX2 - playerX;
        const translatedY2 = lineY2 - playerY;
        
        const sinAngle = Math.sin(angle);
        const cosAngle = Math.cos(angle)
        
        
        const tz1 = translatedX1 * cosAngle + translatedY1 * sinAngle;
        const tz2 = translatedX2 * cosAngle + translatedY2 * sinAngle;
        
        translatedX1 = translatedX1 * sinAngle - translatedY1 * cosAngle;
        translatedX2 = translatedX2 * sinAngle - translatedY2 * cosAngle;

        //draw!
        const arbitraryConstant = 40;
        graphics.translateCanvas(120, 0)
        .fillStyle(0x10a01, 1)
        // .fillRect(0, 0, 80, 80)

        // wall
        .lineStyle(2, 0x44aa44)
        .lineBetween(arbitraryConstant - translatedX1, arbitraryConstant - tz1, arbitraryConstant - translatedX2, arbitraryConstant - tz2)

        //pl
        .lineStyle(2, 0x4589bd)
        .lineBetween(arbitraryConstant, arbitraryConstant, arbitraryConstant, arbitraryConstant - 5)
        .fillStyle(0xffffff, 1)
        .fillPoint(arbitraryConstant, arbitraryConstant, 3);
    }

    // Draw the perspective-transformed map
    renderC()
    {
        
    }

    printInfo()
    {
        this.text.setText([
            `Player X: ${this.player.x}`,
            `Player Y: ${this.player.y}`,
            `Player angle: ${this.angle}`
        ])
    }
}  // end Scene Class
