$(function() {
    //$("#menu").hide();
    var gameStarted = false;
    var personToken;
    var secondPersonToken;
    var computerToken;
    var difficultyLevel;
    var numPlayers;
    var currentPlayer = "playerOne";

    $('#players-one').on('click', function() {
        numPlayers = 1;
        $('.players-prompt').css("display", "none");
        $('.token-prompt').css("display", "inline-block");
    });

    $('#players-two').on('click', function() {
        numPlayers = 2;
        $('.players-prompt').css("display", "none");
        $('.token-prompt').css("display", "inline-block");
    });

    $('#player-x').on('click', function() {
        if (numPlayers === 1) {
            personToken = "X";
            computerToken = "O";
            $('.difficulty-prompt').css("display", "block");
            $('#menu-holder').css("top", "30px");
        } else if (numPlayers === 2) {
            personToken = "X";
            secondPersonToken = "O";
            $('#menu').css("display", "none");
            $('#current-player').css("display", "block");
            $('#current-player').html("CURRENT PLAYER: 1");
            $('#menu-holder').css("top", "125px");
            gameStarted = true;
        }
        $('.token-prompt').css("display", "none");
        /*$('#menu').html("<div class='selection-prompt'>Please Select Difficulty:</div>"
            + "<div id='easy' class='btn btn-primary btn-lg'>Easy as Fuck</div>"
            + "<div id='hard' class='btn btn-primary btn-lg'>Hard as Balls</div>");*/
        //$('#menu').css("display", "none");
    });

    $('#player-o').on('click', function() {
        if (numPlayers === 1) {
            personToken = "O";
            computerToken = "X";
            $('.difficulty-prompt').css("display", "block");
            $('#menu-holder').css("top", "30px");
        } else if (numPlayers === 2) {
            personToken = "O";
            secondPersonToken = "X";
            $('#menu').css("display", "none");
            $('#current-player').css("display", "block");
            $('#current-player').html("CURRENT PLAYER: 1");
            $('#menu-holder').css("top", "125px");
            gameStarted = true;
        }
        $('.token-prompt').css("display", "none");
        //var newtop = $('#menu').position().top - 100;
        //$('#menu').css('top', newtop + 'px');
        /*$('#menu').html("<div class='selection-prompt'>Please Select Difficulty:</div>"
            + "<div id='easy' class='btn btn-primary btn-lg'>Easy as Fuck</div>"
            + "<div id='hard' class='btn btn-primary btn-lg'>Hard as Balls</div>");*/
        //$('#menu').css("display", "none");

    });

    $('#easy').on('click', function() {
        difficultyLevel = "easy";
        $('.difficulty-prompt').css("display", "none");
        $('#menu').css("display", "none");
        $('#menu-holder').css("top", "125px");
        gameStarted = true;
    });

    $('#medium').on('click', function() {
        difficultyLevel = "medium";
        $('.difficulty-prompt').css("display", "none");
        $('#menu').css("display", "none");
        $('#menu-holder').css("top", "125px");
        gameStarted = true;
    });

    $('#hard').on('click', function() {
        difficultyLevel = "hard";
        $('.difficulty-prompt').css("display", "none");
        $('#menu').css("display", "none");
        $('#menu-holder').css("top", "125px");
        gameStarted = true;
    });

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
    var win;

    var gameState = {
        availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        personMoves: [],
        computerMoves: [],
        secondPersonMoves: []
    }
/*
    var availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var personMoves = [];
    var computerMoves = [];
*/
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
                break;
            } else {
                match = 0;
            }
        }
        if (match === 3) {
            //alert("WIN!");
            return true;
        } else {
            return false;
        }
    }

    function gameWon() {
        if (checkWin(gameState.personMoves) || checkWin(gameState.computerMoves) || checkWin(gameState.secondPersonMoves)) {
            //alert("WIN!");
            return true;
        } else {//if (checkWin(computerMoves)) {
            return false;
        }
    }

    function remove(array, element) {
        return array.filter(e => e !== element);
    }

    /*function playerMove(player, square) {
        $(this).html(player);
        player.push(square);
        checkWin(player);
    }*/


    $('.square').on('click', function(e) {
        /*console.log("-------------------------------");
        console.log("numPlayers = " + numPlayers);
        console.log("currentPlayer = " + currentPlayer);
        console.log("personToken = " + personToken);
        console.log("secondPersonToken = " + secondPersonToken);*/
        if(!gameWon()) {
            var currentSquare = e.target.id;
            currentSquare = Number.parseFloat(currentSquare);
            if (gameState.availableMoves.indexOf(currentSquare) !== -1) {
                if (currentPlayer === "playerOne") {
                    console.log("inside playerOne");
                    $(this).html(personToken);
                    gameState.personMoves.push(currentSquare);
                    checkWin(gameState.personMoves);
                    //playerMove(gameState.personMoves, currentSquare)
                } else if (currentPlayer === "playerTwo") {
                    console.log("inside playerTwo");
                    $(this).html(secondPersonToken);
                    gameState.secondPersonMoves.push(currentSquare);
                    checkWin(gameState.secondPersonMoves);
                }
                //console.log("inside");
                ///////////////////$(this).html(personToken);
                //$(this).addClass('clicked');
                /////////////////////gameState.personMoves.push(currentSquare);
                //console.log(gameState.availableMoves.indexOf(currentSquare));
                //availableMoves = availableMoves.slice(0, currentSquare) + availableMoves.slice(currentSquare + 1, -1);
                //availableMoves = availableMoves.splice(availableMoves.indexOf(currentSquare), 1);
                ////////////////////checkWin(gameState.personMoves);
                if (gameWon()) {
                    //alert("YOU WIN!!!");
                    for (var i = 0; i < win.length; i++) {
                        $("#" + win[i]).css("background-color", "green");
                    }
                    if (numPlayers === 1) {
                        $("#result").html("YOU WIN!!!");
                    } else {
                        if (currentPlayer === "playerOne") {
                            $("#result").html("PLAYER ONE WINS!!!");
                        } else {
                            $("#result").html("PLAYER TWO WINS!!!");
                        }
                    }
                    //$("#menu").show();
                    $("#menu").css("display", "block");
                    $("#result").css("display", "block");
                    $("#menu").css("background-color", "rgba(16, 136, 18, 0.9)");
                    $("#menu").addClass("animated pulse");
                }
                gameState.availableMoves = remove(gameState.availableMoves, currentSquare);
                //console.log("personMoves = " + gameState.personMoves);
                //console.log("availableMoves = " + gameState.availableMoves);
                if (numPlayers === 1) {
                    computerTurn();
                } else if (numPlayers === 2 && !gameWon() && !checkTie()) {
                    if (currentPlayer === "playerOne") {
                        currentPlayer = "playerTwo";
                        $('#current-player').html("CURRENT PLAYER: 2");
                    } else {
                        currentPlayer = "playerOne";
                        $('#current-player').html("CURRENT PLAYER: 1");
                    }
                }
                checkTie();
            }
        }
    });

    function restart() {
        if (gameWon()) {
            for (var i = 0; i < win.length; i++) {
                $("#" + win[i]).css("background-color", "");
            }
        }
        currentPlayer = "playerOne";
        gameState.availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        gameState.personMoves = [];
        gameState.secondPersonMoves = [];
        gameState.computerMoves = [];
        $('.square').html("");
        //$("#menu").css("display", "none");
        //$("#menu").html("");
        $("#menu").css("background-color", "rgba(63, 121, 191, 0.9)");
        //$("#menu").hide();
    }

    $('#replay').on('click', function() {
        if (gameStarted) {
            restart();
            //$('#menu-holder').css("display", "none");
            $('#menu').css("display", "none");
            $('.players-prompt').css("display", "none");
            $('.token-prompt').css("display", "none");
            $('.difficulty-prompt').css("display", "none");
            $('#current-player').html("CURRENT PLAYER: 1");
            //checkWin(personMoves);
            //gameWon();
        }
        gameStarted = true;
    });

    $('#reset').on('click', function() {
        restart();
        $('#menu-holder').css("top", "85px");
        $("#menu").css("display", "block");
        $('.players-prompt').css("display", "inline-block");
        $('.token-prompt').css("display", "none");
        $('.difficulty-prompt').css("display", "none");
        $('#menu').removeClass("animated pulse");
        $('#result').html("");
        gameStarted = false;
        $('#current-player').css("display", "none");
    });

    function computerTurn() {
        if (gameState.availableMoves.length > 0 && !gameWon()) {
            var move;
            if (difficultyLevel === "easy") {
                move = Math.floor(Math.random() * (9));
            } else if (difficultyLevel === "hard") {
                move = bestComputerMove();
            } else if (difficultyLevel ==="medium") {
                var flip = Math.floor(Math.random() * (2));
                if (flip === 0) {
                    move = Math.floor(Math.random() * (9));
                } else if (flip === 1) {
                    move = bestComputerMove();
                }
            }
            //console.log("computer move = " + move);
            if (gameState.availableMoves.indexOf(move) !== -1) {
                $('#' + move).html(computerToken);
                //checkWin(computerMoves);
                gameState.computerMoves.push(move);
                if (gameWon()) {
                    //alert("YOU LOSE!");
                    for (var i = 0; i < win.length; i++) {
                        $("#" + win[i]).css("background-color", "red");
                    }
                    $("#result").html("YOU LOSE!");
                    //$("#menu").show();
                    $("#menu").css("display", "block");
                    $("#result").css("display", "block");
                    $("#menu").css("background-color", "rgba(161, 19, 16, 0.9)");
                    $("#menu").addClass("animated pulse");
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
                $('#menu-holder').css("top", "150px");
                //$('#current-player').html("top", "150px");
            }
            //alert("TIE GAME");
            $("#result").html("TIE GAME");
            $("#result").css("display", "block");
            //$("#menu").show();
            $("#menu").css("display", "block");
            $("#menu").addClass("animated pulse");
            return true;
        } else {
            return false;
        }
    }

    function checkGameOver() {
        if (gameWon() || checkTie()) {
            return true;
        } else {
            return false;
        }
    }

//var count = 0;
    function minimax(newGameState, player, level) {
        //var trialMoves = availMoves;

        //count++;

        //console.log("Level #" + level);

        if (checkWin(newGameState.personMoves)) {
            //console.log("PERSON WINS! " + newGameState.personMoves);
            return {score: -10};
        } else if (checkWin(newGameState.computerMoves)) {
            //console.log("COMPUTER WINS! " + newGameState.computerMoves);
            return {score: 10};
        } else if (newGameState.availableMoves.length === 0) {
            //console.log("TIE!");
            return {score: 0};
        }
        //console.log("-------------------------------");

        //console.log("player = " + player);
        //console.log("newGameState.availableMoves = " + newGameState.availableMoves);
        var moves = [];
        for (var i = 0; i < newGameState.availableMoves.length; i++) {
            var move = {};
            move.index = newGameState.availableMoves[i];
            //console.log("level " + level + " -- index " + i + " of " + newGameState.availableMoves);
            //console.log("move.index = " + move.index);
            //////////console.log("newGameState.availableMoves[i] = " + newGameState.availableMoves[i]);
            //newGameState.availableMoves[i] = player;
            //playerArray.push(newGameState.availableMoves[i]);
            //playerArray.push(newGameState.availableMoves[i]);
            /////////console.log("new playerArray = " + playerArray);

            /////////console.log("new availableMoves = " + newGameState.availableMoves);

            //nextGameState = Object.create(newGameState);
            //nextGameState = Object.assign({}, newGameState);
            nextGameState = copy(newGameState);

            //console.log("newGameState.computerMoves b= "  + newGameState.computerMoves);
            //console.log("newGameState.personMoves b= " + newGameState.personMoves);

            if (player === "computer") {
                nextGameState.computerMoves.push(nextGameState.availableMoves[i]);
                nextGameState.availableMoves = remove(nextGameState.availableMoves, move.index);
                /////////console.log("newGameState.computerMoves = " + newGameState.computerMoves);
                //console.log("nextGameState.computerMoves = " + nextGameState.computerMoves);
                /////////console.log("newGameState.availableMoves = " + newGameState.availableMoves);
                var menu = minimax(nextGameState, "person", level + 1);
                move.score = menu.score;
            } else {
                nextGameState.personMoves.push(nextGameState.availableMoves[i]);
                nextGameState.availableMoves = remove(nextGameState.availableMoves, move.index);
                //console.log("nextGameState.personMoves = " + nextGameState.personMoves);
                ////////console.log("newGameState.personMoves = " + newGameState.personMoves);
                /////////console.log("newGameState.availableMoves = " + newGameState.availableMoves);
                var menu = minimax(nextGameState, "computer", level + 1);
                move.score = menu.score;
            }

            //newGameState.availableMoves[i] = move.index;
            //newGameState.availableMoves = allMoves;

            moves.push(move);
            //console.log("moves = " + moves);
        }
        //console.log("********************************************");

        var bestMove;
        if(player === "computer") {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        /////////console.log("COUNT = " + count);
        //console.log("MOVES = " + moves);
        //console.log("BESTMOVE = " + moves[bestMove][0]);
        return moves[bestMove];
    }

    function bestComputerMove() {
        return minimax(gameState, "computer", 0).index;
    }


    /*function minimax(availMoves, depth, player) {

    }*/


//Copy function taken from https://www.codementor.io/avijitgupta/deep-copying-in-js-7x6q8vh5d
    function copy(o) {
        if (o === null) {
            return null;
        }
        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
           v = o[key];
           output[key] = (typeof v === "object") ? copy(v) : v;
        }
        return output;
    }
})




