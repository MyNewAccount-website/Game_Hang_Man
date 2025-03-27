const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

ctx.lineWidth = 4;
ctx.strokeStyle = "white";

function firstTry() {
    // Рисуем основание виселицы (ниже, чтобы было более реалистично)
    ctx.beginPath();
    ctx.moveTo(width / 4, height - 50);
    ctx.lineTo(width / 2, height - 50);
    ctx.stroke();
}

function secondTry() {
    // Рисуем вертикальную стойку
    ctx.beginPath();
    ctx.moveTo(width / 3, height - 50);
    ctx.lineTo(width / 3, 60); // Подняли точку опоры выше
    ctx.stroke();
}

function thirdTry() {
    // Рисуем верхнюю перекладину (ниже, чем раньше)
    ctx.beginPath();
    ctx.moveTo(width / 3, 60);
    ctx.lineTo(width / 2, 60);
    ctx.stroke();

    // Дополнительная поддерживающая перекладина
    ctx.beginPath();
    ctx.moveTo(width / 3, 80);
    ctx.lineTo(width / 2 - 10, 60);
    ctx.stroke();
}

function fourthTry() {
    // Рисуем веревку (ниже, чем раньше)
    ctx.beginPath();
    ctx.moveTo(width / 2, 60);
    ctx.lineTo(width / 2, 100);
    ctx.stroke();
}

function fifthTry() {
    // Рисуем голову
    ctx.beginPath();
    ctx.arc(width / 2, 115, 15, 0, Math.PI * 2);
    ctx.stroke();
}

function sixthTry() {
    // Рисуем тело
    ctx.beginPath();
    ctx.moveTo(width / 2, 130);
    ctx.lineTo(width / 2, 180);
    ctx.stroke();
}

function seventhTry() {
    // Рисуем руки
    ctx.beginPath();
    ctx.moveTo((width / 2) - 20, 150);
    ctx.lineTo(width / 2, 140);
    ctx.lineTo((width / 2) + 20, 150);
    ctx.stroke();
}

function eighthTry() {
    // Рисуем ноги
    ctx.beginPath();
    ctx.moveTo(width / 2, 180);
    ctx.lineTo((width / 2) - 20, 210);
    ctx.moveTo(width / 2, 180);
    ctx.lineTo((width / 2) + 20, 210);
    ctx.stroke();
}


const tries = [firstTry, secondTry, thirdTry, fourthTry, fifthTry, sixthTry, seventhTry, eighthTry];

const startButton = document.getElementById("start");
const outPut = document.getElementById("out_put");
const input = document.getElementById("input");
const guessButton = document.getElementById("submit");
const attemptsLabel = document.getElementById("attempts");
const hint = document.getElementById("hint");
const letters = document.getElementById("letters");

const words = ["cat", "elephant", "tiger", "dog", "bird", "communication", "recommendation", "examination", "organization", "enthusiasm", "opportunity", "possibility", "manufacturer", "university", "imagination"];
var random;
var randomWord;

var answer;
var correctGuess;
var guessedLetter;

var attempts;
var counter;

var WORD;

function GameOver (){
    startButton.classList.remove("hide");
    input.classList.remove("show");
    guessButton.classList.remove("show");
    attemptsLabel.classList.remove("show");
}


function StartTheGame (){

    hint.style.color = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    random = Math.floor(Math.random() * words.length);
    randomWord = words[random];

    answer = input.value = "";
    correctGuess = false;
    guessedLetter = false;

    attempts = tries.length;
    counter = 0;

    WORD = [];

    GuessedLetters = [];

    attemptsLabel.innerHTML = `Attempts left: ${attempts}`;
    attemptsLabel.classList.add("show");
    startButton.classList.add("hide");
    input.classList.add("show");
    guessButton.classList.add("show");
    hint.classList.add("show");
    hint.innerHTML = "Hint";
    letters.classList.add("show");
    letters.innerHTML = "Guessed letters: "

    for (i = 0; i < randomWord.length; i++){
        WORD[i] = "_"; 
    }

    outPut.innerHTML = WORD.join(" ");
}

guessButton.addEventListener("click", () => {
    
    answer = input.value.toLowerCase();;
    correctGuess = false;
    guessedLetter = false;

    for (let j = 0; j < randomWord.length; j++) {
        if (answer === randomWord[j]) {
            if (GuessedLetters[j] == answer){
                guessedLetter = true;
            }
            GuessedLetters[j] = answer;
            WORD[j] = answer;
            correctGuess = true;
        }
    }
    
    if (!correctGuess) {
        tries[counter]();
        hint.innerHTML = "Wrong";
        hint.style.color = "red";
        attempts--;
        counter++;
    }

    if (correctGuess){
        if (guessedLetter){
            hint.innerHTML = `You already guessed ${answer} letter.`;
            hint.style.color = "orange";
        } else{
            hint.innerHTML = "Correct";
            hint.style.color = "green";
            letters.innerHTML += `${answer}, `;
        }
    }

    outPut.innerHTML = WORD.join(" ");
    
    if (attempts <= 0) {
        hint.innerHTML = "Game Over! You've run out of attempts.";
        hint.style.color = "red";
        letters.innerHTML = `The word was <u>${randomWord}</u>`;
        GameOver();
    }

    if ((WORD.join("")) == randomWord){
        hint.innerHTML = "You won";
        hint.style.color = "orange";
        GameOver();
    }

    attemptsLabel.innerHTML = `Attempts left: ${attempts}`;
});

startButton.addEventListener("click", StartTheGame);