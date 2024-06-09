import { Polynomial, Member } from "../Types";
import ICalculator from "./ICalculator";
import RealCalculator from "./RealCalculator";

class PolynomialCalculator implements ICalculator<Polynomial> {
    polynomial(members: Member[]): Polynomial {
        return new Polynomial(members);
    }

    div() {
        return null;
    }

    add(a: Polynomial, b: Polynomial): Polynomial {
        const calc = new RealCalculator();
        const members: Member[] = [];
        a.poly.forEach((elemA) => {
            const member = b.poly.find((elemB) => elemB.power === elemA.power);
            if (member) {
                members.push(
                    new Member(calc.add(elemA.value, member.value), elemA.power)
                );
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach((elemB) => {
            if (!members.find((elem) => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        return new Polynomial(members);
    }

    sub(a: Polynomial, b: Polynomial): Polynomial {
        const calc = new RealCalculator();
        const members: Member[] = [];
        a.poly.forEach((elemA) => {
            const member = b.poly.find((elemB) => elemB.power === elemA.power);
            if (member) {
                members.push(
                    new Member(calc.sub(elemA.value, member.value), elemA.power)
                );
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach((elemB) => {
            if (!members.find((elem) => elem.power === elemB.power)) {
                members.push(new Member(calc.prod(elemB.value, -1), elemB.power));
            }
        });
        return new Polynomial(members);
    }

    mult(a: Polynomial, b: Polynomial): Polynomial {
        const calc = new RealCalculator();
        let polynomial = new Polynomial();
        a.poly.forEach((elemA) => {
            const members: Member[] = [];
            b.poly.forEach((elemB) => {
                members.push(
                    new Member(
                        calc.mult(elemA.value, elemB.value),
                        elemA.power + elemB.power
                    )
                );
            });
            polynomial = this.add(polynomial, new Polynomial(members));
        });
        return polynomial;
    }

    pow(a: Polynomial, n: number): Polynomial {
        let polynomial = this.one();
        for (let i = 0; i < n; i++) {
            polynomial = this.mult(polynomial, a);
        }
        return polynomial;
    }

    prod(a: Polynomial, n: number): Polynomial {
        let polynomial = new Polynomial();
        a.poly.forEach((elem) => {
            const member = new Member(elem.value * n, elem.power);
            polynomial.poly.push(member);
        });
        return polynomial;
    }

    zero(): Polynomial {
        return new Polynomial([new Member(0, 0)]);
    }

    one(): Polynomial {
        return new Polynomial([new Member(1, 0)]);
    }

    // polynom(a: Polynomial, n: number): Polynomial {
    //     return a.getValue(n);
    // }
}

export default PolynomialCalculator;