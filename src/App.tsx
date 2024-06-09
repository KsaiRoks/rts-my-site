import React, { useState } from 'react';
import Essay from './components/Essay/Essay';
import Target from './components/Target/Target';
import Game from './components/Game/Game';
import Calc from './components/Calc/Calc';
import Graph2D from './components/Graph2D/Graph2D';
import Graph3D from './components/Graph3D/Graph3D';
import Header from './components/Header/Header';
import './App.css';

export enum EPages {
  Essay = 'Essay',
  Target = 'Target',
  Game = 'Game',
  Calc = 'Calc',
  Graph2D = 'Graph2D',
  Graph3D = 'Graph3D'
}

const App: React.FC = () => {
  const [pageName, setPageName] = useState<EPages>(EPages.Essay);
  return (
    <>
      <Header setPageName={setPageName} />
      {pageName === EPages.Essay && <Essay />}
      {pageName === EPages.Target && <Target />}
      {pageName === EPages.Game && <Game />}
      {pageName === EPages.Calc && <Calc />}
      {pageName === EPages.Graph2D && <Graph2D />}
      {pageName === EPages.Graph3D && <Graph3D />}
    </>
  )
}

export default App;
