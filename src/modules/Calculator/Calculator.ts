import { Complex, Vector, Matrix, Member, Polynomial } from './Types';
import { RealCalculator, ComplexCalculator, VectorCalculator, MatrixCalculator, PolynomialCalculator } from './Calculators';
import ICalculator from './Calculators/ICalculator';
import AnyType from './Types/AnyType';

export enum EOperand {
    add = 'add',
    sub = 'sub',
    mult = 'mult',
    div = 'div',
    prod = 'prod',
    pow = 'pow',
    one = 'one',
    zero = 'zero',
    // polynom = 'polynom',
}

class Calculator implements ICalculator<AnyType> {

    Complex(re?: number, im?: number): Complex {
        return new Complex(re, im);
    }

    Vector(values?: AnyType[]) {
        return new Vector(values);
    }

    Matrix(values?: AnyType[][]) {
        return new Matrix(values);
    }

    getComplex(str: string): Complex {
        if (str && typeof str === "string") {
            const arrStr = str.split("i*");
            if (arrStr.length === 2) {
                // 2+i*5
                if (arrStr[0].includes("+")) {
                    arrStr[0] = arrStr[0].replace("+", "");
                    return new Complex(Number(arrStr[0]), Number(arrStr[1]));
                }
                // 2-i*5
                if (arrStr[0].includes("-")) {
                    arrStr[0] = arrStr[0].replace("-", "");
                    return new Complex(Number(arrStr[0]), -Number(arrStr[1]));
                }
            }
            if (str.includes("i")) {
                return this.getComplex(str.replace("i", "i*1"));
            }
            if (arrStr.length === 1) {
                if (isNaN(Number(arrStr[0]))) return new Complex();
                return new Complex(Number(arrStr[0]) - 0);
            }
        }
        return new Complex();
    }

    getVector(str: string): Vector {
        if (str && typeof str === "string") {
            const arr = str
                .replace("(", "")
                .replace(")", "")
                .split(" ")
                .map((el: string) => this.getValue(el));
            return new Vector(arr);
        }
        return new Vector();
    }

    getMatrix(str: string): Matrix {
        if (str && typeof str === "string") {
            const arr = str.replace(' ', '').split('\n');
            const values = [];
            for (let i = 0; i < arr.length; i++) {
                values.push(arr[i].split(",").map((el) => this.getValue(el)));
            }
            if (values[0] instanceof Array) {
                return new Matrix(values);
            }
        }
        return new Matrix();
    }

    getPolynomial(str: string): Polynomial {
        if (str && typeof str === "string") {
            const arrStr = str
                .replaceAll("-", "+-")
                .split("+")
                .map((el) => {
                    const arr = el.split("*x^");
                    return new Member(Number(arr[0]), Number(arr[1]));
                });
            return new Polynomial(arrStr);
        }
        return new Polynomial();
    }

    get(elem?: AnyType): ICalculator<AnyType> {
        if (elem instanceof Matrix) {
            return new MatrixCalculator(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new VectorCalculator(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new ComplexCalculator();
        }
        if (elem instanceof Polynomial) {
            return new PolynomialCalculator();
        }
        return new RealCalculator();
    }

    [EOperand.add](a: AnyType, b: AnyType): AnyType {
        return this.get(a).add(a, b);
    }
    [EOperand.sub](a: AnyType, b: AnyType): AnyType {
        return this.get(a).sub(a, b);
    }
    [EOperand.mult](a: AnyType, b: AnyType): AnyType {
        return this.get(a).mult(a, b);
    }
    [EOperand.div](a: AnyType, b: AnyType): AnyType | null {
        return this.get(a).div(a, b);
    }
    [EOperand.pow](a: AnyType, n: number): AnyType {
        return this.get(a).pow(a, n);
    }
    [EOperand.prod](a: AnyType, p: number): AnyType {
        return this.get(a).prod(a, p);
    }
    // [EOperand.polynom](a: AnyType, n: number): AnyType {
    //     return this.get(a).polynom(a, n);
    // }

    [EOperand.zero]( elem: AnyType): AnyType {
        const type = elem ? elem.constructor.name : null;
        switch (type) {
            case "Complex":
                return this.get(this.Complex()).zero();
            case "Vector":
                return this.get(elem).zero((elem as Vector).values.length);
            case "Matrix":
                return this.get(elem).zero((elem as Matrix).values.length);
            default:
                return this.get().zero();
        }
    }

    [EOperand.one](elem: AnyType): AnyType {
        const type = elem ? elem.constructor.name : null;
        switch (type) {
            case "Complex":
                return this.get(this.Complex()).one();
            case "Vector":
                return this.get(elem).zero((elem as Vector).values.length);
            case "Matrix":
                return this.get(elem).zero((elem as Matrix).values.length);
            default:
                return this.get().one();
        }
    }

    getValue(str: string) {
        if (str.includes("\n")) return this.getMatrix(str);
        if (str.includes("(")) return this.getVector(str);
        if (str.includes("i")) return this.getComplex(str);
        if (str.includes("*x^")) return this.getPolynomial(str);
        return Number(str);
    }
}

export default Calculator;