class Member {
    value: number;
    power: number;

    constructor(value: number = 0, power: number = 0) {
        this.value = value;
        this.power = power;
    }

    // member -> 2*x^3
    toString(): string {
        return `${this.value}*x^${this.power}`;
    }
}

export default Member;