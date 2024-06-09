import React, { useRef } from 'react';
import MathTarget from '../../modules/Target/MathTarget';

const Target: React.FC = () => {
    const xRef = useRef<HTMLInputElement>(null);
    const yRef = useRef<HTMLInputElement>(null);
    const countRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLSpanElement>(null);


    const shootHandler = () => {
        const target = new MathTarget();
        const x = Number(xRef.current?.value);
        const y = Number(yRef.current?.value);
        const count = Number(countRef.current?.value);
        let res = Number(resultRef.current?.textContent) || 0;
        res += target.shoot(x, y) * count;
        if (resultRef.current) {
            resultRef.current.textContent = res.toString();
        }
    }

    const resetHandler = () => {
        if (xRef.current) xRef.current.value = '';
        if (yRef.current) yRef.current.value = '';
        if (countRef.current) countRef.current.value = '';
        if (resultRef.current) resultRef.current.textContent = '0';
    }

    return (<>
        <div className="containerTarger">
            <input ref={xRef} placeholder="Координата X" className="inputTarget" />
            <input ref={yRef} placeholder="Координата Y" className="inputTarget" />
            <input ref={countRef} placeholder="Количество выстрелов" className="inputTarget" />
        </div>

        <button className="buttonTarger" onClick={shootHandler}>Выстрелить</button>
        <button className="buttonTarger" onClick={resetHandler}>Сбросить очки</button>
        <span ref={resultRef} className="buttonTarger" >Результат: {0}</span>
    </>);
};

export default Target;