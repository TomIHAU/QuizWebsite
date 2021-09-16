var timer = document.querySelector(".timer");
var question = document.querySelector(".question");
var startBtn = document.querySelector(".startBtn");
var disHighScore = document.querySelector(".disHighScore");
var answers = document.querySelector(".answers");
var ansBtn = document.querySelector(".ansBtn");
var disScore = document.querySelector(".disScore");
var disName = document.querySelector(".name");
var highBtn = document.querySelector(".highBtn")

var highScores = [];
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
  question: "What are the main colors on the flag of Spain?",
  answers:[
    {isRight:false, ans:"Black and yellow"},
    {isRight:false, ans:"Green and white"},
    {isRight:false, ans:"Blue and white"},
    {isRight:true, ans:"Red and yellow"}]
},
  {question: "Which of these animals does NOT appear in the Chinese zodiac?",
  answers:[
    {isRight:false, ans:"Rabbit"},
    {isRight:true, ans:"Bear"},
    {isRight:false, ans:"Dragon"},
    {isRight:false, ans:"Dog"}]
},
  {question: "In darts, what's the most points you can score with a single throw?",
  answers:[
    {isRight:false, ans:"20"},
    {isRight:false, ans:"80"},
    {isRight:true, ans:"60"},
    {isRight:false, ans:"50"}]
}];

function init(){
  timer.textContent = 30;
  disScore.textContent = score;

  var tempHighScores = JSON.parse(localStorage.getItem("highScores"));
  if(tempHighScores === null){
    highScore = 0;
    oldName = "AA"
  } else{
    highScores = JSON.parse(localStorage.getItem("highScores"));
    highScore = highScores[0].scr;
    oldName = highScores[0].nam;
  }
  disHighScore.textContent = highScore;
  disName.textContent = oldName;
}

function setScores(){
  newScore = score;
  var save = confirm("would you like to save your score?")
  if (!save){
    return;
  }else{
    newName  = prompt("congratulations you got a high score!", "enter your initials here");
    if (newName.length > 3){
      alert("you must enter up to three characters")
      setScores()
  }};
  newName = newName.toUpperCase();
  var tempObj = {scr: newScore, nam: newName};
  highScores.push(tempObj);
  highScores.sort(function(a,b){return b.scr - a.scr})
  highScores = highScores.slice(0, 5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
};

function displayResult(){
  clearInterval(timerRun);
  answers.innerHTML= "";
  timer.textContent = 0;
  startBtn.disabled = false;
  highBtn.disabled = false;
  if (score === 0){
    question.textContent = "You didn't get any questions right!";
    answers.textContent = "Try harder next time";
  } else {
    question.textContent = "congratulations!";
  answers.textContent = "Your score is " + score;
  }
  setScores();
  disHighScore.textContent = highScores[0].scr;
  disName.textContent = highScores[0].nam;
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

function start(){
  answers.textContent= "";
  i = 0;
  score = 0;
  disScore.textContent = score;
  timerCounter = 30;
  startBtn.disabled = true;
  highBtn.disabled = true;
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
      question.textContent = "Incorrect... -5 seconds"
      timerCounter = timerCounter - 5;
    }
    //goes to next question after delaying one sec
    setTimeout(function(){
    i++;
    if(QAndA.length > i){
      answers.innerHTML= "";
      askQuestions();
    } else {
      displayResult();
    }
    },1000);
  }
}

function highSList(){
  answers.innerHTML = ""
  for( let k = 0; k < highScores.length; k++){
    question.textContent = "Top 5 High Scores:"
    var li = document.createElement("li");
    li.textContent = highScores[k].nam + ": " + highScores[k].scr;
    answers.appendChild(li);
  };
}
init();

highBtn.addEventListener("click", highSList)
startBtn.addEventListener("click", start)
answers.addEventListener("click", pickAnswer)
