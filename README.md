# Tic Tac Toe Game using Nodejs
---
<strong>Make sure you read the whole document carefully and follow the guidelines in it.</strong> </br>
Preface: You will write a simple server that allows playing Tic-Tac-Toe game between two command-line
clients. </br>
<h3>Functionality:</h3> </br>
The server will be started like: node server.js 5050 </br>
The server will listen on the specified port (5050) for clients to connect. </br>
The client will be started like: node client.js 127.0.0.1 5050 </br>
The client will connect to the server at the specified IP (127.0.0.1) and port (5050). Upon
connection the client will display a message and prompt, like: connected to 127.0.0.1 5050
When two clients have connected to the server, the game will begin. The server will send each
client the message: Game started. You are the [first | second] player. </br>
The Tic-Tac-Toe board is numbered like this: </br>
<strong>1</strong></br><strong>2</strong></br><strong>3</strong></br><strong>4</strong></br><strong>5</strong></br><strong>6</strong></br><strong>7</strong></br><strong>8</strong></br><strong>9</strong></br>
The first player can then send a move like: </br>
> 5 </br>
This move would place an <strong>‘X’</strong> at square number 5. </br>
When the move is accepted by the server, it sends the current board position to both clients, like: </br>
<strong>...</strong> </br>
<strong>.x.</strong> </br>
<strong>...</strong> </br>
Let’s say the second player make the move: </br>
> <strong>9</strong> </br>
Both clients would then receive the new board position of: </br>
<strong>...</strong> </br>
<strong>.x.</strong> </br>
<strong>..o</strong> </br>
Either player can resign the game at any time, by sending <strong>‘r’</strong>. Even when waiting for the opponent
to move. The player who resigned loses the game. When the game is over, the server sends both
players a result message, like: <strong>Game won by [first | second] player. Or Game is tied.</strong> </br>
The clients close the connection to the server after the game is over and exit. The clients can be
restarted to connect to the server again to play another game. The server should continue
<h3>running and handle the next game.</h3> </br>
You should use bi-directional sockets for the connection between the client and server. Use the
<strong>npm</strong> libraries <strong>socket.io</strong>, <strong>socket.io-client</strong> and <strong>read</strong> command. You can use additional libraries if you
need. </br>
<h3>Requirements:</h3> </br>
● Write clear documentation on how it's designed and how to run the code. </br>
● Write good in-code comments. </br>
● Write good commit messages. </br>
● An online demo is always welcome. </br>
● Provide proper <strong>Readme</strong> which includes steps to setup the code in any system, <strong>API documentation</strong>
(Postman documentation link is preferred). </br>
● Candidate needs to provide the github link and the candidate has to make his repository private. </br>
<h3>Tech stack:</h3> </br>
● Use <strong>Node.js</strong> and any framework. </br>
● Use any DB. <strong>NoSQL DB</strong> is preferred. </br>
<h3>Bonus Points:</h3> </br>
● If you are familiar with <strong>ES6</strong> standards then it will be a bonus point for you. </br>
● If you follow the good practices of the Node js for coding standard/folder structure then it would
be considered as a bonus point. </br>
<h3>What We Care About</h3> </br>
Feel free to use any open-source library as you see fit, but remember that we are evaluating your coding
skills and problem solving skills. </br>
<h3>Here's what you should aim for:</h3> </br>
● Good use of current Node.js & API design best practices. </br>
● Good testing approach. </br>
● Extensible code. </br>
<h3>NOTE: Candidate should not be able for further rounds if we found plagiarism.</h3> </br>

## Available Scripts

1. Save the `server.js` file and start the server by running `node server.js`. </br>
2. Open two command-line windows and connect to the server using the `wscat` command (you can install it using `npm install -g wscat`). </br>
3. Run `wscat -c ws://localhost:8080` in both windows to connect to the server. </br>
4. The first player to connect will be assigned player 1 and the second player will be assigned player 2. Once both players are connected, the game will start and the current board state will be sent to both players. </br>
5. To make a move, send a message in the format <strong>MOVE</strong> <strong>row col</strong> (where row and col are integers between <strong>0</strong> and <strong>2</strong>). The server will validate the move and notify both players of the new board state and whose turn it is. </br>
6. The game will end when a player wins or there is a tie. Both players will be notified that the game has ended.
