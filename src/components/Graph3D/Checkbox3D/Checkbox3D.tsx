import React from "react";
import { ECustom } from "../Graph3D";

type TCheckbox3D = {
    text: string;
    id: string;
    custom: ECustom;
    customValue: boolean;
    changeValue: (flag: ECustom, value: boolean) => void;
};

const Checkbox3D: React.FC<TCheckbox3D> = (props: TCheckbox3D) => {
    const { id, text, custom, customValue, changeValue } = props;

    const checkboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { dataset, checked } = event.target;
        const flag = dataset.custom as ECustom;
        changeValue(flag, checked);
    }

    return (<>
        <label htmlFor={id}>{text}</label>
        <input
            onChange={checkboxClick}
            id={id}
            data-custom={custom}
            type="checkbox"
            defaultChecked={customValue}
        />
    </>);
}

export default Checkbox3D;