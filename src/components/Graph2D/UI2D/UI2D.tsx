import React, { useState } from "react";
import Func from "./Func/Func";
import { TFunction } from "../Graph2D";
import useMyFunction from "./hooks/useMyFunction";

type TUI2D = {
    funcs: TFunction[];
}

const UI2D: React.FC<TUI2D> = (props: TUI2D) => {
    const { funcs } = props;
    const [count, setCount] = useState<number>(funcs.length);
    const [getFunction] = useMyFunction();

    const addFunction = () => {
        funcs.push({
            f: getFunction('0'),
            color: 'purple',
            width: 4
        });
        setCount(funcs.length);
    }

    const delFunction = (index: number): void => {
        funcs.splice(index, 1)
        setCount(funcs.length);
    }

    return (<div>
        <button onClick={addFunction}>+</button>
        <div>
            {funcs.map((func, index) =>
                <Func
                    key={`${index}${Math.random()}`}
                    func={func}
                    index={index}
                    delFunction={delFunction}
                />
            )}
        </div>
        <div>Количество функций: {count}</div>
    </div>);
}

export default UI2D;