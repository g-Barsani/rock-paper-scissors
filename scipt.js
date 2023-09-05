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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const buttons = document.querySelectorAll("button");
function buttonDelay(buttons) {
    const interval = 10000;
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            button.setAttribute("disabled", "true");

            sleep(interval);

            button.removeAttribute("disabled");
        })
    })
}

function swapImages(playerSelection, computerSelection) {
    const interval = 500;
    const prepImage = document.getElementById("prep");

    prepImage.src = "images/prep.png";

    setTimeout(() => {
        switch (true) {
            case playerSelection === "rock" && computerSelection === "rock":
                prepImage.src = "images/ties/rock vs rock - tie.png";
                break;
            case playerSelection === "paper" && computerSelection === "paper":
                prepImage.src = "images/ties/paper vs paper - tie.png";
                break;
            case playerSelection === "scissors" && computerSelection === "scissors":
                prepImage.src = "images/ties/scissors vs scissors - tie.png";
                break;
            case playerSelection === "scissors" && computerSelection === "paper":
                prepImage.src = "images/all-loses-wolf/lose - paper scissors.png";
                break;
            case playerSelection === "paper" && computerSelection === "rock":
                prepImage.src = "images/all-loses-wolf/lose - rock paper.png";
                break;
            case playerSelection === "rock" && computerSelection === "scissors":
                prepImage.src = "images/all-loses-wolf/lose - scissors rock.png";
                break;
            case playerSelection === "rock" && computerSelection === "paper":
                prepImage.src = "images/all-loses-red/lose - paper rock.png";
                break;
            case playerSelection === "scissors" && computerSelection === "rock":
                prepImage.src = "images/all-loses-red/lose - rock scissors.png";
                break;
            case playerSelection === "paper" && computerSelection === "scissors":
                prepImage.src = "images/all-loses-red/lose - scissors paper.png";
                break;
            default:
                // Default case in case none of the conditions match
                break;
        }
    }, interval);
}

// buttonDelay(buttons);
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
            let computerSelection = getComputerChoice();
            // let computerSelection = "rock";
            
            let gameResult = playRound(playerSelection, computerSelection);
            const results = document.getElementById('results'); 
            
            swapImages(playerSelection, computerSelection);
            

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
