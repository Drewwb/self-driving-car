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
    }
    Road.prototype.draw = function (ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        for (var i = 0; i <= this.laneCount; i++) {
            var x = lerp(this.left, this.right, i / this.laneCount);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    };
    return Road;
}());
function lerp(A, B, t) {
    return A + (B - A) * t;
}
