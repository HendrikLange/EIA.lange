var Rodelhang;
(function (Rodelhang) {
    class Food {
        constructor(_position, _size) {
            this.baitedBirds = [];
            this.position = _position;
            this.size = _size;
            this.baitBirds();
        }
        draw() {
            Rodelhang.crc2.beginPath();
            Rodelhang.crc2.save();
            Rodelhang.crc2.translate(this.position.x, this.position.y);
            Rodelhang.crc2.scale(this.size, this.size);
            Rodelhang.crc2.arc(0, 0, this.size * 0.7, 0, 15 * Math.PI);
            Rodelhang.crc2.fillStyle = "brown";
            Rodelhang.crc2.fill();
            Rodelhang.crc2.restore();
            Rodelhang.crc2.closePath();
        }
        becomeSmaller() {
            if (this.size <= 0.05) {
                for (let i; i < Rodelhang.foodArray.length; i++) {
                    if (this == Rodelhang.foodArray[i]) {
                        Rodelhang.foodArray.splice(i, 1);
                    }
                }
            }
            else
                this.size -= 0.03;
        }
        baitBirds() {
            for (let bird of Rodelhang.moveingObjects) {
                this.baitedBirds.push(bird);
                console.log("test");
            }
            for (let bird of this.baitedBirds) {
                this.target = new Rodelhang.Vector(this.position.x, this.position.y);
                console.log("foodpos" + this.target);
                bird.velocity = Rodelhang.Vector.getDifference(this.target, bird.position);
                bird.velocity.scale(0.01 + Math.random() * 0.01);
                this.minX = this.target.x - 10;
                this.maxX = this.target.x + 10;
                this.minY = this.target.y - 10;
                this.maxY = this.target.y + 10;
                bird.isBaited = true;
            }
            console.log(this.baitedBirds);
        }
        check() {
            for (let bird of this.baitedBirds) {
                if ((this.minX < bird.position.x && bird.position.x < this.maxX) && (this.minY < bird.position.y && bird.position.y < this.maxY)) {
                    bird.velocity.x = 0;
                    bird.velocity.y = 0;
                    setTimeout(function () {
                        Rodelhang.foodArray = [];
                        bird.setVelocity();
                    }, 3000);
                }
            }
        }
    }
    Rodelhang.Food = Food;
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Food.js.map