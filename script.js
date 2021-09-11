var timer = document.querySelector(".timer");
var question = document.querySelector(".question");
var startBtn = document.querySelector(".startBtn");
var highScore = document.querySelector(".highScore");
var answers = document.querySelector(".answers");


var score;
var newName;
var OldName;

// timer vars
var timerCounter;
var timerRun;
// placeholder for questions
var QAndA =[{
  question: "q1",
  answers:[
    {isRight:false, ans:"a1"},
    {isRight:false, ans:"a2"},
    {isRight:false, ans:"a3"},
    {isRight:true, and:"a4"}]
},
  {question: "q2",
  answers:[
    {isRight:false, ans:"a1"},
    {isRight:false, ans:"a2"},
    {isRight:false, ans:"a3"},
    {isRight:true, and:"a4"}]
},
  {question: "q3",
  answers:[
    {isRight:false, ans:"a1"},
    {isRight:false, ans:"a2"},
    {isRight:false, ans:"a3"},
    {isRight:true, and:"a4"}]
}];


function displayResult(){
  //you score is !

  if(score > highScore){
    // you got the highscore 
    // enter you name here
    localStorage.setItem("highScore", highScore)
    // congrat message
    }
};

function startTimer() {
    timerRun = setInterval(function() {
      timerCounter--;
      timer.textContent = timerCounter;
      if (timerCounter === 0) {
        displayResult();
        clearInterval(timerRun);
      }
    }, 1000);
};

function checkHighScore(){
  if(score > highScore){
    OldName = newName;
    highScore = score;
    localStorage.setItem("highScore", highScore);
    localStorage.setItem("HSname", OldName);
  }
};

function start(){
    timerCounter = 30;

    askQuestions();
    startTimer();
};

function askQuestions(){
  let i = 0;
  question.textContent = QAndA[i].question;
    
  for( let j = 0; j < QAndA[i].answers.length; j++){
    
    var li = document.createElement("li");
    li.textContent = QAndA[i].answers[j].ans;
    li.setAttribute("data-index", j);

    var button = document.createElement("button");
    button.textContent = "Pick me?";

    li.appendChild(button);
    answers.appendChild(li);
  };
};

function pickAnswer(){
  let pick = getAttribute("data-index")
  if (QAndA[i].answer[pick].isRight){
    //display correct
    score = score + 10;
  }else{
    //display incorrect
    timerCounter = timerCounter - 5;
  }
  i++;
  if(QAndA.length < i){
    askQuestions();
  } else {
    displayResult();
  }
}

startBtn.addEventListener("click", start)
button.addEventListener("click", pickAnswer)