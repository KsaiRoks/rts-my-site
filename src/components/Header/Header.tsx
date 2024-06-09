import React from "react";
import { EPages } from "../../App";

type THeader = {
    setPageName: (name: EPages) => void;
}

const Header: React.FC<THeader> = ( props:THeader ) => {
    const {setPageName} = props;
    return (
        <div className='header'>
            <button className='headerButton' onClick={() => setPageName(EPages.Essay)}>Essay</button>
            <button className='headerButton' onClick={() => setPageName(EPages.Target)}>Target</button>
            <button className='headerButton' onClick={() => setPageName(EPages.Game)}>Game</button>
            <button className='headerButton' onClick={() => setPageName(EPages.Calc)}>Calc</button>
            <button className='headerButton' onClick={() => setPageName(EPages.Graph2D)}>Graph2D</button>
            <button className='headerButton' onClick={() => setPageName(EPages.Graph3D)}>Graph3D</button>
        </div>
    )
}

export default Header;