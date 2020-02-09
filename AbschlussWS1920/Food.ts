

namespace Rodelhang {

    export class Food {
        position: Vector;
        size: number;
        baitedBirds: Bird[] = [];
        target: Vector;
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;

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

            for (let bird of moveingObjects) {
                this.baitedBirds.push(bird);
                console.log("test");
            }

            for (let bird of this.baitedBirds) {

                this.target = new Vector(this.position.x, this.position.y);
                console.log("foodpos" + this.target);
                bird.velocity = Vector.getDifference(this.target, bird.position);
                bird.velocity.scale(0.01 + Math.random() * 0.01);
                this.minX = this.target.x - 10;
                this.maxX = this.target.x + 10;
                this.minY = this.target.y - 10;
                this.maxY = this.target.y + 10;
                bird.isBaited = true;

            }
            console.log(this.baitedBirds);

        }
        check(): void {
            for (let bird of this.baitedBirds) {
                if ((this.minX < bird.position.x && bird.position.x < this.maxX) && (this.minY < bird.position.y && bird.position.y < this.maxY)) {
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
