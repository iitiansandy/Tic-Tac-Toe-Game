const WebSocket = require('ws');

// create a new WebSocket server on port 5050
const server = new WebSocket.Server({ port: 5050 });

let game = null;
let player1 = null;
let player2 = null;

// Listen for WebSocket connections
server.on('connection', (socket) => {
    // If this is the first player to connect, assign them as player1;
    if (!player1) {
        player1 = socket;
        console.log('Player 1 connected');
        socket.send('You are player 1');
    } else if (!player2) {
        // If this is the second player to connect, assign them as player2;
        player2 = socket;
        console.log('Player 2 connected');
        socket.send('You are player 2');

        // start a new game
        game = new Game(player1, player2);
        game.start();
    } else {
        // if there are already two players connected, reject the connection
        console.log('Connection rejected - game is full');
        socket.send('Game is full');
        socket.close();
    }

    // Listen for messages form the players
    socket.on('message', (message) => {
        // pass the message to the game
        game.handleMessage(socket, message);
    });

    // Lesten for disconnections
    socket.on('close', () => {
        if (socket === player1) {
            console.log('Player 1 disconnected');
            player1 = null;
        } else if (socket === player2) {
            console.log('Player 2 disconnected');
            player2 = null;
        }

        // End the game if a player get disconnected
        if (game) {
            game.end();
            game = null;
        }
    });
});


// Define the Tic-Tac-Toe game class
class Game {
    constructor(player1, player2) {
        this.board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
        this.currentPlayer = player1;
        this.player1 = player1;
        this.player2 = player2;
    }

    start() {
        // Send the initial board state to both players
        this.player1.send(`START the Game : ${this.serializeBoard()}`);
        this.player2.send(`START the Game : ${this.serializeBoard()}`);
    }

    end() {
        // Notify both players that the game has ended
        this.player1.send('GAME ENDED');
        this.player2.send('GAME ENDED');
    }

    handleMessage(player, message) {
        // Ignore messages from players who are not part of the game
        if (player !== this.currentPlayer) {
            return;
        }

        const [command, ...args] = message.toString().split(' ');
        /* 
        The line const [command, ...args] = message.split(' '); is using destructuring assignment to extract the first word of the message string 
        and store it in the command variable, and the remaining words in the args array.
        The split method is used to split the message string into an array of words (using a space as the delimiter). The ...args syntax (also known as 
        the "rest parameter") is used to collect the remaining words in the array into a new array called args.
        For example, if message is "MOVE 1 2", the split method will return an array ['MOVE', '1', '2'], and the destructuring assignment will store 
        'MOVE' in the command variable and ['1', '2'] in the args array.

        let message = 'MOVE 1 2'
        const [command, ...args] = message.split(' ');
        console.log(command);  // MOVE
        console.log(args); // [ '1', '2' ]
        */

        switch (command) {
            case 'MOVE':
                // Parse the row and column arguments
                const [row, col] = args.map((arg) => parseInt(arg));

                // Check if the move is valid
                if (this.board[row][col] !== '_') {
                    player.send(`INVALID MOVE --> ${row} ${col}`);
                    return;
                }

                // Make the move and switch to the other player
                this.board[row][col] = player === this.player1 ? 'X' : 'O';
                this.currentPlayer = player === this.player1 ? this.player2 : this.player1;

                // Check if the game has ended
                if (this.checkWin()) {
                    this.player1.send(`${this.currentPlayer} WON THE GAME`);
                    this.player2.send(`${this.currentPlayer} WON THE GAME`);
                    this.end();
                } else if (this.checkTie()) {
                    this.player1.send(`GAME IS TIED`);
                    this.player2.send(`GAME IS TIED`);
                    this.end();
                } else {
                    // Notify both players of the new board state and whose turn it is
                    const boardState = this.serializeBoard();
                    this.player1.send(`UPDATED BOARD --> ${boardState} ${this.currentPlayer === this.player1}`);
                    this.player2.send(`UPDATED BOARD --> ${boardState} ${this.currentPlayer === this.player2}`);
                }
                break;
            default:
                player.send(`UNKNOWN COMMAND --> ${command}`);
                break;
        }
    }
    serializeBoard() {
        return this.board.map((row) => row.join(' ')).join('  ');
    }

    checkWin() {
        // Check rows
        for (let row = 0; row<3; row++) {
            if (this.board[row][0] !== '_' && this.board[row][0] === this.board[row][1] && this.board[row][0] === this.board[row][2]) {
                return true;
            }
        }

        // Check columns
        for (let cols = 0; cols<3; cols++) {
            if (this.board[0][cols] !== '_' && this.board[0][cols] === this.board[1][cols] && this.board[0][cols] === this.board[2][cols]) {
                return true;
            }
        }

        // Check diagonals
        if (this.board[0][0] !== '_' && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
            return true;
        }

        if (this.board[0][2] !== '_' && this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
            return true;
        }

        return false;
    }

    checkTie() {
        return this.board.every((row) => row.every((cell) => cell !== '_'));
    }
};