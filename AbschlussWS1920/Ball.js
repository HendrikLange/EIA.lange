var Rodelhang;
(function (Rodelhang) {
    class Snowball {
        constructor(_size, _position) {
            this.position = _position;
            this.radius = _size;
        }
        draw() {
            Rodelhang.crc2.beginPath();
            Rodelhang.crc2.save();
            Rodelhang.crc2.translate(this.position.x, this.position.y);
            Rodelhang.crc2.scale(this.radius, this.radius);
            Rodelhang.crc2.arc(0, 0, this.radius * 4, 0, 10 * Math.PI);
            Rodelhang.crc2.fillStyle = "white";
            Rodelhang.crc2.strokeStyle = "grey";
            Rodelhang.crc2.lineWidth = 1;
            Rodelhang.crc2.fill();
            Rodelhang.crc2.stroke();
            Rodelhang.crc2.restore();
            Rodelhang.crc2.closePath();
        }
    }
    Rodelhang.Snowball = Snowball;
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Ball.js.map