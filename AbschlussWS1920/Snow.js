var Rodelhang;
(function (Rodelhang) {
    class Snow {
        constructor() {
            this.gradient = Rodelhang.crc2.createRadialGradient(0, 0, 0, 0, 0, 5);
            this.position = new Rodelhang.Vector(Math.random() * Rodelhang.crc2.canvas.width, Math.random() * Rodelhang.crc2.canvas.height);
            this.velocity = new Rodelhang.Vector(0, Math.random() + 1 * 5);
        }
        move() {
            let offset = new Rodelhang.Vector(this.velocity.x, this.velocity.y);
            this.position.add(offset);
            if (this.position.y > Rodelhang.crc2.canvas.height)
                this.position.y -= Rodelhang.crc2.canvas.height;
            if (this.position.x > Rodelhang.crc2.canvas.width)
                this.position.x -= Rodelhang.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += Rodelhang.crc2.canvas.height;
            if (this.position.x < 0)
                this.position.x += Rodelhang.crc2.canvas.width;
        }
        draw() {
            Rodelhang.crc2.beginPath();
            Rodelhang.crc2.save();
            Rodelhang.crc2.translate(this.position.x, this.position.y);
            Rodelhang.crc2.fillStyle = this.gradient;
            Rodelhang.crc2.arc(0, 0, 2, 0, 2 * Math.PI);
            Rodelhang.crc2.fillStyle = "white";
            Rodelhang.crc2.strokeStyle = "lightgrey";
            Rodelhang.crc2.stroke();
            Rodelhang.crc2.fill();
            Rodelhang.crc2.restore();
        }
    }
    Rodelhang.Snow = Snow;
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Snow.js.map