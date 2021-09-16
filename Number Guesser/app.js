//Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;


// UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

//Play agaim event listener
game.addEventListener('mousedown', function (e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // Validate our input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //check if won

    if(guess === winningNum){
        //game over - won

        gameOver(true, `${winningNum} is correct. YOU WON!` )
    }else{
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //game over - lost

            gameOver(false, `Game over, you lost. The correct number was ${winningNum}` )
            // guessBtn.disabled = true;
        }else{
            // game continues = answer wrong
            
            //change border color
            guessInput.style.borderColor = 'red';

            //tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')

            //clear input
            guessInput.value = '';
        }
    }
});



function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //disable input
    guessInput.disabled = true;

    //change border color
    guessInput.style.borderColor = color;

    //set mssg
    setMessage(msg, color);

    //Play again
    guessBtn.value = 'Play again'
    guessBtn.className += 'play-again'
}

//get winning num
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}