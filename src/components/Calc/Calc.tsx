import React, { useRef} from 'react';
import Calculator from '../../modules/Calculator/Calculator';
import { EOperand } from '../../modules/Calculator/Calculator';

const Calc: React.FC = () => {
    const aRef = useRef<HTMLTextAreaElement>(null);
    const bRef = useRef<HTMLTextAreaElement>(null);
    const resultRef = useRef<HTMLTextAreaElement>(null);

    const operandHandler = (operand: EOperand) => {
        const calc = new Calculator();
        const a = calc.getValue(aRef?.current?.value || '');
        const b = calc.getValue(bRef?.current?.value || '');
        const res = calc[operand](a, b);
        if (resultRef.current) {
            resultRef.current.value = res === null ? 'Недопустимая операция' : res.toString();
        }
    };

    const clearHandler = () => {
        if (aRef?.current && bRef?.current && resultRef?.current) {
            aRef.current.value = '';
            bRef.current.value = '';
            resultRef.current.value = '';
        }
    }

    return (
        <>
            <div className="textareas">
                <textarea ref={aRef} className="textareaCalc" placeholder="Input A" />
                <textarea ref={bRef} className="textareaCalc" placeholder="Input B" />
                <textarea ref={resultRef} className="textareaCalc" placeholder="Result" disabled />
            </div>

            <div className="operations_buttons">
                <button className="operand operandCalc" onClick={() => operandHandler(EOperand.add)}>+</button>
                <button className="operand operandCalc" onClick={() => operandHandler(EOperand.sub)}>-</button>
                <button className="operand operandCalc" onClick={() => operandHandler(EOperand.mult)}>*</button>
                <button className="operand operandCalc" onClick={() => operandHandler(EOperand.div)}>/</button>
                <button className="operand operandCalc" onClick={() => operandHandler(EOperand.prod)}>scal</button>
                <button className="operand operandCalc" onClick={() => operandHandler(EOperand.pow)}>^</button>
                {/* <button className="operand operandCalc" onClick={() => operandHandler(EOperand.polynom)}>poly</button> */}
                <button className="operandCalc" onClick={clearHandler}>C</button>
            </div>
        </>
    )
}

export default Calc;