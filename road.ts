class Road{
    x: number;
    width: number;
    laneCount: number;
    left: number;
    right:number;
    top: number;
    bottom: number;
    boarders: {x: number, y: number; }[][];

    constructor(x: number, width: number, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - (width / 2);
        this.right = x + (width / 2);

        const inf = 10000000;

        this.top = -inf;
        this.bottom = inf

        const topLeft = {x: this.left, y:this.top};
        const topRight = {x: this.right, y:this.top};
        const bottomLeft = {x: this.left, y:this.bottom};
        const bottomRight = {x: this.right, y:this.bottom};
        this.boarders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
        
    }

    getLaneCenter(laneIndex: number) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + laneIndex * laneWidth;
    }



    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for(let i = 1;  i <= this.laneCount - 1; i++) {
            const x = lerp (
                this.left,
                this.right,
                i / this.laneCount
            );
            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        this.boarders.forEach(boarders=> {
            ctx.beginPath();
            ctx.moveTo(boarders[0].x, boarders[0].y);
            ctx.lineTo(boarders[1].x, boarders[1].y)
            ctx.stroke();
        });
    }
}
