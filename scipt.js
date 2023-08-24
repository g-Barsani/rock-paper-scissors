function getComputerChoice() {
    setOfOptions = ['rock', 'paper', 'scissors'];
    randIndex = Math.floor(Math.random() * 3);

    return setOfOptions[randIndex];
}

function playRound(playerSelection, computerSelection) {
    // For the sake of this game, 1 means the player wins, 2 the computer, 
    // but 3 is a tie
    if (playerSelection === 'rock' && computerSelection === 'scissors' ||
    playerSelection === 'paper' && computerSelection === 'rock' ||
    playerSelection === 'scissors' && computerSelection === 'paper')
    return 1;
else if (playerSelection ===  computerSelection)
    return 3;
else 
    return 2;
}

//console.log(`The game result is: ${playRound(playerSelection, computerSelection)}`);
game();

function game() {
    const TOTAL_ROUNDS = 5;
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
        let computerSelection = getComputerChoice();
        let playerSelection = prompt().toLowerCase();
        while (true) {
            if (playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors") {
                break;
            } else {
                console.log('Please, enter a valid option!');
                playerSelection = prompt().toLowerCase();
            }
        }
        
        
        let gameResult = playRound(playerSelection, computerSelection);
  
        switch (gameResult) {
          case 1: 
            console.log(`You win! ${playerSelection} beats ${computerSelection}`);
            break;
          case 2:
            console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
            break;
          default: 
            console.log(`It's a tie! ${playerSelection} and ${computerSelection}`);
        }
    }
  }
