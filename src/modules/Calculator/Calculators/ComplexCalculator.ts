import { Complex } from '../Types';
import ICalculator from './ICalculator';

class ComplexCalculator implements ICalculator<Complex> {

    add(a: Complex, b: Complex): Complex {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a: Complex, b: Complex): Complex {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a: Complex, b: Complex): Complex {
        return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
    }

    prod(a: Complex, p: number): Complex {
        return new Complex(a.re * p, a.im * p);
    }

    div(a: Complex, b: Complex): Complex {
        const m = b.re ** 2 + b.im ** 2;
        return new Complex(
            (a.re * b.re + a.im * b.im) / m,
            (a.im * b.re - a.re * b.im) / m
        );
    }

    pow(a: Complex, n: number): Complex {
        let S = this.one();
        for (let i = 0; i < n; i++) {
            S = this.mult(S, a);
        }
        return S;
    }

    zero(): Complex {
        return new Complex();
    }

    one(): Complex {
        return new Complex(1);
    }
}

export default ComplexCalculator;