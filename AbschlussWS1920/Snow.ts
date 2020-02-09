namespace Rodelhang {

    export class Snow extends Draw {
        xD: number;
        yD: number;

        constructor() {
            super();
            this.xP = Math.random() * 1400;
            this.yP = Math.random() * 700;
        }

        move(): void {
            this.yD = 4;
            this.xD = Math.random() * 0;

            this.xP += this.xD;
            this.yP += this.yD;

            if (this.yP > 600) {
                this.yP = 0;
            }

        }

        draw(): void {
            crc2.fillStyle = this.color;

            crc2.fillStyle = "white";
            crc2.strokeStyle = "grey";
            crc2.lineWidth = 1;

            crc2.beginPath();
            crc2.moveTo(this.xP - 2, this.yP + 1);
            crc2.lineTo(this.xP, this.yP - 2);
            crc2.lineTo(this.xP + 3, this.yP + 3);
            crc2.closePath();

            crc2.fill();
            crc2.stroke();
        }
    }

}