
      window.addEventListener('DOMContentLoaded', () => {
      const tiles = Array.from(document.querySelectorAll('.tile'))
      const playerDisplay = document.querySelector('.display-player')
      const resetButton = document.querySelector('#reset')
      const announcer = document.querySelector('.announcer')

      let board = ['', '', '', '', '', '', '', '',]
      let currentPlayer = 'X'
      let isGameActive = true
      let roundsPlayed = 0
      let playerXWins = 0
      let playerOWins = 0

       const PLAYERX_WON = 'PLAYERX_WON'
       const PLAYERO_WON = 'PLAYERO_WON'
       const TIE = 'TIE'

     const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
     ];

     function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i]
            const a = board[winCondition[0]]
            const b = board[winCondition[1]]
            const c = board[winCondition[2]]
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true
                break
            }
         }
         if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            updateScore()
            if (playerXWins === 3 || playerOWins === 3) {
                announceOverallWinner()
                isGameActive = false
            } else {
                resetBoard()
            }
            return
         }

         if (!board.includes('')) {
            announce(TIE)
            resetBoard()
         }
     }

     const announce = (type) => {
         switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won'
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won'
                break;
            case TIE:
                announcer.innerHTML = 'Tie'
        }
        announcer.classList.remove('hide')
    };

    const announceOverallWinner = () => {
        if (playerXWins === 3) {
            announcer.innerHTML = 'Winner: Player <span class="playerX">X</span>'
        } else {
            announcer.innerHTML = 'Winner: Player <span class="playerO">O</span>'
        }
        announcer.classList.remove('hide')
    };

    const isValidAction = (tiles) => {
        if (tiles.innerText === 'X' || tiles.innerText === 'O') {
            return false
        }
        return true
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`)
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        playerDisplay.innerText = currentPlayer
        playerDisplay.classList.add(`player${currentPlayer}`)
    }

    const updateScore = () => {
        if (currentPlayer === 'X') {
            playerXWins++
        } else {
            playerOWins++
        }
    }

    const userAction = (tiles, index) => {
        if (isValidAction(tiles) && isGameActive) {
            tiles.innerText = currentPlayer
            tiles.classList.add(`player${currentPlayer}`)
            updateBoard(index)
            handleResultValidation()
            changePlayer()
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '',]
        isGameActive = true
        announcer.classList.add('hide')

        if (currentPlayer === 'O') {
            changePlayer()
        }

        tiles.forEach(tile => {
            tile.innerHTML = ''
            tile.classList.remove('playerX')
            tile.classList.remove('playerO')
        });

        roundsPlayed++
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index))
    });

    resetButton.addEventListener('click', () => {
        resetBoard()
        playerXWins = 0
        playerOWins = 0
        roundsPlayed = 0
    });
});

