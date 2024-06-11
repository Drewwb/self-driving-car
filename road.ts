class Road{
    x: number;
    width: number;
    laneCount: number;
    left: number;
    right:number;
    top: number;
    bottom: number;

    constructor(x: number, width: number, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - (width / 2);
        this.right = x + (width / 2);

        const inf = 10000000;

        this.top = -inf;
        this.bottom = inf
        
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for(let i = 0;  i <= this.laneCount; i++) {
            const x = lerp (
                this.left,
                this.right,
                i / this.laneCount
            );
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}

function lerp(A: number, B: number, t:number) {
    return A + (B - A) * t;
}