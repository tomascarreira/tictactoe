const Player = (name, marker) => {

	return {
		name, 
		marker
	};
};

const playerOne = Player("Player One", "X");
const playerTwo = Player("Player Two", "O");

const gameLogic = (() => {
	let activePlayer;
	let isGameOver = false;

	const _togglePlayer = () => {
		if (activePlayer == playerOne) {
			activePlayer = playerTwo;
		} else if (activePlayer == playerTwo) {
			activePlayer = playerOne;
		}
	};

	const startGame = () => {
		isGameOver = false;
		gameDisplay.drawBoard();
		activePlayer = playerOne;
	};

	const playerTurn = (index) => {
		if (isGameOver) {
			return
		}

		if (gameBoard.insertMarker(index, activePlayer.marker)) {
			gameDisplay.displayMarker(index, activePlayer.marker);
			const isWin = gameBoard.checkWin(activePlayer);
			const isDraw = gameBoard.checkDraw();
	
			if (isWin) {
				isGameOver = true;
				gameDisplay.drawEndMessage(`${activePlayer.name} wins!`);
				gameDisplay.drawEndButtons();
			} else if (isDraw) {
				isGameOver = true;
				gameDisplay.drawEndMessage("Games is a draw");
				gameDisplay.drawEndButtons();
			} else {
				_togglePlayer();
			}
		}
	};

	return {
		playerTurn,
		startGame
	};
})();


const gameDisplay = (() => {
	const main = document.querySelector("main");
	let playerNumber = document.querySelector("#player-number");

	const onePlayer = document.querySelector("#one-player");
	const twoPlayers = document.querySelector("#two-players");
	twoPlayers.addEventListener("click", () => {
		playerNumber = main.removeChild(playerNumber);
		gameBoard.clearBoard();
		gameLogic.startGame();
	});

	const _createBoard = () => {
		const board = document.createElement("div");
		board.id = "board";
		for (let i = 0; i < 9; ++i) {
			const square = document.createElement("div");
			square.className = "square";
			square.dataset.index = i;

			square.addEventListener("click", () => {
				gameLogic.playerTurn(i);
			});

			board.appendChild(square);
		}

		return board;
	};

	const board = _createBoard();
	const squares = board.querySelectorAll(".square");

	const drawBoard = () => {
		main.appendChild(board);
	};

	const _createEndButtons = () => {
		const endButtons = document.createElement("div");
		endButtons.id = "end-buttons";

		const playAgain = document.createElement("button");
		playAgain.textContent = "Play Again";
		playAgain.addEventListener("click", () => {
			const endButtons = document.querySelector("#end-buttons");
			main.removeChild(endMessage);
			main.removeChild(endButtons);
			gameBoard.clearBoard();
			gameLogic.startGame();
		});
		endButtons.appendChild(playAgain);

		const mainMenu = document.createElement("button");
		mainMenu.textContent = "Main Menu";
		mainMenu.addEventListener("click", () => {
			const endButtons = document.querySelector("#end-buttons");
			main.removeChild(board);
			main.removeChild(endMessage);
			main.removeChild(endButtons);
			main.append(playerNumber);
		});
		endButtons.appendChild(mainMenu);

		return endButtons;
	};

	let endMessage;
		
	const drawEndMessage = (message) => {
		endMessage = document.createElement("p");
		endMessage.textContent = message;
		main.appendChild(endMessage);
	};

	const endButtons = _createEndButtons();

	const drawEndButtons = () => {
		main.appendChild(endButtons)
	};

	const displayMarker = (index, marker) => {
		squares.forEach((square) => {
			if (square.dataset.index == index) {
				square.textContent = marker;
				return;
			}
		});
	};

	const clearMarkers = () => {
		squares.forEach((square) => {
			square.textContent = "";
		});
	};

	return {
		drawBoard,
		drawEndMessage,
		drawEndButtons,
		displayMarker,
		clearMarkers,
	};
})();

const gameBoard = (() => {
	let board = [null, null, null,
				null, null, null,
				null, null, null];

	const insertMarker = (index, marker) => {
		if (board[index] == null) {
			board.splice(index, 1, marker);
			return true;
		} else {
			return false;
		}
	};

	const clearBoard = () => {
		board = [null, null, null,
				null, null, null,
				null, null, null];
		gameDisplay.clearMarkers();
	};

	const checkWin = (player) => {
		markers = []
		board.forEach((marker, index) => {
			if (marker == player.marker) {
				markers.push(index);
			}
		});
	
		// 123, 456, 789; 147, 258, 369; 159, 357
		if ((markers.includes(0) && markers.includes(1) && markers.includes(2)) ||
			(markers.includes(3) && markers.includes(4) && markers.includes(5)) ||
			(markers.includes(6) && markers.includes(7) && markers.includes(8)) ||
			(markers.includes(0) && markers.includes(3) && markers.includes(6)) ||
			(markers.includes(1) && markers.includes(4) && markers.includes(7)) ||
			(markers.includes(2) && markers.includes(5) && markers.includes(8)) ||
			(markers.includes(0) && markers.includes(4) && markers.includes(8)) ||
			(markers.includes(2) && markers.includes(4) && markers.includes(6))) {
				return true;			
		} else  {
			return false;
		}
	};

	const checkDraw = () => {
		draw = true;
		board.forEach((marker) => {
			if (marker == null) {
				draw = false;
			}
		});

		return draw;
	};

	return {
		insertMarker,
		clearBoard,
		checkWin,
		checkDraw
	};
})();