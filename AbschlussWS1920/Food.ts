namespace Rodelhang {

    export class Food {
        position: Vector;
        size: number;
        baitedBirds: Bird[] = [];
        target: Vector;
        stopMinX: number; // Nähe Keks dann Stop am Keks
        stopMaxX: number;
        stopMinY: number;
        stopMaxY: number;


        baitMinX: number; // Keks Effekt Radius
        baitMaxX: number;
        baitMinY: number;
        baitMaxY: number;



        constructor(_position: Vector, _size: number) {
            this.position = _position;
            this.size = _size;
            this.baitBirds();

        }

        draw(): void {
            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(this.size, this.size);
            crc2.arc(0, 0, this.size * 0.7, 0, 15 * Math.PI);
            crc2.fillStyle = "brown";
            crc2.fill();

            crc2.restore();
            crc2.closePath();


        }
        becomeSmaller(): void {

            if (this.size <= 0.05) {


                for (let i: number; i < foodArray.length; i++) {
                    if (this == foodArray[i]) {
                        foodArray.splice(i, 1);
                    }
                }
            }
            else

                this.size -= 0.03;

        }
        baitBirds(): void {
            this.target = new Vector(this.position.x, this.position.y);
            for (let bird of birdArray) {
               
                this.baitMinX = this.target.x - 150;
                this.baitMaxX = this.target.x + 150;
                this.baitMinY = this.target.y - 150;
                this.baitMaxY = this.target.y + 150; 
                
                if ((this.baitMinX < bird.position.x && bird.position.x < this.baitMaxX) && (this.baitMinY < bird.position.y && bird.position.y < this.baitMaxY))
                    {
                        this.baitedBirds.push(bird);


                    }
            }

            for (let bird of this.baitedBirds) {

               
                console.log("foodpos" + this.target);
                bird.velocity = Vector.getDifference(this.target, bird.position);
                bird.velocity.scale(0.01 + Math.random() * 0.01);
                this.stopMinX = this.target.x - 10;
                this.stopMaxX = this.target.x + 10;
                this.stopMinY = this.target.y - 10;
                this.stopMaxY = this.target.y + 10;
                bird.isBaited = true;

            }
            console.log(this.baitedBirds);

        }
        check(): void {
            for (let bird of this.baitedBirds) {
                if ((this.stopMinX < bird.position.x && bird.position.x < this.stopMaxX) && (this.stopMinY < bird.position.y && bird.position.y < this.stopMaxY)) {
                    bird.velocity.x = 0;
                    bird.velocity.y = 0;
                    setTimeout(function () {
                        foodArray = [];
                        
                        
                        bird.setVelocity(); 
                    }, 3000);

                }
            }


        }



    }




}
