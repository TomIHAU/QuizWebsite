var timer = document.querySelector(".timer");
var question = document.querySelector(".question");
var startBtn = document.querySelector(".startBtn");

var questionList = [];
var answerList = [[],[]];
var score;
var highScore;
var newName;
var OldName;

var timerCounter;
var timerRun;

function win(){
  localStorage.setItem("highScore", highScore)
}

function startTimer() {
    timerRun = setInterval(function() {
      timerCounter--;
      timer.textContent = timerCounter;
      if (timerCount === 0) {
        clearInterval(timerRun);
      }
    }, 1000);
};

function checkHighScore(){
  if(score > highScore){
    OldName = newName;
    highScore = score;
    
  }
};

function start(){
    timerCounter = 30;


    startTimer();
};

startBtn.addEventListener("click", start)