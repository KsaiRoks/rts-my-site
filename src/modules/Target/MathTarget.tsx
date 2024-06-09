class MathTarget {

    shoot(x: number, y: number): number {
        if (!isNaN(x) && !isNaN(y)) {
            return this.checkCenter(x, y) || this.checkStar(x, y) || this.checkBetweenCircleAndSquare(x, y) || this.checkBetweenRhombAndCircle(x, y) || this.checkBetweenStarAndRhomb(x, y);
        }
        return 0;
    }

    checkOutTarget(x: number, y: number) {
        return ((Math.abs(x) >= 1) && (Math.abs(y) >= 1)) ? 0 : 0;
    }

    checkBetweenCircleAndSquare(x: number, y: number) {
        return (((x ** 2 + y ** 2) >= 1) && (((x <= 1 && x >= -1) && (y <= 1 && y >= -1)))) ? 1 : 0;
    }

    checkBetweenRhombAndCircle(x: number, y: number) {
        return (((x ** 2 + y ** 2) <= 1) && ((Math.abs(x) + Math.abs(y)) >= 1)) ? 2 : 0;
    }

    checkBetweenStarAndRhomb(x: number, y: number) {
        return (((Math.sqrt(1 - (Math.sqrt(1 - (Math.abs(x))) ** 4))) + Math.abs(y) >= 1) && ((Math.abs(x) + Math.abs(y)) <= 1)) ? 3 : 0;
    }

    checkStar(x: number, y: number) {
        return (((Math.sqrt(1 - (Math.sqrt(1 - (Math.abs(x))) ** 4))) + Math.abs(y) < 1) && (x !== 0 && y !== 0)) ? 4 : 0;
    }

    checkCenter(x: number, y: number) {
        return (x === 0 && y === 0) ? 10 : 0;
    }

}

export default MathTarget;