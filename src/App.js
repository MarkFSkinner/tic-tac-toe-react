import React from 'react';
import './App.scss';
import CurrentPlayer from './components/CurrentPlayer';
import Board from './components/Board';
import Controls from './components/Controls';
import Menu from './components/Menu';

function App() {
  return (
    <div className="container text-center">
      <CurrentPlayer />
      <Board />
      <Controls />
      <Menu />
    </div>
  );
}

export default App;
