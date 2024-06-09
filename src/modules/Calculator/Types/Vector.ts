import AnyType from "./AnyType";

class Vector {
    values: AnyType[];
    
    constructor(values: AnyType[] = []) {
        this.values = [];
        values.forEach((el) => this.values.push(el));
    }

    // vector -> (1 2 3)
    toString(): string {
        return `(${this.values.map((el) => el.toString()).join(" ")})`;
    }
}

export default Vector;