var timer = document.querySelector(".timer");
var question = document.querySelector(".question");
var startBtn = document.querySelector(".startBtn");
var disHighScore = document.querySelector(".disHighScore");
var answers = document.querySelector(".answers");
var ansBtn = document.querySelector(".ansBtn");
var disScore = document.querySelector(".disScore");
var disName = document.querySelector(".name");

var highScore;
var score = 0;
var newName;
var oldName;
var i;
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

function init(){
  timer.textContent = 30;
  disScore.textContent = score;

  var winnersName = localStorage.getItem("winnersName");
  if(winnersName == null){
    oldName = "AA"
  } else {
    oldName = winnersName;
  }
  disName.textContent = oldName;

  var LShighScore = localStorage.getItem("highScore");
  if(LShighScore == null){
    highScore = 0;
  } else{
    highScore = LShighScore;
  }
  disHighScore.textContent = highScore;
}
function initialGen(){
  newName = prompt("congratulations you got a high score!", "enter your initials here");
  if (newName.length > 3){
  alert("you must enter up to three characters")
  initialGen()
  }
  newName = newName.toUpperCase();
  return newName;
} 

function displayResult(){
  clearInterval(timerRun);
  answers.innerHTML= "";
  timer.textContent = 0;
  
  startBtn.disabled = false;
  if (score == 0){
    question.textContent = "You didn't get any questions right!";
    answers.textContent = "Try harder next time";
  } else {
    question.textContent = "congratulations!";
  answers.textContent = "Your score is " + score;
  }
  if(score > highScore){
    highScore = score;
    // you got the highscore 
    // enter you name here
    localStorage.setItem("highScore", highScore)
    disHighScore.textContent = highScore;
    initialGen()
    localStorage.setItem("winnersName", newName)
    disName.textContent = newName;
    // congrat message
    }
};

function startTimer() {
  timerRun = setInterval(function() {
    timerCounter--;
    timer.textContent = timerCounter;
    if (timerCounter <= 0) {
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
  answers.textContent= "";
  i = 0;
  score = 0;
  disScore.textContent = score;
  timerCounter = 30;
  startBtn.disabled = true;
  askQuestions();
  startTimer();
};

function askQuestions(){
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

function pickAnswer(event){
  
  var element = event.target;
    if(element.matches(".ansBtn")){    
    let pick = element.parentElement.getAttribute("data-index")

    if (QAndA[i].answers[pick].isRight){
      answers.innerHTML = "";
      question.textContent = "Correct!"
      score = score + timerCounter;
      disScore.textContent = score;
    }else{
      answers.innerHTML = "";
      question.textContent = "Incorrect..."
      timerCounter = timerCounter - 5;
    }
    //goes to next question
    i++;
    if(QAndA.length > i){
      answers.innerHTML= "";
      //question.innerHTML="";
      askQuestions();
    } else {
      displayResult();
    }
  }
}

init();
startBtn.addEventListener("click", start)
answers.addEventListener("click", pickAnswer)
