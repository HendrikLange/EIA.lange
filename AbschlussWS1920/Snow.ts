namespace Rodelhang {

    export class Snow {

        gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, 5);
        position: Vector;
        velocity: Vector;
        size: number;

        constructor() {

            this.position = new Vector(Math.random() * crc2.canvas.width, Math.random() * crc2.canvas.height);

            this.velocity = new Vector(0, Math.random() + 1 * 5);


        }

        move(): void {

            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);

            this.position.add(offset);

            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;

            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
        }



        draw(): void {

            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = this.gradient;
            crc2.arc(0, 0, 2, 0, 2 * Math.PI);
            crc2.fillStyle = "white";
            crc2.strokeStyle = "lightgrey";
            crc2.stroke();
            crc2.fill();

            crc2.restore();


        }
    }





}