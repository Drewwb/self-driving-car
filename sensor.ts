class Sensor {
    car: Car;
    rayCount: number;
    rayLength: number;
    raySpread: number;
    rays: {x: number; y: number}[][];
    readings: ({ x: number; y: number } | null)[];

    constructor(car: Car) {
        this.car = car;
        this.rayCount = 10;
        this.rayLength = 130;
        this.raySpread = Math.PI * 2; //Math.PI / 2?
        this.rays = [];
        this.readings = [];
    }

    update(roadBorders, traffic){
        this.castRays();
        this.readings = [];
        for(let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.getReading(this.rays[i], roadBorders, traffic)
            );
        }
    } 

    private getReading(ray, roadBorders, traffic) {
        let touches = [];
        for(let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch) {
                touches.push(touch);
            }
        }

        for(let i = 0; i <traffic.length; i++) {
            const poly = traffic[i].polygon;
            for(let j = 0; j < poly.length; j++) {
                const value = getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j + 1) % poly.length]
                );
                if(value) {
                    touches.push(value);
                }
            }
        }
        //complexxxxxx
        if(touches.length == 0) {return null;}
        else {
            const offsets: number[] = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
    }

    private castRays(): void {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                i / (this.rayCount - 1) //instead
                // this.rayCount==1 ? 0.5:i / (this.rayCount - 1)
            ) + this.car.angle;
            const start = {x: this.car.x, y: this.car.y};
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx): void {
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }
    
            // Calculate the distance from the car to the end of the ray
            const distance = Math.sqrt(
                Math.pow(end.x - this.car.x, 2) + Math.pow(end.y - this.car.y, 2)
            );
    
            // Calculate the opacity based on the distance
            const opacity = 1 - Math.min(1, distance / this.rayLength);
    
            // Set the stroke style with the calculated opacity
            ctx.strokeStyle = `rgba(255, 255, 0, ${opacity})`;
    
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }
}