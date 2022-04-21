const createPlayer = (name) => {
  return {name};
}

// add name update function

const game = (() => {
  const playerX = document.getElementById('player-one-name').value;
  const playerO = document.getElementById('player-two-name').value;

  let currentPlay = {
    currentPlayer: playerX,
    currentMarker: 'x',
    winCondition: false
  }

  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ]

  function checkWin() {
    
    winCombos.forEach((combo) => {
      if (board.boardStateArr[combo[0]] === currentPlay.currentMarker
      && board.boardStateArr[combo[1]] === currentPlay.currentMarker
      && board.boardStateArr[combo[2]] === currentPlay.currentMarker) {
        console.log(`${currentPlay.currentPlayer} wins!`);
        currentPlay.winCondition = true;
        board.resultsDisplay.textContent = `${game.currentPlay.currentPlayer} wins!`;
      }
    })
  }

  function switchTurn() {
    if (currentPlay.currentPlayer === playerX) {
      currentPlay.currentPlayer = playerO
    } else {
      currentPlay.currentPlayer = playerX
    }
    if (currentPlay.currentMarker === 'x') {
      currentPlay.currentMarker = 'o'
    } else {
      currentPlay.currentMarker = 'x'
    }
  }


  
  return {
    checkWin,
    switchTurn,
    currentPlay,
  }
})();

// const displayController = (() => {
//   const resultsDisplay = document.querySelector('.results-display');
//   if (game.currentPlay.winCondition) {
    
//   }
//   return {
//     resultsDisplay
//   }
// })();

const board = (() => {
  const squares = document.querySelectorAll('.board-square');
  const resetButton = document.querySelector('#reset-game');
  const resultsDisplay = document.querySelector('.results-display');

  let boardStateArr = [];

  const newGame = () => {
    squares.forEach((square) => {
    square.addEventListener('click', handleClick, {once : true});
    })
    resultsDisplay.textContent = 'Click a square to start the game';
  }

  newGame();

  function handleClick() {
    this.textContent = game.currentPlay.currentMarker;
    board.boardStateArr[this.dataset.index] = game.currentPlay.currentMarker;
    game.checkWin();
    game.switchTurn();
    if (game.currentPlay.winCondition) {
    squares.forEach((square) => {
      square.removeEventListener('click', handleClick);
      })
    }
  }

  resetButton.addEventListener('click', () => {
    reset();
  })

  const reset = () => {
    squares.forEach((square) => {
      square.textContent = '';
    })
    game.currentPlay.winCondition = false;
    board.boardStateArr = [];
    newGame();
  }

  return {
    reset,
    boardStateArr,
    resultsDisplay
  };
})();






