class Complex {
    re: number;
    im: number;

    constructor(re: number = 0, im: number = 0) {
        this.re = re;
        this.im = im;
    }

    // complex -> 2+i*3
    toString(): string {
        return this.im
            ? this.im > 0
                ? `${this.re}+i*${this.im}`
                : `${this.re}-i*${-this.im}`
            : this.re.toString();
    }
}

export default Complex;