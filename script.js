const timer = document.querySelector(".timer");
const question = document.querySelector(".question");
const startBtn = document.querySelector(".startBtn");
const disHighScore = document.querySelector(".disHighScore");
const answers = document.querySelector(".answers");
const ansBtn = document.querySelector(".ansBtn");
const disScore = document.querySelector(".disScore");
const disName = document.querySelector(".name");
const highBtn = document.querySelector(".highBtn");

let highScores = [];
let highScore;
let score = 0;
let newName;
let oldName;
let i;

let timerCounter;
let timerRun;

const QAndA = [
  {
    question: "What are the main colors on the flag of Spain?",
    answers: [
      { isRight: false, ans: "Black and yellow" },
      { isRight: false, ans: "Green and white" },
      { isRight: false, ans: "Blue and white" },
      { isRight: true, ans: "Red and yellow" },
    ],
  },
  {
    question: "Which of these animals does NOT appear in the Chinese zodiac?",
    answers: [
      { isRight: false, ans: "Rabbit" },
      { isRight: true, ans: "Bear" },
      { isRight: false, ans: "Dragon" },
      { isRight: false, ans: "Dog" },
    ],
  },
  {
    question:
      "In darts, what's the most points you can score with a single throw?",
    answers: [
      { isRight: false, ans: "20" },
      { isRight: false, ans: "80" },
      { isRight: true, ans: "60" },
      { isRight: false, ans: "50" },
    ],
  },
];

function init() {
  timer.textContent = 30;
  disScore.textContent = score;

  let tempHighScores = JSON.parse(localStorage.getItem("highScores"));
  if (tempHighScores === null) {
    highScore = 0;
    oldName = "AA";
  } else {
    highScores = JSON.parse(localStorage.getItem("highScores"));
    highScore = highScores[0].scr;
    oldName = highScores[0].nam;
  }
  disHighScore.textContent = highScore;
  disName.textContent = oldName;
}

function setScores() {
  newScore = score;
  let save = confirm("would you like to save your score?");
  if (!save) {
    return;
  } else {
    newName = prompt(
      "congratulations you got a high score!",
      "enter your initials here"
    );
    if (newName.length > 3) {
      alert("you must enter up to three characters");
      setScores();
    }
  }
  newName = newName.toUpperCase();
  let tempObj = { scr: newScore, nam: newName };
  highScores.push(tempObj);
  highScores.sort(function (a, b) {
    return b.scr - a.scr;
  });
  highScores = highScores.slice(0, 5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function displayResult() {
  clearInterval(timerRun);
  answers.innerHTML = "";
  timer.textContent = 0;
  startBtn.disabled = false;
  highBtn.disabled = false;
  if (score === 0) {
    question.textContent = "You didn't get any questions right!";
    answers.textContent = "Try harder next time";
  } else {
    question.textContent = "congratulations!";
    answers.textContent = "Your score is " + score;
  }
  setScores();
  disHighScore.textContent = highScores[0].scr;
  disName.textContent = highScores[0].nam;
}

function startTimer() {
  timerRun = setInterval(function () {
    timerCounter--;
    timer.textContent = timerCounter;
    if (timerCounter <= 0) {
      displayResult();
    }
  }, 1000);
}

function start() {
  answers.textContent = "";
  i = 0;
  score = 0;
  disScore.textContent = score;
  timerCounter = 30;
  startBtn.disabled = true;
  highBtn.disabled = true;
  askQuestions();
  startTimer();
}

function askQuestions() {
  question.textContent = QAndA[i].question;

  for (let j = 0; j < QAndA[i].answers.length; j++) {
    let li = document.createElement("li");
    li.setAttribute("data-index", j);

    let text = document.createElement("p");
    text.textContent = QAndA[i].answers[j].ans;

    let button = document.createElement("button");
    button.textContent = "Pick me?";
    button.setAttribute("class", "ansBtn");

    li.appendChild(text);
    li.appendChild(button);
    answers.appendChild(li);
  }
}

function pickAnswer(event) {
  let element = event.target;
  if (element.matches(".ansBtn")) {
    let pick = element.parentElement.getAttribute("data-index");

    if (QAndA[i].answers[pick].isRight) {
      answers.innerHTML = "";
      question.textContent = "Correct!";
      score = score + timerCounter;
      disScore.textContent = score;
    } else {
      answers.innerHTML = "";
      question.textContent = "Incorrect... -5 seconds";
      timerCounter = timerCounter - 5;
    }
    setTimeout(function () {
      i++;
      if (QAndA.length > i) {
        answers.innerHTML = "";
        askQuestions();
      } else {
        displayResult();
      }
    }, 1000);
  }
}

function highSList() {
  answers.innerHTML = "";
  question.textContent = "Top 5 High Scores:";
  highScores.map((score) => {
    let li = document.createElement("li");
    li.textContent = `${score.nam}: ${score.scr}`;
    answers.appendChild(li);
  });
}
init();

highBtn.addEventListener("click", highSList);
startBtn.addEventListener("click", start);
answers.addEventListener("click", pickAnswer);
