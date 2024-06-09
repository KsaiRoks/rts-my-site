import Calculator from '../Calculator';
import AnyType from './AnyType';
import Member from './Member';

class Polynomial {
    poly: Member[];

    constructor(poly: Member[] = []) {
        this.poly = poly;
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(x: AnyType): AnyType {
        const calc = new Calculator();
        return this.poly.reduce(
            (S, elem) => calc.add(S, calc.prod(calc.pow(x, elem.power), elem.value)),
            calc.zero(x)
        );
    }

    // Polynomial -> 1*x^3+2*x^2+3*x^1+4
    toString(): string {
        return this.poly
            .map((member, index) =>
                member.value > 0
                    ? index === 0
                        ? member.toString()
                        : `+${member.toString()}`
                    : member.value === 0
                        ? `0`
                        : `${member.toString()}`
            )
            .join("");
    }
}

export default Polynomial;