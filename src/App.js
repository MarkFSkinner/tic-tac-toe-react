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
      let difficultySelection = document.getElementsByClassName('difficulty-prompt');
      for (let i = 0; i < difficultySelection.length; i++) {
        difficultySelection[i].style.display = 'block';
      }
      document.getElementById('menu-holder').style.top = '3.75rem';
    } else if (this.state.numPlayers === 2) {
      this.setState({
        playerTwoToken: secondToken,
        gameStarted: true
      });
      document.getElementById('menu').style.display = 'none';
      document.getElementById('current-player').style.display = 'block';
      document.getElementById('current-player').innerHTML = 'CURRENT PLAYER: 1';
      document.getElementById('menu-holder').style.top = '7.75rem';
    }
    let tokenSelection = document.getElementsByClassName('token-prompt');
    for (let i = 0; i < tokenSelection.length; i++) {
      tokenSelection[i].style.display = 'none';
    }
  }

  selectDifficulty = (e) => {
    this.setState({
      difficultyLevel: e.target.id,
      gameStarted: true
    });
    let difficultySelection = document.getElementsByClassName('difficulty-prompt');
    for (let i = 0; i < difficultySelection.length; i++) {
      difficultySelection[i].style.display = 'none';
    }
    document.getElementById('menu').style.display = 'none';
    document.getElementById('menu-holder').style.top = '8.25rem';
  }

  checkWin = (player) => {
    let match = 0;
    for (let i = 0; i < this.state.winCombos.length; i++) {
      for (let j = 0; j < this.state.winCombos[i].length; j++) {
        for (let k = 0; k < player.length; k++) {
          if (player[k] === this.state.winCombos[i][j]) {
            match += 1;
            break;
          }
        }
      }
      if (match === 3) {
        this.setState({
          win: this.state.winCombos[i]
        });
        return true;
      } else {
        match = 0;
      }
    }
    return false;
  }

  checkTie = () => {
    if (this.state.availableMoves.length === 0 && !this.gameWon()) {
      if (this.state.numPlayers === 2) {
        document.getElementById('menu-holder').style.top = '9.375rem';
      }
      document.getElementById('menu').style.display = 'block';
      document.getElementById('menu').classList.add('animated','pulse');
      document.getElementById('result').innerHTML = 'TIE GAME';
      document.getElementById('result').style.display = 'block';
      return true;
    } else {
      return false;
    }
  }

  gameWon = () => {
    if (this.checkWin(this.state.playerOneMoves) || this.checkWin(this.state.computerMoves) || this.checkWin(this.state.playerTwoMoves)) {
      return true;
    } else {
      return false;
    }
  }

  remove = (array, element) => {
    return array.filter(e => e !== element);
  }

  selectSquare = async (e) => {
    if(!this.gameWon()) {
      let currentSquare = e.target.id;
      currentSquare = Number.parseFloat(currentSquare);
      if (this.state.availableMoves.indexOf(currentSquare) !== -1) {
        if (this.state.currentPlayer === 'playerOne') {
          document.getElementById(currentSquare).innerHTML = this.state.playerOneToken;
          await this.setState({
            playerOneMoves: [...this.state.playerOneMoves, currentSquare]
          });
          this.checkWin(this.state.playerOneMoves);
        } else if (this.state.currentPlayer === 'playerTwo') {
          document.getElementById(currentSquare).innerHTML = this.state.playerTwoToken;
          await this.setState({
            playerTwoMoves: [...this.state.playerTwoMoves, currentSquare]
          });
          this.checkWin(this.state.playerTwoMoves);
        }
        if (this.gameWon()) {
          for (let i = 0; i < this.state.win.length; i++) {
            document.getElementById(this.state.win[i]).style.backgroundColor = '#E37222';
            document.getElementById(this.state.win[i]).style.color = 'hsl(0, 0%, 95%)';
          }
          if (this.state.numPlayers === 1) {
            document.getElementById('result').innerHTML = 'YOU WIN!!!';
          } else {
            if (this.state.currentPlayer === 'playerOne') {
              document.getElementById('result').innerHTML = 'PLAYER ONE WINS!!!';
            } else {
              document.getElementById('result').innerHTML = 'PLAYER TWO WINS!!!';
            }
          }
          document.getElementById('menu').style.display = 'block';
          document.getElementById('result').style.display = 'block';
          document.getElementById('menu').style.backgroundColor = '#078898';
          document.getElementById('menu').classList.add('animated','pulse');
        }
        await this.setState({
          availableMoves: this.remove(this.state.availableMoves, currentSquare)
        });
        if (this.state.numPlayers === 1) {
          this.computerTurn();
        } else if (this.state.numPlayers === 2 && !this.gameWon() && !this.checkTie()) {
          if (this.state.currentPlayer === 'playerOne') {
            await this.setState({
              currentPlayer: 'playerTwo'
            });
            document.getElementById('current-player').innerHTML = 'CURRENT PLAYER: 2';
          } else {
            await this.setState({
              currentPlayer: 'playerOne'
            });
            document.getElementById('current-player').innerHTML = 'CURRENT PLAYER: 1';
          }
        }
        this.checkTie();
      }
    }
  }

  computerFirstHardMove = (playerFirstMove) => {
    switch (playerFirstMove) {
      case 0:
      case 2:
      case 6:
      case 8:
        return 4;
      case 1:
      case 3:
      case 4:
        return 0;
      case 5:
        return 2;
      case 7:
        return 1;
      default:
        return undefined;
    }
  }

  computerTurn = async () => {
    if (this.state.availableMoves.length > 0 && !this.gameWon()) {
      let move;
      if (this.state.difficultyLevel === 'easy') {
        move = Math.floor(Math.random() * (9));
      } else if (this.state.difficultyLevel === 'hard') {
        if (this.state.availableMoves.length === 8) {
          move = this.computerFirstHardMove(this.state.playerOneMoves[0]);
        } else {
          move = this.bestComputerMove();
        }
      } else if (this.state.difficultyLevel ==='medium') {
        let flip = Math.floor(Math.random() * (2));
        if (flip === 0) {
          move = Math.floor(Math.random() * (9));
        } else if (flip === 1) {
          if (this.state.availableMoves.length === 8) {
            move = this.computerFirstHardMove(this.state.playerOneMoves[0]);
          } else {
            move = this.bestComputerMove();
          }
        }
      }
      if (this.state.availableMoves.indexOf(move) !== -1) {
        document.getElementById(move).innerHTML = this.state.computerToken;
        await this.setState({
          computerMoves: [...this.state.computerMoves, move]
        });
        if (this.gameWon()) {
          for (let i = 0; i < this.state.win.length; i++) {
            document.getElementById(this.state.win[i]).style.backgroundColor = '#EEAA7B';
            document.getElementById(this.state.win[i]).style.color = 'hsl(0, 0%, 95%)';
            document.getElementById(move).innerHTML = this.state.computerToken;
          }
          document.getElementById('menu').style.display = 'block';
          document.getElementById('menu').style.backgroundColor = '#66B9BF';
          document.getElementById('menu').classList.add('animated','pulse');
          document.getElementById('result').innerHTML = 'YOU LOSE!';
          document.getElementById('result').style.display = 'block';
        }
        await this.setState({
          availableMoves: this.remove(this.state.availableMoves, move)
        });
      } else {
        this.computerTurn();
      }
    }
  }

  restart = () => {
    if (this.gameWon()) {
      for (let i = 0; i < this.state.win.length; i++) {
        document.getElementById(this.state.win[i]).style.backgroundColor = '';
      }
    }
    this.setState({
      currentPlayer: 'playerOne',
      availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      playerOneMoves: [],
      playerTwoMoves: [],
      computerMoves: []
    });
    let squares = document.getElementsByClassName('square');
    for (let i = 0; i < squares.length; i++) {
      squares[i].innerHTML = '';
    }
    document.getElementById('menu').style.backgroundColor = '#66B9BF';
    let tokenSelection = document.getElementsByClassName('token-prompt');
    for (let i = 0; i < tokenSelection.length; i++) {
      tokenSelection[i].style.display = 'none';
    }
    let difficultySelection = document.getElementsByClassName('difficulty-prompt');
    for (let i = 0; i < difficultySelection.length; i++) {
      difficultySelection[i].style.display = 'none';
    }
  }

  minimax = (newGameState, player) => {
    if (this.checkWin(newGameState.playerOneMoves)) {
      return {score: (-10 * (newGameState.availableMoves.length + 1))};
    } else if (this.checkWin(newGameState.computerMoves)) {
      return {score: (10 * (newGameState.availableMoves.length + 1))};
    } else if (newGameState.availableMoves.length === 0) {
      return {score: 0};
    }
    let moves = [];
    for (let i = 0; i < newGameState.availableMoves.length; i++) {
      let move = {};
      move.index = newGameState.availableMoves[i];
      let nextGameState = this.copy(newGameState);
      if (player === 'computer') {
        nextGameState.computerMoves.push(nextGameState.availableMoves[i]);
        nextGameState.availableMoves = this.remove(nextGameState.availableMoves, move.index);
        let result = this.minimax(nextGameState, 'person');
        move.score = result.score;
      } else {
        nextGameState.playerOneMoves.push(nextGameState.availableMoves[i]);
        nextGameState.availableMoves = this.remove(nextGameState.availableMoves, move.index);
        let result = this.minimax(nextGameState, 'computer');
        move.score = result.score;
      }
      moves.push(move);
    }
    let bestMove;
    if(player === 'computer') {
      let bestScore = -10000;
      for(let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for(let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  bestComputerMove = () => {
    return this.minimax(this.state, 'computer').index;
  }

  //"Copy" function taken from https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
  copy = (o) => {
    if (o === null) {
      return null;
    }
    let output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
      v = o[key];
      output[key] = (typeof v === 'object') ? this.copy(v) : v;
    }
    return output;
  }

  handlePlayClick = () => {
    if (this.state.gameStarted) {
      this.restart();
      document.getElementById('menu').style.display = 'none';
      let playerSelection = document.getElementsByClassName('players-prompt');
      for (let i = 0; i < playerSelection.length; i++) {
        playerSelection[i].style.display = 'none';
      }
      document.getElementById('current-player').innerHTML = 'CURRENT PLAYER: 1';
      let squares = document.getElementsByClassName('square');
      for (let i = 0; i < squares.length; i++) {
        squares[i].style.color = '#E37222';
      }
      this.setState({
        gameStarted: true
      });
    }
  }

  handleResetClick = () => {
    this.restart();
    document.getElementById('menu-holder').style.top = '5.75rem';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('menu').classList.remove('animated','pulse');
    document.getElementById('result').innerHTML = '';
    let playerSelection = document.getElementsByClassName('players-prompt');
    for (let i = 0; i < playerSelection.length; i++) {
      playerSelection[i].style.display = 'inline-block';
    }
    document.getElementById('current-player').style.display = 'none';
    let squares = document.getElementsByClassName('square');
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.color = '#E37222';
    }
    this.setState({
      gameStarted: false
    });
  }

  render() {
    return (
      <div className='container text-center'>
        <CurrentPlayer />
        <Board
          selectSquare={this.selectSquare}
        />
        <Controls
          handlePlayClick={this.handlePlayClick}
          handleResetClick={this.handleResetClick}
        />
        <Menu
          selectNumPlayers={this.selectNumPlayers}
          selectPlayerToken={this.selectPlayerToken}
          selectDifficulty={this.selectDifficulty}
        />
      </div>
    );
  }
}

export default App;