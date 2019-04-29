$(function() {
    var gameStarted = false;
    var numPlayers;
    var playerOneToken;
    var playerTwoToken;
    var computerToken;
    var difficultyLevel;
    var currentPlayer = 'playerOne';
    var win;

    var winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    var gameState = {
        availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        playerOneMoves: [],
        playerTwoMoves: [],
        computerMoves: []
    }

    function selectNumPlayers(num) {
        var playerId;
        if (num === 1) {
            playerId = 'players-one';
        } else if (num === 2) {
            playerId = 'players-two';
        }
        $('#' + playerId).on('click', function() {
            numPlayers = num;
            $('.players-prompt').css('display', 'none');
            $('.token-prompt').css('display', 'inline-block');
        });
    }

    selectNumPlayers(1);
    selectNumPlayers(2);

    function selectPlayerToken(token) {
        if (token === 'X') {
            secondToken = 'O';
        } else if (token === 'O') {
            secondToken = 'X';
        }
        playerOneToken = token;
        if (numPlayers === 1) {
            computerToken = secondToken;
            $('.difficulty-prompt').css('display', 'block');
            $('#menu-holder').css('top', '1.875rem'); //30px
        } else if (numPlayers === 2) {
            playerTwoToken = secondToken;
            $('#menu').css('display', 'none');
            $('#current-player').css('display', 'block');
            $('#current-player').html('CURRENT PLAYER: 1');
            $('#menu-holder').css('top', '7.813rem'); //125px
            gameStarted = true;
        }
        $('.token-prompt').css('display', 'none');
    }

    $('#player-x').on('click', function() {
        selectPlayerToken('X');
    });

    $('#player-o').on('click', function() {
        selectPlayerToken('O');
    });

    function selectDifficulty(diff) {
        $('#' + diff).on('click', function() {
            difficultyLevel = diff;
            $('.difficulty-prompt').css('display', 'none');
            $('#menu').css('display', 'none');
            $('#menu-holder').css('top', '7.813rem'); //125px
            gameStarted = true;
        });
    }

    selectDifficulty('easy');
    selectDifficulty('medium');
    selectDifficulty('hard');

    function checkWin(player) {
        var match = 0;
        for (var i = 0; i < winCombos.length; i++) {
            for (var j = 0; j < winCombos[i].length; j++) {
                for (var k = 0; k < player.length; k++) {
                    if (player[k] === winCombos[i][j]) {
                        match += 1;
                        break;
                    }
                }
            }
            if (match === 3) {
                win = winCombos[i];
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
        if (checkWin(gameState.playerOneMoves) || checkWin(gameState.computerMoves) || checkWin(gameState.playerTwoMoves)) {
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
            var currentSquare = square.target.id;
            currentSquare = Number.parseFloat(currentSquare);
            if (gameState.availableMoves.indexOf(currentSquare) !== -1) {
                if (currentPlayer === 'playerOne') {
                    $('#' + currentSquare).html(playerOneToken);
                    gameState.playerOneMoves.push(currentSquare);
                    checkWin(gameState.playerOneMoves);
                } else if (currentPlayer === 'playerTwo') {
                    $('#' + currentSquare).html(playerTwoToken);
                    gameState.playerTwoMoves.push(currentSquare);
                    checkWin(gameState.playerTwoMoves);
                }
                if (gameWon()) {
                    for (var i = 0; i < win.length; i++) {
                        $('#' + win[i]).css('background-color', 'green');
                    }
                    if (numPlayers === 1) {
                        $('#result').html('YOU WIN!!!');
                    } else {
                        if (currentPlayer === 'playerOne') {
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
                gameState.availableMoves = remove(gameState.availableMoves, currentSquare);
                if (numPlayers === 1) {
                    computerTurn();
                } else if (numPlayers === 2 && !gameWon() && !checkTie()) {
                    if (currentPlayer === 'playerOne') {
                        currentPlayer = 'playerTwo';
                        $('#current-player').html('CURRENT PLAYER: 2');
                    } else {
                        currentPlayer = 'playerOne';
                        $('#current-player').html('CURRENT PLAYER: 1');
                    }
                }
                checkTie();
            }
        }
    }

    $('.square').on('click', function(e) {
        selectSquare(e);
    });

    function computerTurn() {
        if (gameState.availableMoves.length > 0 && !gameWon()) {
            var move;
            if (difficultyLevel === 'easy') {
                move = Math.floor(Math.random() * (9));
            } else if (difficultyLevel === 'hard') {
                move = bestComputerMove();
            } else if (difficultyLevel ==='medium') {
                var flip = Math.floor(Math.random() * (2));
                if (flip === 0) {
                    move = Math.floor(Math.random() * (9));
                } else if (flip === 1) {
                    move = bestComputerMove();
                }
            }
            if (gameState.availableMoves.indexOf(move) !== -1) {
                $('#' + move).html(computerToken);
                gameState.computerMoves.push(move);
                if (gameWon()) {
                    for (var i = 0; i < win.length; i++) {
                        $('#' + win[i]).css('background-color', 'red');
                    }
                    $('#menu').css('display', 'block');
                    $('#menu').css('background-color', 'rgba(161, 19, 16, 0.9)');
                    $('#menu').addClass('animated pulse');
                    $('#result').html('YOU LOSE!');
                    $('#result').css('display', 'block');
                }
                gameState.availableMoves = remove(gameState.availableMoves, move);
            } else {
                computerTurn();
            }
        }
    }

    function checkTie() {
        if (gameState.availableMoves.length === 0 && !gameWon()) {
            if (numPlayers === 2) {
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
            for (var i = 0; i < win.length; i++) {
                $('#' + win[i]).css('background-color', '');
            }
        }
        currentPlayer = 'playerOne';
        gameState.availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        gameState.playerOneMoves = [];
        gameState.playerTwoMoves = [];
        gameState.computerMoves = [];
        $('.square').html('');
        $('#menu').css('background-color', 'rgba(63, 121, 191, 0.9)');
        $('.token-prompt').css('display', 'none');
        $('.difficulty-prompt').css('display', 'none');
    }

    $('#replay').on('click', function() {
        if (gameStarted) {
            restart();
            if (numPlayers === 2) {
                $('#menu-holder').css('top', '7.813rem'); //125px
            }
            $('#menu').css('display', 'none');
            $('.players-prompt').css('display', 'none');
            $('#current-player').html('CURRENT PLAYER: 1');
            gameStarted = true;
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
        gameStarted = false;
    });

    function minimax(newGameState, player) {
        if (checkWin(newGameState.playerOneMoves)) {
            return {score: (-10 * (newGameState.availableMoves.length + 1))};
        } else if (checkWin(newGameState.computerMoves)) {
            return {score: (10 * (newGameState.availableMoves.length + 1))};
        } else if (newGameState.availableMoves.length === 0) {
            return {score: 0};
        }
        var moves = [];
        for (var i = 0; i < newGameState.availableMoves.length; i++) {
            var move = {};
            move.index = newGameState.availableMoves[i];
            var nextGameState = copy(newGameState);
            if (player === 'computer') {
                nextGameState.computerMoves.push(nextGameState.availableMoves[i]);
                nextGameState.availableMoves = remove(nextGameState.availableMoves, move.index);
                var result = minimax(nextGameState, 'person');
                move.score = result.score;
            } else {
                nextGameState.playerOneMoves.push(nextGameState.availableMoves[i]);
                nextGameState.availableMoves = remove(nextGameState.availableMoves, move.index);
                var result = minimax(nextGameState, 'computer');
                move.score = result.score;
            }
            moves.push(move);
        }
        //console.log(moves);
        var bestMove;
        if(player === 'computer') {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    //console.log("bestScore = " + bestScore);
                    bestMove = i;
                    //console.log("bestMove = " + bestMove);
                }
            }
        } else {
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    //console.log("bestScore = " + bestScore);
                    bestMove = i;
                    //console.log("bestMove = " + bestMove);
                }
            }
        }
        //console.log("moves[bestMove] = " + moves[bestMove]);
        return moves[bestMove];
    }

    function bestComputerMove() {
        return minimax(gameState, 'computer').index;
    }


//"Copy" function taken from https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
    function copy(o) {
        if (o === null) {
            return null;
        }
        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
           v = o[key];
           output[key] = (typeof v === 'object') ? copy(v) : v;
        }
        return output;
    }
})