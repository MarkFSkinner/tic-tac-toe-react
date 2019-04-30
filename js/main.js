const state = {
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
};

function selectNumPlayers(numArr) {
    for (let i = 0; i < numArr.length; i++) {
        let playerId;
        if (numArr[i] === 1) {
            playerId = 'players-one';
        } else if (numArr[i] === 2) {
            playerId = 'players-two';
        }
        $('#' + playerId).on('click', function() {
            state.numPlayers = numArr[i];
            $('.players-prompt').css('display', 'none');
            $('.token-prompt').css('display', 'inline-block');
        });
    }
}

function selectPlayerToken(token) {
    let secondToken;
    if (token === 'X') {
        secondToken = 'O';
    } else if (token === 'O') {
        secondToken = 'X';
    }
    state.playerOneToken = token;
    if (state.numPlayers === 1) {
        state.computerToken = secondToken;
        $('.difficulty-prompt').css('display', 'block');
        $('#menu-holder').css('top', '1.875rem'); //30px
    } else if (state.numPlayers === 2) {
        state.playerTwoToken = secondToken;
        $('#menu').css('display', 'none');
        $('#current-player').css('display', 'block');
        $('#current-player').html('CURRENT PLAYER: 1');
        $('#menu-holder').css('top', '7.813rem'); //125px
        state.gameStarted = true;
    }
    $('.token-prompt').css('display', 'none');
}

function selectDifficulty(diffArr) {
    for (let i = 0; i < diffArr.length; i++) {
        $('#' + diffArr[i]).on('click', function() {
            state.difficultyLevel = diffArr[i];
            $('.difficulty-prompt').css('display', 'none');
            $('#menu').css('display', 'none');
            $('#menu-holder').css('top', '7.813rem'); //125px
            state.gameStarted = true;
        });
    }
}

function checkWin(player) {
    let match = 0;
    for (let i = 0; i < state.winCombos.length; i++) {
        for (let j = 0; j < state.winCombos[i].length; j++) {
            for (let k = 0; k < player.length; k++) {
                if (player[k] === state.winCombos[i][j]) {
                    match += 1;
                    break;
                }
            }
        }
        if (match === 3) {
            state.win = state.winCombos[i];
            return true;
        } else {
            match = 0;
        }
    }
    if (match !== 3) {
        return false;
    }
}

function gameWon() {
    if (checkWin(state.playerOneMoves) || checkWin(state.computerMoves) || checkWin(state.playerTwoMoves)) {
        return true;
    } else {
        return false;
    }
}

function remove(array, element) {
    return array.filter(e => e !== element);
}

function selectSquare(square) {
    if(!gameWon()) {
        let currentSquare = square.target.id;
        currentSquare = Number.parseFloat(currentSquare);
        if (state.availableMoves.indexOf(currentSquare) !== -1) {
            if (state.currentPlayer === 'playerOne') {
                $('#' + currentSquare).html(state.playerOneToken);
                state.playerOneMoves.push(currentSquare);
                checkWin(state.playerOneMoves);
            } else if (state.currentPlayer === 'playerTwo') {
                $('#' + currentSquare).html(state.playerTwoToken);
                state.playerTwoMoves.push(currentSquare);
                checkWin(state.playerTwoMoves);
            }
            if (gameWon()) {
                for (let i = 0; i < state.win.length; i++) {
                    $('#' + state.win[i]).css('background-color', 'green');
                }
                if (state.numPlayers === 1) {
                    $('#result').html('YOU WIN!!!');
                } else {
                    if (state.currentPlayer === 'playerOne') {
                        $('#result').html('PLAYER ONE WINS!!!');
                    } else {
                        $('#result').html('PLAYER TWO WINS!!!');
                    }
                }
                $('#menu').css('display', 'block');
                $('#result').css('display', 'block');
                $('#menu').css('background-color', 'rgba(16, 136, 18, 0.9)');
                $('#menu').addClass('animated pulse');
            }
            state.availableMoves = remove(state.availableMoves, currentSquare);
            if (state.numPlayers === 1) {
                computerTurn();
            } else if (state.numPlayers === 2 && !gameWon() && !checkTie()) {
                if (state.currentPlayer === 'playerOne') {
                    state.currentPlayer = 'playerTwo';
                    $('#current-player').html('CURRENT PLAYER: 2');
                } else {
                    state.currentPlayer = 'playerOne';
                    $('#current-player').html('CURRENT PLAYER: 1');
                }
            }
            checkTie();
        }
    }
}

function computerTurn() {
    if (state.availableMoves.length > 0 && !gameWon()) {
        let move;
        if (state.difficultyLevel === 'easy') {
            move = Math.floor(Math.random() * (9));
        } else if (state.difficultyLevel === 'hard') {
            move = bestComputerMove();
        } else if (state.difficultyLevel ==='medium') {
            let flip = Math.floor(Math.random() * (2));
            if (flip === 0) {
                move = Math.floor(Math.random() * (9));
            } else if (flip === 1) {
                move = bestComputerMove();
            }
        }
        if (state.availableMoves.indexOf(move) !== -1) {
            $('#' + move).html(state.computerToken);
            state.computerMoves.push(move);
            if (gameWon()) {
                for (let i = 0; i < state.win.length; i++) {
                    $('#' + state.win[i]).css('background-color', 'red');
                }
                $('#menu').css('display', 'block');
                $('#menu').css('background-color', 'rgba(161, 19, 16, 0.9)');
                $('#menu').addClass('animated pulse');
                $('#result').html('YOU LOSE!');
                $('#result').css('display', 'block');
            }
            state.availableMoves = remove(state.availableMoves, move);
        } else {
            computerTurn();
        }
    }
}

function checkTie() {
    if (state.availableMoves.length === 0 && !gameWon()) {
        if (state.numPlayers === 2) {
            $('#menu-holder').css('top', '9.375rem'); //150px
        }
        $('#menu').css('display', 'block');
        $('#menu').addClass('animated pulse');
        $('#result').html('TIE GAME');
        $('#result').css('display', 'block');
        return true;
    } else {
        return false;
    }
}

function restart() {
    if (gameWon()) {
        for (let i = 0; i < state.win.length; i++) {
            $('#' + state.win[i]).css('background-color', '');
        }
    }
    state.currentPlayer = 'playerOne';
    state.availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    state.playerOneMoves = [];
    state.playerTwoMoves = [];
    state.computerMoves = [];
    $('.square').html('');
    $('#menu').css('background-color', 'rgba(63, 121, 191, 0.9)');
    $('.token-prompt').css('display', 'none');
    $('.difficulty-prompt').css('display', 'none');
}

function minimax(newGameState, player) {
    if (checkWin(newGameState.playerOneMoves)) {
        return {score: (-10 * (newGameState.availableMoves.length + 1))};
    } else if (checkWin(newGameState.computerMoves)) {
        return {score: (10 * (newGameState.availableMoves.length + 1))};
    } else if (newGameState.availableMoves.length === 0) {
        return {score: 0};
    }
    let moves = [];
    for (let i = 0; i < newGameState.availableMoves.length; i++) {
        let move = {};
        move.index = newGameState.availableMoves[i];
        let nextGameState = copy(newGameState);
        if (player === 'computer') {
            nextGameState.computerMoves.push(nextGameState.availableMoves[i]);
            nextGameState.availableMoves = remove(nextGameState.availableMoves, move.index);
            let result = minimax(nextGameState, 'person');
            move.score = result.score;
        } else {
            nextGameState.playerOneMoves.push(nextGameState.availableMoves[i]);
            nextGameState.availableMoves = remove(nextGameState.availableMoves, move.index);
            let result = minimax(nextGameState, 'computer');
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

function bestComputerMove() {
    return minimax(state, 'computer').index;
}

//"Copy" function taken from https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
function copy(o) {
    if (o === null) {
        return null;
    }
    let output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
       v = o[key];
       output[key] = (typeof v === 'object') ? copy(v) : v;
    }
    return output;
}

//Run on page load
$(function() {
    selectNumPlayers([1, 2]);

    $('#player-x').on('click', function() {
        selectPlayerToken('X');
    });

    $('#player-o').on('click', function() {
        selectPlayerToken('O');
    });

    selectDifficulty(['easy', 'medium', 'hard']);

    $('.square').on('click', function(e) {
        selectSquare(e);
    });

    $('#replay').on('click', function() {
        if (state.gameStarted) {
            restart();
            if (state.numPlayers === 2) {
                $('#menu-holder').css('top', '7.813rem'); //125px
            }
            $('#menu').css('display', 'none');
            $('.players-prompt').css('display', 'none');
            $('#current-player').html('CURRENT PLAYER: 1');
            state.gameStarted = true;
        }
    });

    $('#reset').on('click', function() {
        restart();
        $('#menu-holder').css('top', '5.313rem'); //85px
        $('#menu').css('display', 'block');
        $('#menu').removeClass('animated pulse');
        $('#result').html('');
        $('.players-prompt').css('display', 'inline-block');
        $('#current-player').css('display', 'none');
        state.gameStarted = false;
    });
})