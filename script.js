/* eslint-disable prefer-destructuring */

const gameBoard = (() => {
  const container = document.querySelector('.container');
  const positionOne = document.querySelector('.one');
  const positionTwo = document.querySelector('.two');
  const positionThree = document.querySelector('.three');
  const positionFour = document.querySelector('.four');
  const positionFive = document.querySelector('.five');
  const positionSix = document.querySelector('.six');
  const positionSeven = document.querySelector('.seven');
  const positionEight = document.querySelector('.eight');
  const positionNine = document.querySelector('.nine');
  const gameBoard = [];
  const playerTurn = 'x';
  return {
    gameBoard,
    playerTurn,
    container,
    positionOne,
    positionTwo,
    positionThree,
    positionFour,
    positionFive,
    positionSix,
    positionSeven,
    positionEight,
    positionNine,
  };
})();

const players = (() => {
  const form = document.querySelector('.start-form');
  const formModal = document.querySelector('.form-modal');
  const startBtn = document.querySelector('.start-button');
  const submitBtn = document.querySelector('.submit-button');
  const playerOne = document.getElementById('player-one');
  const playerTwo = document.getElementById('player-two');
  const twoPlayers = document.querySelector('.players');
  twoPlayers.addEventListener('change', () => {
    if (twoPlayers.value === 'players' && gameBoard.gameBoard.length === 0) {
      formModal.showModal();
      formModal.style.display = 'grid';
    } else if (document.querySelector('select').selectedIndex === 0){
      ai();
    }
  });
  submitBtn.addEventListener('click', () => {
    formModal.close();
    formModal.style.display = 'none';
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const player1 = playerOne.value;
    const player2 = playerTwo.value;
    if (player1 && player2) {
      document.querySelector('.players-names').textContent = `${player1} (X) vs ${player2} (O)`;
    }
  });
  return { playerOne, playerTwo };
})();

const display = () => {
  gameBoard.positionOne.textContent = gameBoard.gameBoard[0];
  gameBoard.positionTwo.textContent = gameBoard.gameBoard[1];
  gameBoard.positionThree.textContent = gameBoard.gameBoard[2];
  gameBoard.positionFour.textContent = gameBoard.gameBoard[3];
  gameBoard.positionFive.textContent = gameBoard.gameBoard[4];
  gameBoard.positionSix.textContent = gameBoard.gameBoard[5];
  gameBoard.positionSeven.textContent = gameBoard.gameBoard[6];
  gameBoard.positionEight.textContent = gameBoard.gameBoard[7];
  gameBoard.positionNine.textContent = gameBoard.gameBoard[8];
};
const score = () => {
  const modal = document.querySelector('.modal');
  const x = [];
  const o = [];
  let counter = 0;
  const win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], ['na']];
  for (let i = 0; i < gameBoard.gameBoard.length; i++) {
    if (gameBoard.gameBoard[i] === 'x') {
      x.push(i);
    } else if (gameBoard.gameBoard[i] === 'o') {
      o.push(i);
    }
  }
  for (let i = 0; i < gameBoard.gameBoard.length; i++) {
    if (!players.playerOne.value) {
      players.playerOne.value = 'X';
    }
    if (!players.playerTwo.value) {
      players.playerTwo.value = 'O';
    }
    if (win[i].every((ele) => x.includes(ele)) && (!document.querySelector('.modal').open)) {
      document.querySelector('.modal-player').textContent = `${players.playerOne.value}`;
      document.querySelector('.modal-p').textContent = 'Won!';
      document.querySelector('.modal').showModal();
      document.querySelector('.modal').style.display = 'flex';
    } else if (win[i].every((ele) => o.includes(ele))) {
      document.querySelector('.modal-player').textContent = `${players.playerTwo.value}`;
      document.querySelector('.modal-p').textContent = 'Won!';
      document.querySelector('.modal').showModal();
      document.querySelector('.modal').style.display = 'flex';
    } else if (gameBoard.gameBoard[i]) {
      counter += 1;
      if (counter === 9) {
        document.querySelector('.modal-player').textContent = `${players.playerOne.value}${players.playerTwo.value}`;
        document.querySelector('.modal-p').textContent = 'Tie!';
        document.querySelector('.modal').showModal();
        document.querySelector('.modal').style.display = 'flex';
      }
    }
  }
  document.querySelector('.reset').addEventListener('click', () => {
    document.querySelector('.modal').close();
    gameBoard.gameBoard = [];
    gameBoard.playerTurn = 'x';
    players.playerOne.value = '';
    players.playerTwo.value = '';
    document.querySelector('.modal-player').textContent = '';
    document.querySelector('.players-names').textContent = 'Player (X) vs player (O)';
    document.querySelector('select').selectedIndex = 0;
    document.querySelector('.modal').style.display = 'none';
    display();
  });
};
const ai = () => {
  if (document.querySelector('.players').selectedIndex === 0) {
    const aiChoice = Math.round(Math.random() * 8);
    if (gameBoard.playerTurn === 'o' && (!gameBoard.gameBoard[aiChoice]) && (!document.querySelector('.modal').open)) {
      gameBoard.gameBoard[aiChoice] = 'o';
      gameBoard.playerTurn = 'x';
      setTimeout(() => {
        score();
      }, 300);
    } else if (gameBoard.playerTurn === 'o' && (!document.querySelector('.modal').open)) {
      ai();
    }
    setTimeout(() => {
      display();
    }, 250);
  }
};
const playerChoices = (() => {
  gameBoard.positionOne.addEventListener('click', () => {
    if (!gameBoard.gameBoard[0]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[0] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[0] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
  gameBoard.positionTwo.addEventListener('click', () => {
    if (!gameBoard.gameBoard[1]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[1] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[1] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
  gameBoard.positionThree.addEventListener('click', () => {
    if (!gameBoard.gameBoard[2]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[2] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[2] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
  gameBoard.positionFour.addEventListener('click', () => {
    if (!gameBoard.gameBoard[3]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[3] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[3] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
  gameBoard.positionFive.addEventListener('click', () => {
    if (!gameBoard.gameBoard[4]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[4] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[4] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
  gameBoard.positionSix.addEventListener('click', () => {
    if (!gameBoard.gameBoard[5]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[5] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[5] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
  gameBoard.positionSeven.addEventListener('click', () => {
    if (!gameBoard.gameBoard[6]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[6] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[6] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
  gameBoard.positionEight.addEventListener('click', () => {
    if (!gameBoard.gameBoard[7]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[7] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[7] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
  gameBoard.positionNine.addEventListener('click', () => {
    if (!gameBoard.gameBoard[8]) {
      if (gameBoard.playerTurn === 'x') {
        gameBoard.gameBoard[8] = 'x';
        gameBoard.playerTurn = 'o';
      } else {
        gameBoard.gameBoard[8] = 'o';
        gameBoard.playerTurn = 'x';
      }
      display();
      score();
      ai();
    }
  });
})();
