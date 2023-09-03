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


game();

function game() {
    
    let playerScore = 0;
    let computerScore = 0;

    let playerSelection = null;
    const buttonBar = document.querySelector('.button-bar');

    buttonBar.addEventListener('click', e => {
        const button = e.target;

        if (button.tagName === "BUTTON") {
            const buttonId = e.target.id;
            playerSelection = buttonId;
            // let computerSelection = getComputerChoice();
            let computerSelection = "paper";

            let gameResult = playRound(playerSelection, computerSelection);
            const results = document.getElementById('results'); 

            

            switch (gameResult) {
                case 1: 
                results.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
                playerScore++;
                break;
                case 2:
                results.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
                computerScore++;
                break;
                default: 
                results.textContent = `It's a tie! ${playerSelection} and ${computerSelection}`;
            }

            // Changing score in the DOM
            let scoreValueL = document.getElementById('score-value-L');
            scoreValueL.textContent = computerScore;

            let scoreValueR = document.getElementById('score-value-R');
            scoreValueR.textContent = playerScore;
        }
    })
  }
