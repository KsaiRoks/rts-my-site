import React, { KeyboardEvent } from "react";
import { TFunction } from "../../Graph2D";
import useMyFunction from "../hooks/useMyFunction";

type TFunc = {
    func: TFunction;
    index: number;
    delFunction: (index: number) => void;
}

const Func: React.FC<TFunc> = (props: TFunc) => {
    const { func, index, delFunction } = props;
    const [getFunction, getFunctionBody] = useMyFunction();

    const changeFunction = (event: KeyboardEvent<HTMLInputElement>) => {
        func.f = getFunction(event.currentTarget.value);
    }

    const changeColor = (event: KeyboardEvent<HTMLInputElement>) => {
        func.color = event.currentTarget.value;
    }

    const changeWidth = (event: KeyboardEvent<HTMLInputElement>) => {
        const width = Number(event.currentTarget.value);
        if (!isNaN(width) && width > 0 && width < 10) {
            func.width = width;
        }
    }

    return (<div>
        <input
            onKeyUp={changeFunction}
            placeholder="f(x)"
            defaultValue={getFunctionBody(func.f)}
        />
        <input
            onKeyUp={changeColor}
            placeholder="color"
            defaultValue={func.color}
        />
        <input
            onKeyUp={changeWidth}
            placeholder="width"
            defaultValue={func.width}
        />
        <button onClick={() => delFunction(index)}>-</button>
    </div>);
}

export default Func;