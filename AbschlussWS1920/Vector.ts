namespace Rodelhang {
    export class Vector {

        x: number;
        y: number;

        public static getDifference(_minuend: Vector, _subtrahend: Vector): Vector {
            let result: Vector = new Vector(_minuend.x - _subtrahend.x, _minuend.y - _subtrahend.y);
            return result;
        }

        constructor(_x: number, _y: number) {
            this.set(_x, _y);

        }


        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }


        random(_minLength: number, _maxLength: number): void {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = Math.random() * -20 * Math.PI;

            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }

    }
}