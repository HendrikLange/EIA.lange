var Rodelhang;
(function (Rodelhang) {
    class Snow extends Rodelhang.Draw {
        constructor() {
            super();
            this.xP = Math.random() * 1400;
            this.yP = Math.random() * 700;
        }
        move() {
            this.yD = 4;
            this.xD = Math.random() * 0;
            this.xP += this.xD;
            this.yP += this.yD;
            if (this.yP > 600) {
                this.yP = 0;
            }
        }
        draw() {
            Rodelhang.crc2.fillStyle = this.color;
            Rodelhang.crc2.fillStyle = "white";
            Rodelhang.crc2.strokeStyle = "grey";
            Rodelhang.crc2.lineWidth = 1;
            Rodelhang.crc2.beginPath();
            Rodelhang.crc2.moveTo(this.xP - 2, this.yP + 1);
            Rodelhang.crc2.lineTo(this.xP, this.yP - 2);
            Rodelhang.crc2.lineTo(this.xP + 3, this.yP + 3);
            Rodelhang.crc2.closePath();
            Rodelhang.crc2.fill();
            Rodelhang.crc2.stroke();
        }
    }
    Rodelhang.Snow = Snow;
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Snow.js.map