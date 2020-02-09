var Rodelhang;
(function (Rodelhang) {
    class Tree extends Rodelhang.Draw {
        constructor() {
            super();
            this.xP = 60 + Math.random() * 450;
            this.yP = 300 + Math.random() * 190;
            this.color = "#799F0C";
        }
        draw() {
            Rodelhang.crc2.fillStyle = this.color;
            Rodelhang.crc2.beginPath();
            Rodelhang.crc2.moveTo(this.xP, this.yP);
            Rodelhang.crc2.lineTo(this.xP + 50, this.yP + 120);
            Rodelhang.crc2.lineTo(this.xP - 50, this.yP + 120);
            Rodelhang.crc2.closePath();
            Rodelhang.crc2.strokeStyle = "#49311C";
            Rodelhang.crc2.stroke();
            Rodelhang.crc2.fillStyle = this.color;
            Rodelhang.crc2.fill();
            Rodelhang.crc2.moveTo(this.xP, this.yP + 90);
            Rodelhang.crc2.beginPath();
            Rodelhang.crc2.lineTo(this.xP, this.yP + 120);
            Rodelhang.crc2.lineTo(this.xP, this.yP + 150);
            Rodelhang.crc2.closePath();
            Rodelhang.crc2.stroke();
        }
    }
    Rodelhang.Tree = Tree;
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Trees.js.map