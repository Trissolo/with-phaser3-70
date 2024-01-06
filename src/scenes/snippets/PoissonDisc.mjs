const {log, clear, dir} = console;
clear();

const {ceil, random, sqrt, cos, sin, max, min, SQRT1_2, PI} = Math;
const { PI2, Vector2, Vector3 } = Phaser.Math;

class poissonDiscSampler
{
    constructor(areaWidth, areaHeight, radius)
    {
        this.setup(areaWidth, areaHeight, radius);
    }
  
    setup(areaWidth, areaHeight, radius)
    {
        this.areaHeight = areaHeight;
        this.areaWidth = areaWidth;
        this.radius2 = radius * radius;
        this.R = 3 * this.radius2;
        this.cellSize = radius * Math.SQRT1_2;
        this.gridWidth = ceil(this.areaWidth / this.cellSize);
        this.gridHeight = ceil(this.areaHeight / this.cellSize);
        this.grid = new Array(this.gridWidth * this.gridHeight);
        this.queue = [];
        this.queueSize = 0;
        this.sampleSize = 0;
        this.MAXALLOWEDPOINTS = this.grid.length;
        this.k = 30;
    }
  
    generate()
    {
        let s;
        if (!this.sampleSize)
        {
            s = this.sample(Math.floor(random() * this.areaWidth), Math.floor(random() * this.areaHeight));
        };

        for (let i = 0; i < this.MAXALLOWEDPOINTS; i++)
        {
            s = this.calcArea();

            if (!s)
            {
                console.timeEnd("calcArea");
                break;
            }
        }

        return this.grid.flat().sort( (a, b) => a.z > b.z);
    } //end generate

    calcArea()
    {
        console.time("calcArea");
        //if (!this.sampleSize) return this.sample(random() * this.areaWidth, random() * this.areaHeight);

        // Pick a random existing sample and remove it from the queue.
        while (this.queueSize)
        {
            const i = random() * this.queueSize | 0
            const s = this.queue[i]

            // Make a new candidate between [radius, 2 * radius] from the existing sample.
            for (let j = 0, k = this.k; j < k; ++j)
            {
                const a = PI2 * random();
                const r = sqrt(random() * this.R + this.radius2);
                const x = Math.round(s.x + r * cos(a));
                const y = Math.round(s.y + r * sin(a));

                // Reject candidates that are outside the allowed extent,
                // or closer than 2 * radius to any existing sample.
                if (0 <= x && x < this.areaWidth && 0 <= y && y < this.areaHeight && this.far(x, y))
                {
                    return this.sample(x, y);
                } 
            }

            this.queue[i] = this.queue[--this.queueSize];

            this.queue.length = this.queueSize;
        }

    }//end calcArea
  
  far(x, y)
  {
        let i = x / this.cellSize | 0;
        let j = y / this.cellSize | 0;
        let s;

        const i0 = max(i - 2, 0),
            j0 = max(j - 2, 0),
            i1 = min(i + 3, this.gridWidth),
            j1 = min(j + 3, this.gridHeight);

        for (j = j0; j < j1; ++j)
        {
            const o = j * this.gridWidth;

            for (i = i0; i < i1; ++i)
            {
                if (s = this.grid[o + i])
                {
                     const dx = s.x - x;
                     const dy = s.y - y;

                    if (dx * dx + dy * dy < this.radius2)
                    {
                        return false;
                    }
                }
            }
        }

        return true;
    }//end far func
  
    sample(x, y)
    { 
        //gen sample
        const s = new Vector3(x, y, this.sampleSize);

        //s.z = this.sampleSize;

        this.queue.push(s);

        this.grid[this.gridWidth * (y / this.cellSize | 0) + (x / this.cellSize | 0)] = s;

        this.sampleSize += 1;

        this.queueSize += 1;

        return s;
    }//end sample func
  
}//end poissonDiscSampler class

var config = {
  type: Phaser.AUTO,
  
  scale: {
    width: 320,
    height: 200,
    mode: Phaser.Scale.NONE,
    zoom: 3,
    parent: 'gameContainer'
  },
    scene: {
        create: create
    }
};

window.game = new Phaser.Game(config);

function create ()
{
  const gag = new poissonDiscSampler(88, 44, 18);
  const res = gag.generate();
  
  console.dir(res);
  log(Math.round(res[0].x), Math.round(res[0].y));

  const offsetX = 10;
  
  const starSize = 2;

  const graphics = this.add.graphics({ fillStyle: { color: 0xffdd00 }, lineStyle:{ color:0x3478bd } });

  graphics.strokeRect(1, 1, gag.areaWidth + offsetX + starSize, gag.areaHeight + offsetX + starSize);

//   res.forEach( el => graphics.fillCircle(Math.round(el.x + offsetX), Math.round(el.y + offsetX), starSize) );

  res.forEach( el => graphics.fillCircle(el.x + offsetX, el.y + offsetX, starSize) );
}