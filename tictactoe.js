const Player = (name, marker) => {

	return {
		name, 
		marker
	};
};

const playerOne = Player("Player One", "X");
const playerTwo = Player("Player Two", "O");

const gameLogic = (() => {
	let activePlayer = playerOne;

	const _togglePlayer = () => {
		if (activePlayer == playerOne) {
			activePlayer = playerTwo;
		} else if (activePlayer == playerTwo) {
			activePlayer = playerOne;
		}
	};

	const _startGame = () => {
		activePlayer = playerOne;
	};

	const playerTurn = (index) => {
		if (gameBoard.insertMarker(index, activePlayer.marker)) {
			gameDisplay.displayMarker(index, activePlayer.marker);
			const isWin = gameBoard.checkWin(activePlayer);
			const isDraw = gameBoard.checkDraw();
	
			if (isWin) {
				alert(`${activePlayer.name} wins!`);
				gameBoard.clearBoard();
				_startGame();
			} else if (isDraw) {
				alert("Game is draw.");
				gameBoard.clearBoard();
				_startGame();
			} else {
				_togglePlayer();
			}
		}
	};

	return {
		playerTurn
	};
})();


const gameDisplay = (() => {
	const squares = document.querySelectorAll(".square");
	squares.forEach((square) => {
		square.addEventListener("click", () => {
			const index = square.dataset.index;
			gameLogic.playerTurn(index);
		});
	});

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
		displayMarker,
		clearMarkers
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