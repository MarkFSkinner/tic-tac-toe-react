import React from 'react';
import './App.scss';
import CurrentPlayer from './components/CurrentPlayer';
import Board from './components/Board';
import Controls from './components/Controls';
import Menu from './components/Menu';

class App extends React.Component {
  state = {
    availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    playerOneMoves: [],
    playerTwoMoves: [],
    computerMoves: [],
    winCombos: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    gameStarted: false,
    numPlayers: undefined,
    playerOneToken: undefined,
    playerTwoToken: undefined,
    computerToken: undefined,
    difficultyLevel: undefined,
    currentPlayer: 'playerOne',
    win: undefined
  }


  render() {
    return (
      <div className='container text-center'>
        <CurrentPlayer />
        <Board />
        <Controls />
        <Menu />
      </div>
    );
  }
}

export default App;
