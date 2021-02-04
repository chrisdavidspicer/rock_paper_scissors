/* Constants */
const MOVESET = ['scissors', 'paper', 'rock'] // don't change this, it's in all caps

/* Game Logic Variables and States */
let humanWins = 0
let aiWins = 0
let ties = 0
let playerMsg = "";
let aiMsg = "";
let statusMsg = "";

/* DOM References */
const playControls = document.querySelector('#left')
const gameMessageBox = document.querySelector('#game-messages')

/* Functions and game logic */

// Runs at the start of the game
// Reset all the state variables
//  Update the DOM to reflect to the user that we have a fresh game
const initialize = event => {
      // do stuff here
      humanWins = 0;
      aiWins = 0;
      ties = 0;
      playerMsg = "";
      aiMsg = "";
      statusMsg = "";
}

const handleClick = (event) => {
      // Reject moves to Parent Div
      if(event.target.id == 'left') return
      let playerMove = event.target.alt
      // 1) AI makes a move
      let aiMove = randAiMove()

      // update state variables
      playerMsg = `I play ${playerMove}`
      aiMsg = `AI plays ${aiMove}`

      console.log(`player move: ${playerMove} ai move is: ${aiMove}`)
      // 2) Check if AI wins or Player wins
      checkForWin(playerMove, aiMove);
      // 3) Reflect the results in the state and the DOM
      updateDisplay();
}

const updateDisplay = () => {
      // Wipe the contents of the gameMessageBox
      while(gameMessageBox.firstChild) {
            gameMessageBox.removeChild(gameMessageBox.firstChild)
      }
      let msg1 = document.createElement('h3')
      msg1.textContent = playerMsg;

      let msg2 = document.createElement('h3')
      msg2.textContent = aiMsg;

      let msg3 = document.createElement('h3')
      msg3.textContent = statusMsg;

      let p = document.createElement('p')
      p.textContent = `Human wins: ${humanWins} AI wins: ${aiWins} Ties: ${ties}`

      gameMessageBox.appendChild(msg1)
      gameMessageBox.appendChild(msg2)
      gameMessageBox.appendChild(msg3)
      gameMessageBox.appendChild(p)
}

const checkForWin = (playerMove, aiMove) => {
      let combos = playerMove+aiMove;
      switch(combos) {
            case "rockrock":
            case "paperpaper":
            case "scissorsscissors":
                  statusMsg = "Game is tied!";
                  ties++;
                  break;
            case "rockscissors":
            case "paperrock":
            case "scissorspaper":
                  statusMsg = "You Won!";
                  humanWins++;
                  break;
            case "rockpaper":
            case "paperscissors":
            case "scissorsrock":
                  statusMsg = "AI Won!"
                  aiWins++;
                  break;
      }
}

// This function returns either "rock" / "paper" / or "scissors"
const randAiMove = () => {
      let randIndex = Math.floor(Math.random() * 3);
      let selectedMove = MOVESET[randIndex];
      return selectedMove;
}

/* Event listeners */
document.addEventListener('DOMContentLoaded', initialize)
playControls.addEventListener('click', handleClick)