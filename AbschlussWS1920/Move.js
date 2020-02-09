var Rodelhang;
(function (Rodelhang) {
    class Move {
        constructor() {
            let x = 1000 * Math.random();
            let y = 900 * Math.random();
            this.position = new Rodelhang.Vector(x, y);
        }
        move() {
            this.position.add(this.velocity);
            if (this.position.x > Rodelhang.crc2.canvas.width) {
                this.position.x -= Rodelhang.crc2.canvas.width;
                this.position.y = Rodelhang.crc2.canvas.height * Math.random();
            }
            if (this.position.y > Rodelhang.crc2.canvas.height) {
                this.position.y -= Rodelhang.crc2.canvas.height;
                this.position.x = Rodelhang.crc2.canvas.width * Math.random();
            }
            let yWerte = [2, 1.5, 3];
            let n = Math.floor(Math.random() * 2.5);
            if (this.velocity.x > 2 && this.position.x > Rodelhang.crc2.canvas.width / 1.5) {
                let s = Math.random() - 0.5;
                if (s < 0) {
                    s = -2;
                }
                if (s > 0) {
                    s = 2;
                }
                let yVelo = yWerte[n] * s;
                this.velocity.y = yVelo;
            }
        }
    }
    Rodelhang.Move = Move;
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Move.js.map