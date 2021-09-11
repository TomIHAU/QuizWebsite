var timer = document.querySelector(".timer");
var question = document.querySelector(".question");
var startBtn = document.querySelector(".startBtn");
var disHighScore = document.querySelector(".disHighScore");
var answers = document.querySelector(".answers");
var ansBtn = document.querySelector(".ansBtn")
var disScore = document.querySelector(".disScore")

var highScore;
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
    {isRight:true, ans:"a4"}]
},
  {question: "q2",
  answers:[
    {isRight:false, ans:"a1"},
    {isRight:false, ans:"a2"},
    {isRight:false, ans:"a3"},
    {isRight:true, ans:"a4"}]
},
  {question: "q3",
  answers:[
    {isRight:false, ans:"a1"},
    {isRight:false, ans:"a2"},
    {isRight:false, ans:"a3"},
    {isRight:true, ans:"a4"}]
}];


function displayResult(){
  //you score is !
  startBtn.disabled = false;
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
      clearInterval(timerRun);
      answers.innerHTML= "";
      displayResult();
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
    startBtn.disabled = true;
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
    button.setAttribute("class", "ansBtn")

    li.appendChild(button);
    answers.appendChild(li);
  };
};

function pickAnswer(){

  answers.innerHTML= "";
  let pick = element.parentElement.getAttribute("data-index")
  if (QAndA[i].answer[pick].isRight){
    answers.innerHTML = "";
    question.textContent = "Correct!"
    score = score + timerRun;
  }else{
    answers.innerHTML = "";
    question.textContent = "Incorrect..."
    timerCounter = timerCounter - 5;
  }

  i++;
  if(QAndA.length < i){
    answers.innerHTML= "";
    //question.innerHTML="";
    askQuestions();
  } else {
    displayResult();
  }
}


startBtn.addEventListener("click", start)
ansBtn.addEventListener("click", pickAnswer)