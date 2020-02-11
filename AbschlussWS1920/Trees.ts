namespace Rodelhang {


    export class Tree  {
        color: string;
        xP: number;
        yP: number;
     

        constructor() {
            
            this.xP = 60 + Math.random() * 450;
            this.yP = 300 + Math.random() * 190;
            this.color = "#799F0C";
        }

        draw(): void {

            crc2.fillStyle = this.color;
            crc2.beginPath();
            crc2.moveTo(this.xP, this.yP);
            crc2.lineTo(this.xP + 50, this.yP + 120);
            crc2.lineTo(this.xP - 50, this.yP + 120);
            crc2.closePath();
            crc2.strokeStyle = "#49311C";
            crc2.stroke();
            
            crc2.fillStyle = this.color;
            crc2.fill();

            crc2.moveTo(this.xP, this.yP + 90);
            crc2.beginPath();
            crc2.lineTo(this.xP, this.yP + 120);
            crc2.lineTo(this.xP, this.yP + 150);

            crc2.closePath();
            crc2.stroke();


        }
    }
}