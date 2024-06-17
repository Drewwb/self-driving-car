var Car = /** @class */ (function () {
    function Car(x, y, width, height, controlType, maxSpeed) {
        if (maxSpeed === void 0) { maxSpeed = 3; }
        var _this = this;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.1;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.angle = 0;
        this.damaged = false;
        this.useBrain = controlType == "AI";
        if (controlType != "DUMMY") {
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
        }
        this.controls = new Controls(controlType);
        this.img = new Image();
        this.mask = document.createElement("canvas");
        this.mask.width = width;
        this.mask.height = height;
        var maskCtx = this.mask.getContext("2d");
        if (controlType != "DUMMY") {
            this.img.src = "images/bluecar.png";
            this.img.onload = function () {
                maskCtx.fillStyle = "blue";
                maskCtx.fillRect(0, 0, _this.width, _this.height);
                maskCtx.globalCompositeOperation = "destination-atop";
                maskCtx.drawImage(_this.img, 0, 0, _this.width, _this.height);
            };
        }
        else {
            this.img.src = "images/redcar.png";
            this.img.onload = function () {
                maskCtx.fillStyle = "red";
                maskCtx.fillRect(0, 0, _this.width, _this.height);
                maskCtx.globalCompositeOperation = "destination-atop";
                maskCtx.drawImage(_this.img, 0, 0, _this.width, _this.height);
            };
        }
    }
    Car.prototype.update = function (roadBorders, traffic) {
        if (!this.damaged) {
            this.move();
            this.polygon = this.createPolygon();
            this.damaged = this.assessDamage(roadBorders, traffic);
        }
        if (this.sensor) {
            this.sensor.update(roadBorders, traffic);
            var offsets = this.sensor.readings.map(function (s) { return s == null ? 0 : 1 - s.offset; });
            var outputs = NeuralNetwork.feedForward(offsets, this.brain);
            if (this.useBrain) {
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.reverse = outputs[3];
            }
        }
    };
    Car.prototype.assessDamage = function (roadBorders, traffic) {
        for (var i = 0; i < roadBorders.length; i++) {
            if (polyIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }
        for (var i = 0; i < traffic.length; i++) {
            if (polyIntersect(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }
        return false;
    };
    //crazy polygon math that draws car
    Car.prototype.createPolygon = function () {
        var points = [];
        var rad = Math.hypot(this.width, this.height) / 2;
        var alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });
        return points;
    };
    Car.prototype.move = function () {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        if (this.speed != 0) {
            var flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
        this.y -= this.speed;
    };
    Car.prototype.draw = function (ctx, color, drawSensor) {
        if (drawSensor === void 0) { drawSensor = false; }
        if (this.sensor && drawSensor) {
            this.sensor.draw(ctx);
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        if (!this.damaged) {
            ctx.drawImage(this.mask, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.globalCompositeOperation = "multiply";
        }
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    };
    return Car;
}());
