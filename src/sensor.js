var Sensor = /** @class */ (function () {
    function Sensor(car) {
        this.car = car;
        this.rayCount = 10;
        this.rayLength = 130;
        this.raySpread = Math.PI * 2; //Math.PI / 2?
        this.rays = [];
        this.readings = [];
    }
    Sensor.prototype.update = function (roadBorders, traffic) {
        this.castRays();
        this.readings = [];
        for (var i = 0; i < this.rays.length; i++) {
            this.readings.push(this.getReading(this.rays[i], roadBorders, traffic));
        }
    };
    Sensor.prototype.getReading = function (ray, roadBorders, traffic) {
        // console.log('ray:', ray);
        // console.log('roadBorders:', roadBorders);
        // console.log('traffic:', traffic);
        var touches = [];
        if (!roadBorders) {
            // console.error('roadBorders is undefined');
            return;
        }
        for (var i = 0; i < roadBorders.length; i++) {
            var touch = getIntersection(ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]);
            if (touch) {
                touches.push(touch);
            }
        }
        for (var i = 0; i < traffic.length; i++) {
            var poly = traffic[i].polygon;
            for (var j = 0; j < poly.length; j++) {
                var value = getIntersection(ray[0], ray[1], poly[j], poly[(j + 1) % poly.length]);
                if (value) {
                    touches.push(value);
                }
            }
        }
        //complexxxxxx
        if (touches.length == 0) {
            return null;
        }
        else {
            var offsets = touches.map(function (e) { return e.offset; });
            var minOffset_1 = Math.min.apply(Math, offsets);
            return touches.find(function (e) { return e.offset == minOffset_1; });
        }
    };
    Sensor.prototype.castRays = function () {
        this.rays = [];
        for (var i = 0; i < this.rayCount; i++) {
            var rayAngle = lerp(this.raySpread / 2, -this.raySpread / 2, i / (this.rayCount - 1) //instead
            // this.rayCount==1 ? 0.5:i / (this.rayCount - 1)
            ) + this.car.angle;
            var start = { x: this.car.x, y: this.car.y };
            var end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    };
    Sensor.prototype.draw = function (ctx) {
        for (var i = 0; i < this.rayCount; i++) {
            var end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }
            // Calculate the distance from the car to the end of the ray
            var distance = Math.sqrt(Math.pow(end.x - this.car.x, 2) + Math.pow(end.y - this.car.y, 2));
            // Calculate the opacity based on the distance
            var opacity = 1 - Math.min(1, distance / this.rayLength);
            // Set the stroke style with the calculated opacity
            ctx.strokeStyle = "rgba(255, 255, 0, ".concat(opacity, ")");
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    };
    return Sensor;
}());
