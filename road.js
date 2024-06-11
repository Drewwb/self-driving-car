var Road = /** @class */ (function () {
    function Road(x, width, laneCount) {
        if (laneCount === void 0) { laneCount = 3; }
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.left = x - (width / 2);
        this.right = x + (width / 2);
        var inf = 10000000;
        this.top = -inf;
        this.bottom = inf;
        var topLeft = { x: this.left, y: this.top };
        var topRight = { x: this.right, y: this.top };
        var bottomLeft = { x: this.left, y: this.bottom };
        var bottomRight = { x: this.right, y: this.bottom };
        this.boarders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }
    Road.prototype.getLaneCenter = function (laneIndex) {
        var laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + laneIndex * laneWidth;
    };
    Road.prototype.draw = function (ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        for (var i = 1; i <= this.laneCount - 1; i++) {
            var x = lerp(this.left, this.right, i / this.laneCount);
            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        this.boarders.forEach(function (boarders) {
            ctx.beginPath();
            ctx.moveTo(boarders[0].x, boarders[0].y);
            ctx.lineTo(boarders[1].x, boarders[1].y);
            ctx.stroke();
        });
    };
    return Road;
}());
