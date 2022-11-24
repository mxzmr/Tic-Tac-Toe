/* eslint-disable prefer-destructuring */
const gameBoard = (() => {
  const gameBoard = [];
  const playerTurn = 'X';
  const playerX = 0;
  const playerO = 0;
  const tie = 0;
  return {
    gameBoard,
    playerTurn,
    playerX,
    playerO,
    tie,
  };
})();

const display = () => {
  document.querySelector('.one').textContent = gameBoard.gameBoard[0];
  document.querySelector('.two').textContent = gameBoard.gameBoard[1];
  document.querySelector('.three').textContent = gameBoard.gameBoard[2];
  document.querySelector('.four').textContent = gameBoard.gameBoard[3];
  document.querySelector('.five').textContent = gameBoard.gameBoard[4];
  document.querySelector('.six').textContent = gameBoard.gameBoard[5];
  document.querySelector('.seven').textContent = gameBoard.gameBoard[6];
  document.querySelector('.eight').textContent = gameBoard.gameBoard[7];
  document.querySelector('.nine').textContent = gameBoard.gameBoard[8];
};

const playersInfo = (() => {
  const form = document.querySelector('.start-form');
  const formModal = document.querySelector('.form-modal');
  const submitBtn = document.querySelector('.submit-button');
  const playerOne = document.getElementById('player-one');
  const playerTwo = document.getElementById('player-two');
  const twoPlayers = document.querySelector('.players');
  const difficulty = document.querySelector('.difficulty');
  twoPlayers.addEventListener('change', () => {
    if (twoPlayers.value === 'players' && gameBoard.gameBoard.length === 0) {
      formModal.showModal();
      formModal.style.display = 'grid';
      difficulty.style.display = 'none';
    }
    if (document.querySelector('select').selectedIndex === 0) {
      difficulty.style.display = '';
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
    if (document.querySelector('.players').selectedIndex === 1) {
      document.querySelector('.players-names').textContent = `${player1} (X) vs ${player2} (O)`;
      document.querySelector('.score-player').textContent = `${player1} (X) : 0`;
      document.querySelector('.score-ai').textContent = `${player2} (O) : 0`;
    }
  });
  return { playerOne, playerTwo };
})();

const score = () => {
  const modal = document.querySelector('.modal');
  const modalPara = document.querySelector('.modal-p');
  const modalPlayers = document.querySelector('.modal-player');
  const reset = document.querySelector('.reset');
  const scorePlayer = document.querySelector('.score-player');
  const scoreAi = document.querySelector('.score-ai');
  const tie = document.querySelector('.tie');
  const x = [];
  const o = [];
  const winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], ['na']];
  function choiceCombo() {
    for (let i = 0; i < gameBoard.gameBoard.length; i += 1) {
      if (gameBoard.gameBoard[i] === 'X') {
        x.push(i);
      } else if (gameBoard.gameBoard[i] === 'O') {
        o.push(i);
      }
    }
  } choiceCombo();
  const game = (() => {
    if (!playersInfo.playerOne.value && document.querySelector('select').selectedIndex === 0) {
      playersInfo.playerOne.value = 'Player';
    }
    let tieCounter = 0;
    for (let i = 0; i < winCombo.length; i += 1) {
      const winnerAnimation = () => {
        document.getElementById(`${winCombo[i][0]}`).classList.add('blink');
        document.getElementById(`${winCombo[i][1]}`).classList.add('blink');
        document.getElementById(`${winCombo[i][2]}`).classList.add('blink');
        setTimeout(() => {
          document.getElementById(`${winCombo[i][0]}`).classList.remove('blink');
          document.getElementById(`${winCombo[i][1]}`).classList.remove('blink');
          document.getElementById(`${winCombo[i][2]}`).classList.remove('blink');
          gameBoard.gameBoard = [];
        }, 1500);
      };
      if (winCombo[i].every((ele) => x.includes(ele))) {
        gameBoard.playerX += 1;
        gameBoard.playerTurn = 'X';
        scorePlayer.textContent = `${playersInfo.playerOne.value} (X) : ${gameBoard.playerX}`;
        winnerAnimation();
        break;
      } else if (winCombo[i].every((ele) => o.includes(ele))) {
        gameBoard.playerO += 1;
        gameBoard.playerTurn = 'X';
        scoreAi.textContent = `${playersInfo.playerTwo.value} (O) : ${gameBoard.playerO}`;
        winnerAnimation();
        break;
      } else if (gameBoard.gameBoard[i]) {
        tieCounter += 1;
        if (tieCounter === 9) {
          gameBoard.tie += 1;
          tie.textContent = `Tie : ${gameBoard.tie}`;
          gameBoard.playerTurn = 'X';
          gameBoard.gameBoard = [];
          break;
        }
      }
    }
    setTimeout(() => {
      display();
    }, 1500);
    return tieCounter;
  })();

  function winner() {
    if (gameBoard.playerX === 3 && (!document.querySelector('.modal').open)) {
      modalPlayers.textContent = `${playersInfo.playerOne.value} (X)`;
      modalPara.textContent = 'Won!';
      modal.showModal();
      modal.style.display = 'flex';
    }
    if (gameBoard.playerO === 3 && (!document.querySelector('.modal').open)) {
      modalPlayers.textContent = `${playersInfo.playerTwo.value} (O)`;
      modalPara.textContent = 'Won!';
      modal.showModal();
      modal.style.display = 'flex';
    }
    if (gameBoard.tie === 3 && (!document.querySelector('.modal').open)) {
      modalPlayers.textContent = 'X O';
      modalPara.textContent = 'Tie!';
      modal.showModal();
      modal.style.display = 'flex';
    }
  } winner();
  reset.addEventListener('click', () => {
    document.querySelector('.modal').close();
    gameBoard.gameBoard = [];
    gameBoard.playerTurn = 'X';
    playersInfo.playerOne.value = '';
    playersInfo.playerTwo.value = '';
    modalPlayers.textContent = '';
    document.querySelector('.players-names').textContent = 'Player (X) vs player (O)';
    modal.style.display = 'none';
    document.querySelector('select').selectedIndex = 0;
    scorePlayer.textContent = 'Player (X) : 0';
    scoreAi.textContent = 'A.I (O) : 0';
    tie.textContent = 'Tie : 0';
    gameBoard.playerX = 0;
    gameBoard.playerO = 0;
    gameBoard.tie = 0;
    display();
  });
  return {
    game, x, o, winCombo,
  };
};

function ai() {
  const difficulty = document.querySelector('.difficulty');
  function randNum() {
    let anotherRandNum = Math.round(Math.random() * 8);
    if (gameBoard.gameBoard[anotherRandNum]) {
      anotherRandNum = Math.round(Math.random() * 8);
      return randNum();
    } return anotherRandNum;
  }
  function aiChoiceRand() {
    gameBoard.gameBoard[randNum()] = 'O';
    gameBoard.playerTurn = 'X';
    setTimeout(() => {
      display();
    }, 500);
    score();
  }
  function aiChoiceHard() {
    // loop that checks if there is a combination of 2 O's then add the last O for the win
    for (let i = 0; i < score().winCombo.length; i += 1) {
      const checkIfOWon = score().winCombo[i].filter((ele) => score().o.includes(ele));
      const findMissingOFromCombo = score().winCombo[i].filter((ele) => !score().o.includes(ele));
      if (checkIfOWon.length === 2 && !gameBoard.gameBoard[findMissingOFromCombo]) {
        gameBoard.gameBoard[findMissingOFromCombo] = 'O';
        gameBoard.playerTurn = 'X';
        setTimeout(() => {
          display();
        }, 500);
        score();
        return;
      }
    }
    // loop that checks combination of 2 X's and adds an O to block X from winning
    for (let i = 0; i < score().winCombo.length; i += 1) {
      const checkIfXWon = score().winCombo[i].filter((ele) => score().x.includes(ele));
      const findMissingXFromCombo = score().winCombo[i].filter((ele) => !score().x.includes(ele));
      if (checkIfXWon.length === 2 && !gameBoard.gameBoard[findMissingXFromCombo]) {
        gameBoard.gameBoard[findMissingXFromCombo] = 'O';
        gameBoard.playerTurn = 'X';
        setTimeout(() => {
          display();
        }, 500);
        score();
        break;
        // if there is a single X then run aiChoiceRand()
      } else if (i === (score().winCombo.length - 1)) {
        aiChoiceRand();
      }
    }
  }
  if (document.querySelector('.players').selectedIndex === 0 && gameBoard.playerTurn === 'O') {
    if (difficulty.value === 'easy') {
      aiChoiceRand();
    }
    if (difficulty.value === 'hard') {
      if (score().x.length < 2) {
        aiChoiceRand();
      } else aiChoiceHard();
    }
    if (difficulty.value === 'impossible') {
      if (score().x.length < 2) {
        /**
         * The first ai choice from the available board cells
         * position number 4 gives 4 winning combinations positions 0,2,6,8 gives 3 combinations
         * the rest of the ai choices will depend on the player choice and ai winning combinations
        */
        const positions = [0, 2, 6, 8];
        const randPosition = positions[Math.floor(Math.random() * positions.length)];
        if (!document.getElementById('4').textContent) gameBoard.gameBoard[4] = 'O';
        else gameBoard.gameBoard[randPosition] = 'O';
        gameBoard.playerTurn = 'X';
        setTimeout(() => {
          display();
        }, 500);
        score();
      } else aiChoiceHard();
    }
  }
}
function playerChoices() {
  const container = document.querySelector('.container');
  container.addEventListener('click', (e) => {
    if (!gameBoard.gameBoard[e.target.id]) {
      if (gameBoard.playerTurn === 'X') {
        gameBoard.gameBoard[e.target.id] = 'X';
        gameBoard.playerTurn = 'O';
      } else {
        gameBoard.gameBoard[e.target.id] = 'O';
        gameBoard.playerTurn = 'X';
      }
      display();
      score();
      ai();
    }
  });
} playerChoices();
