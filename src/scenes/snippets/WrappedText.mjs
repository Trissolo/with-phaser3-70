import Phaser from "phaser";

export default class WrappedText extends Phaser.Scene
{
    constructor()
    {
        super({
              key: 'WrappedText',
            //   active: false,
            //   visible: false,
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
        console.log('init', this.sys.settings.key, "alt:", this.scene.key);
        // this.events.once('create', () => {
        //     console.log("on create evt", this.sys.settings.key, this.scene.getStatus(this));
        // });
    }

    preload()
    {
        // console.log('preload', this.sys.settings.key);

        this.load.baseURL = 'assets/nonpermanent/';

        const bitsy = "bitsy";

        this.load.once(Phaser.Loader.Events.FILE_KEY_COMPLETE + `image-${bitsy}`, (a,b,c) => {
            
            const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ,.:;"!abcdefghijklmnopqrstuvwxyz?+-*/= 0123456789'&$|_àèìòù#^><%()[]`;

            this.cache.bitmapFont.add(
                bitsy,
                Phaser.GameObjects.RetroFont
                .Parse(
                    this, {
                    image: 'bitsy',
                    width: 6,
                    height: 8,
                    chars: chars,
                    charsPerRow: 32
                })
            );
        });

        this.load.image(bitsy, 'bitsy-6x8.png');

        this.load.bitmapFont("whiteFont", "font_bianco.png", "font_bianco.xml");
    }

    create()
    {
        const text = `The matrix has its roots in primitive arcade games... Cyberspace. A consensual hallucination experienced daily by billions of legitimate operators, in every nation, by children being taught mathematical concepts... A graphic representation of data abstracted from banks of every computer in the human system. Unthinkable complexity. Lines of light ranged in the nonspace of the mind, clusters and constellations of data. Like city lights, receding.`;

        const bt = this.add.bitmapText(4, 12, "whiteFont", "")
        .setOrigin(0)
        .setMaxWidth(230)
        .setVisible(false);
        

      const {wrappedText} = bt.setText(text).getTextBounds();

      bt.setText("")
        .setVisible(true);
        
      this.qqq = this.time.addEvent({
        delay: 90,
        callback: this.onEvent,
        callbackScope: this,
        args: [bt, wrappedText],
        repeat: wrappedText.length
      });
    }

    onEvent(bt, wrappedText)
    {
    //   console.log(wrappedText.length, this.qqq.repeatCount, bt.text.length);
    //   if (this.qqq.repeatCount === 56)
    //   {
    //     this.qqq.delay = 100;
    //   }
    // this.qqq.delay = Phaser.Math.Between(90, 280);

  	  bt.text += wrappedText.charAt(bt.text.length);

      if (this.qqq.repeatCount === 0)
      {
        this.qqq.reset({paused: true});
      }
    }
}  // end Class
