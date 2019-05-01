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

  selectNumPlayers = (e) => {
    if (e.target.id === 'players-one') {
      this.setState({
        numPlayers: 1
      });
    } else if (e.target.id === 'players-two') {
      this.setState({
        numPlayers: 2
      });
    }
    let playerSelection = document.getElementsByClassName('players-prompt');
    for (let i = 0; i < playerSelection.length; i++) {
      playerSelection[i].style.display = 'none';
    }
    let tokenSelection = document.getElementsByClassName('token-prompt');
    for (let i = 0; i < tokenSelection.length; i++) {
      tokenSelection[i].style.display = 'inline-block';
    }
  }

  selectPlayerToken = (e) => {
    let firstToken;
    let secondToken;
    if (e.target.id === 'player-x') {
      firstToken = 'X';
      secondToken = 'O';
    } else if (e.target.id === 'player-o') {
      firstToken = 'O';
      secondToken = 'X';
    }
    this.setState({
      playerOneToken: firstToken
    });
    if (this.state.numPlayers === 1) {
      this.setState({
        computerToken: secondToken
      });
      //$('.difficulty-prompt').css('display', 'block');
      let difficultySelection = document.getElementsByClassName('difficulty-prompt');
      for (let i = 0; i < difficultySelection.length; i++) {
        difficultySelection[i].style.display = 'block';
      }
      //$('#menu-holder').css('top', '3.75rem');
      document.getElementById('menu-holder').style.top = '3.75rem';
    } else if (this.state.numPlayers === 2) {
      this.setState({
        playerTwoToken: secondToken,
        gameStarted: true
      });
      //$('#menu').css('display', 'none');
      document.getElementById('menu').style.display = 'none';
      //$('#current-player').css('display', 'block');
      document.getElementById('current-player').style.display = 'block';
      //$('#current-player').html('CURRENT PLAYER: 1');
      document.getElementById('current-player').html = 'CURRENT PLAYER: 1';
      //$('#menu-holder').css('top', '7.75rem');
      document.getElementById('menu-holder').style.top = '7.75rem';
      //state.gameStarted = true;
    }
    //$('.token-prompt').css('display', 'none');
    let tokenSelection = document.getElementsByClassName('token-prompt');
    for (let i = 0; i < tokenSelection.length; i++) {
      tokenSelection[i].style.display = 'none';
    }
  }


  render() {
    return (
      <div className='container text-center'>
        <CurrentPlayer />
        <Board />
        <Controls />
        <Menu
          selectNumPlayers={this.selectNumPlayers}
          selectPlayerToken={this.selectPlayerToken}
        />
      </div>
    );
  }
}

export default App;
