import ICalculator from "./ICalculator";

class RealCalculator implements ICalculator<number> {
    add(a: number, b: number): number {
        return a + b;
    }
    sub(a: number, b: number): number {
        return a - b;
    }
    mult(a: number, b: number): number {
        return a * b;
    }
    div(a: number, b: number): number {
        return a / b;
    }
    pow(a: number, n: number): number {
        return Math.pow(a, n);
    }
    prod(a: number, p: number): number {
        return a * p;
    }
    zero(): number {
        return 0;
    }
    one(): number {
        return 1;
    }
}

export default RealCalculator;