

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

function swapImages(playerSelection, computerSelection) {
    const interval = 500;
    const prepImage = document.getElementById("prep");

    prepImage.src = "images/prep.png";

    // setTimeout is an asynchronous function in JavaScript
    
    setTimeout(() => {
        // That's why I must check this conditional inside this block
        // Otherwise the compiler will just skip it
        if (gameState === "game over") 
            return;

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

function animateScore(whoScored) {
    const interval = 2000;

    let plusOne = whoScored === "computer" ? 'plus-one-L' : 'plus-one-R';  

    const span = document.createElement('span');

    // Set the class and style attributes
    span.className = plusOne;
    span.style.display = 'none';

    // Set the inner Text content to '+1'
    span.innerText = '+1';

    // Get the element with the class 'add-comment'
    const addComment = document.querySelector('.add-comment');

    // Append the 'span' element to the 'add-comment' element
    addComment.appendChild(span);

    // Fade in the 'span' element
    setTimeout(function() {
        span.style.display = 'block';
    }, 0);

    // Schedule removal of the 'span' element after 2000 milliseconds (2 seconds)
    setTimeout(function() {
        addComment.removeChild(span);
    }, interval);
}

function updateScore() {
    // Changing score in the DOM
    let scoreValueL = document.getElementById('score-value-L');
    scoreValueL.textContent = computerScore;

    let scoreValueR = document.getElementById('score-value-R');
    scoreValueR.textContent = playerScore;
}


function deactivateButtons() {
    const buttons = document.querySelectorAll('.button-bar');
    buttons.forEach(button => {
        button.classList.add('button-disabled');
    });
}

function activateButtons() {
    const buttons = document.querySelectorAll('.button-bar');
    buttons.forEach(button => {
        button.classList.remove('button-disabled');
    });
}

function gameOver(winner) {
    const prepImage = document.getElementById("prep");
    results.textContent = "Game Over. Play a rematch?";
    
    if (winner === 'player') {
        prepImage.src = "images/game-over/wolf game over.png";
    } else {
        prepImage.src = "images/game-over/red game over.png"
    }
    gameState = "game over";
    deactivateButtons();
    
    const rematchButton = document.createElement('button');
    rematchButton.textContent = '👍';
    rematchButton.classList.add('rematch-button');
    rematchButton.addEventListener('click', playAgain);
    
    results.append(rematchButton);

}

function playAgain() {
    const prepImage = document.getElementById("prep");
    prepImage.src = "images/prep.png";
    results.textContent = "Ready?";
    activateButtons();
    computerScore = 0;
    playerScore = 0;
    gameState = "playing";
    updateScore();
}

function game() {
    if (gameState === "game over") 
        return;

    let playerSelection = null;
    const buttonBar = document.querySelector('.button-bar');
    
    buttonBar.addEventListener('click', e => {
        const button = e.target;
        
        if (button.tagName === "BUTTON") {
            const buttonId = e.target.id;
            playerSelection = buttonId;
            let computerSelection = getComputerChoice();
            //let computerSelection = "rock";  // DEBUG
            
            let gameResult = playRound(playerSelection, computerSelection);
            const results = document.getElementById('results'); 
            
            swapImages(playerSelection, computerSelection);
            
            switch (gameResult) {
                case 1: 
                results.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
                playerScore++;
                animateScore("player");
                break;
                case 2:
                results.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
                computerScore++;
                animateScore("computer");
                break;
                default: 
                results.textContent = `It's a tie! ${playerSelection} and ${computerSelection}`;
            }
            
            updateScore();

            // Check if it's Game Over
            if (playerScore === 5 || computerScore === 5)
            {
                const winner = playerScore > computerScore ? 'player' : 'computer';
                gameOver(winner);
            }
        }
    })
}

let gameState = "playing";
let playerScore = 0;
let computerScore = 0;
game();
