import AnyType from "./AnyType";

class Matrix {
    values: AnyType[][];

    constructor(values: AnyType[][] = []) {
        this.values = [];
        values.forEach((arr, i) => {
            this.values[i] = [];
            arr.forEach((el) => this.values[i].push(el));
        });
    }

    /*
      1, 2, 3
      4, 5, 6
      8, 9, 7
      */
    toString(): string {
        return this.values
            .map((arr) => arr.map((el) => el.toString()).join(", "))
            .join("\n");
    }
}

export default Matrix;