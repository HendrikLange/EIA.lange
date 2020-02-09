var Rodelhang;
(function (Rodelhang) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        static getDifference(_minuend, _subtrahend) {
            let result = new Vector(_minuend.x - _subtrahend.x, _minuend.y - _subtrahend.y);
            return result;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = Math.random() * -20 * Math.PI;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
    }
    Rodelhang.Vector = Vector;
})(Rodelhang || (Rodelhang = {}));
//# sourceMappingURL=Vector.js.map