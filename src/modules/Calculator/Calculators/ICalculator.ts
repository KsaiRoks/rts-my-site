import { EOperand } from "../Calculator"

export default interface ICalculator<T> {
    [EOperand.add](a: T, b: T): T;
    [EOperand.sub](a: T, b: T): T;
    [EOperand.mult](a: T, b: T): T;
    [EOperand.div](a?: T, b?: T): T | null;
    [EOperand.prod](a: T, p: number): T;
    [EOperand.pow](a: T, p: number): T;
    [EOperand.one](a?: T | number): T;
    [EOperand.zero](a?: T | number): T;
    // [EOperand.polynom](a:T, n: number): T;
}