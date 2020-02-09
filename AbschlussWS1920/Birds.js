var Rodelhang;
(function (Rodelhang) {
    class Bird extends Rodelhang.Move {
        constructor() {
            super();
            this.size = 5;
            this.setVelocity();
        }
        setVelocity() {
            let xBird = (8 * Math.random()) + 2;
            let yBird = Math.random() * -5;
            this.velocity = new Rodelhang.Vector(xBird, yBird);
        }
        isHit(_hotspot) {
            let hitsize = 5 * this.size;
            let difference = new Rodelhang.Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize); //Entfernung vertikale
        }
        draw() {
            Rodelhang.crc2.save();
            Rodelhang.crc2.beginPath();
            Rodelhang.crc2.translate(this.position.x, this.position.y); // Bauch
            if (this.position.y < 300) {
                Rodelhang.crc2.ellipse(0, 0, 10, 20, 5, 0, 2 * Math.PI);
            }
            else {
                Rodelhang.crc2.ellipse(0, 0, 10, 20, 10, 0, 2 * Math.PI);
            }
            Rodelhang.crc2.fillStyle = "black";
            Rodelhang.crc2.fill();
            Rodelhang.crc2.closePath();
            Rodelhang.crc2.beginPath(); // Kopf
            if (this.position.y < 300) {
                Rodelhang.crc2.arc(18, 2, 10, 0, 2 * Math.PI);
            }
            else {
                Rodelhang.crc2.arc(13, -11, 10, 0, 2 * Math.PI);
            }
            Rodelhang.crc2.fillStyle = "black";
            Rodelhang.crc2.fill();
            Rodelhang.crc2.closePath();
            Rodelhang.crc2.beginPath(); // Auge
            if (this.position.y < 300) {
                Rodelhang.crc2.arc(20, 0, 2, 0, 2 * Math.PI);
            }
            else {
                Rodelhang.crc2.arc(15, -13, 2, 0, 2 * Math.PI);
            }
            Rodelhang.crc2.fillStyle = "white";
            Rodelhang.crc2.fill();
            Rodelhang.crc2.closePath();
            Rodelhang.crc2.scale(7, 8);
            Rodelhang.crc2.translate(-1, -1);
            Rodelhang.crc2.beginPath(); // Flügel
            if (this.position.y < 300) {
                Rodelhang.crc2.moveTo(3, 1);
                Rodelhang.crc2.lineTo(1, 4);
                Rodelhang.crc2.lineTo(-2, 0);
            }
            else {
                Rodelhang.crc2.moveTo(3, 1);
                Rodelhang.crc2.lineTo(0, 3);
                Rodelhang.crc2.lineTo(-1, -1);
            }
            Rodelhang.crc2.closePath();
            Rodelhang.crc2.fillStyle = "black";
            Rodelhang.crc2.fill();
            Rodelhang.crc2.beginPath();
            if (this.position.y < 300) {
                Rodelhang.crc2.moveTo(4.5, 0.5);
                Rodelhang.crc2.lineTo(6.5, 1.5);
                Rodelhang.crc2.lineTo(4.5, 2);
            }
            else {
                Rodelhang.crc2.moveTo(3.5, -0.5);
                Rodelhang.crc2.lineTo(5.5, -0);
                Rodelhang.crc2.lineTo(3.5, 0.5);
            }
            Rodelhang.crc2.closePath();
            Rodelhang.crc2.fillStyle = "orange";
            Rodelhang.crc2.fill();
            Rodelhang.crc2.restore();
        }
    }
    Rodelhang.Bird = Bird;
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Birds.js.map