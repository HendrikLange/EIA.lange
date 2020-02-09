namespace Rodelhang {

    export class Bird extends Move {

        //  target: Vector;
        isTargeting: boolean;
        isTrained: boolean;
        isThinking: boolean;
        isPecking: boolean;
        isBaited: boolean;
        size: number = 5;

        constructor() {
            super();
            this.setVelocity();
        }

        setVelocity(): void {

            let xBird: number = (5 * Math.random()) + 2;

            this.velocity = new Vector(xBird, 0);

        }

        isHit(_hotspot: Vector): boolean {
            let hitsize: number = 5 * this.size;
            let difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize) //Entfernung vertikale
        }

        draw(): void {

            crc2.save();
            crc2.beginPath();
            crc2.translate(this.position.x, this.position.y); // Bauch
            if(this.position.y < 300){
                crc2.ellipse(0, 0, 10, 20, 5, 0, 2 * Math.PI);
            }
            else{
                crc2.ellipse(0, 0, 10, 20, 10, 0, 2 * Math.PI);
            }
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

            crc2.beginPath(); // Kopf
            if(this.position.y < 300){
                crc2.arc(18, 2, 10, 0, 2 * Math.PI);
            }
            else{
                crc2.arc(13, -11, 10, 0, 2 * Math.PI);
            }
            
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();

         

            crc2.beginPath(); // Auge
            if (this.position.y < 300){
                crc2.arc(20, 0, 2, 0, 2 * Math.PI);
            }
            else {
                crc2.arc(15, -13, 2, 0, 2 * Math.PI);
            }
            
            crc2.fillStyle = "white"; 
            crc2.fill();
            crc2.closePath();

            crc2.scale(7, 8);
            crc2.translate(-1, -1);
            crc2.beginPath(); // Flügel
            if (this.position.y < 300) {
                crc2.moveTo(3, 1);
                crc2.lineTo(1, 4);
                crc2.lineTo(-2, 0);
            }
            else{
            crc2.moveTo(3, 1);
            crc2.lineTo(0, 3);
            crc2.lineTo(-1, -1);
            }
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.fill();

            crc2.beginPath();
            if (this.position.y < 300){
                crc2.moveTo(4.5, 0.5);
                crc2.lineTo(6.5, 1.5);
                crc2.lineTo(4.5, 2);
            }
            else {
                crc2.moveTo(3.5, -0.5);
                crc2.lineTo(5.5, -0);
                crc2.lineTo(3.5, 0.5);
            }
           
            crc2.closePath();
            crc2.fillStyle = "orange";
            crc2.fill();



            crc2.restore();






        }
    }


}

