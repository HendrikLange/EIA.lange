namespace Rodelhang {

    export class Snowball {
        position: Vector;
        velocity: Vector;
        radius: number;
        


        constructor(_size: number, _position: Vector) {


            this.position = _position;
            this.radius = _size;

        }


        draw(): void {
            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(this.radius, this.radius);
            crc2.arc(0, 0, this.radius * 4, 0, 10 * Math.PI);
            crc2.fillStyle = "white";
            crc2.strokeStyle = "grey";
            crc2.fill();
            crc2.stroke();
            crc2.restore();
            crc2.closePath();



        }


    }
}