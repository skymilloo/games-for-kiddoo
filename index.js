let answersLocked = false;
let giftOpened = false;

const rewards = ["⭐", "🦋", "🌸", "🧸", "💎"];
let currentQuestion = 0;
let correctCount = 0;
let ticketUsed = false;

// =========================
// 🎮 QUESTIONS (EDIT HERE)
// =========================
const questions = [
  {
    image: "charlotte.jpg",
    clue: "tebak aja dulu",
    options: {
      A: "Actor A",
      B: "Actor B",
      C: "Actor C"
    },
    correct: "charlotte"
  },
  {
    image: "kao.jpg",
    clue: "series nya gamon sm ex",
    options: {
      A: "Actor D",
      B: "Actor E",
      C: "Actor F"
    },
    correct: "kao"
  },
  {
    image: "emi.jpg",
    clue: "ga sanggup kasih clue",
    options: {
      A: "Actor G",
      B: "Actor H",
      C: "Actor I"
    },
    correct: "emi"
  },
  {
    image: "viewjune.jpg",
    clue: "gmmtv.",
    options: {
      A: "Actor J",
      B: "Actor K",
      C: "Actor L"
    },
    correct: "viewjune"
  },
  {
    image: "shelly.jpg",
    clue: "kayak nya couple real (satu aja)",
    options: {
      A: "Actor M",
      B: "Actor N",
      C: "Actor O"
    },
    correct: "shelly"
  }
];


// =========================
// 📍 PAGE NAVIGATION
// =========================
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

function goToTicket() {
  showPage("ticketPage");
}


// =========================
// 🎟️ TICKET SYSTEM (ONE TIME USE)
// =========================
function verifyTicket() {
  const input = document.getElementById("ticketInput").value;
  const message = document.getElementById("ticketMessage");

  if (ticketUsed) {
    message.innerText = "❌ Ticket has expired.";
    return;
  }

  if (input === "cipacantik") {
    message.innerText = "✔ Ticket accepted. Good luck 🤍";
    document.getElementById("ticketStatus").innerText = "USED";

    setTimeout(() => {
      showPage("gamePage");
      loadQuestion();
    }, 1000);

    ticketUsed = true;
  } else {
    message.innerText = "❌ Invalid ticket code.";
  }
}


// =========================
// 🎮 LOAD QUESTION
// =========================

function loadQuestion() {
  document.getElementById("giftSection").style.display = "none";
document.getElementById("giftResult").innerHTML = "";
answersLocked = false;
giftOpened = false;

  const q = questions[currentQuestion];

  document.getElementById("questionNumber").innerText =
    "Question " + (currentQuestion + 1);

  document.getElementById("questionImage").src = q.image;
  document.getElementById("clueText").innerText =
    "💡 Tap to reveal clue";

  document.getElementById("feedbackText").innerText = "";

  document.getElementById("giftSection").style.display = "none";
 document.getElementById("questionImage").classList.remove("revealed");
 document.getElementById("questionImage").classList.remove("revealed");
}
// =========================
// 💡 SHOW CLUE
// =========================

function showClue() {
  const q = questions[currentQuestion];
  document.getElementById("clueText").innerText = q.clue;
}

// =========================
// 🎯 ANSWER CHECK
// =========================

function submitAnswer() {
  const userAnswer = document
    .getElementById("answerInput")
    .value
    .toLowerCase()
    .trim();

  const q = questions[currentQuestion];

  const correct = q.correct.toLowerCase();

  if (userAnswer === correct) {
    correctCount++;
    document.getElementById("feedbackText").innerText = "✔ Correct!";
    updateRewardBar(true);
  } else {
    document.getElementById("feedbackText").innerText = "❌ Wrong!";
    updateRewardBar(false);
  }

  document.getElementById("questionImage").classList.add("revealed");

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
      endGame();
    } else {
      loadQuestion();
      document.getElementById("answerInput").value = "";
    }
  }, 1200);
}
// =========================
// 🎁 OPEN GIFT BOX
// =========================

function openGift() {
  if (giftOpened) return;

  giftOpened = true;

  const result = document.getElementById("giftResult");
  const q = questions[currentQuestion];

  if (optionCorrect()) {
    result.innerText = "⭐ " + rewards[currentQuestion];
  } else {
    result.innerHTML = `<span class="empty-box-text">
📭 Empty Box...<br>
Maybe next one will be luckier 🤍
</span>`;

    setTimeout(() => {
      result.innerHTML = "";
    }, 8000);
  }

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
      endGame();
    } else {
      loadQuestion();
    }
  }, 1200);
}
function optionCorrect() {
  const q = questions[currentQuestion];
  return document.getElementById("feedbackText").innerText.includes("Correct");
}
// =========================
// ⭐ CHECK LAST ANSWER
// =========================

let lastCorrect = false;

function lastAnswerCorrect(q) {
  return document.getElementById("feedbackText").innerText.includes("Correct");
}

// =========================
// ⏭ NEXT QUESTION
// =========================

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    finishGame();
    return;
  }

  loadQuestion();
}

// =========================
// ⭐ REWARD TRACKER UI
// =========================
function updateRewardBar() {
  let bar = "";

  for (let i = 0; i < 5; i++) {
    if (i < correctCount) {
      bar += rewards[i];
    } else {
      bar += "□";
    }
  }

  document.getElementById("rewardProgress").innerText = bar;
}


// =========================
// 🏁 END GAME LOGIC
// =========================
function endGame() {
  if (correctCount === 5) {
    showPage("winPage");

    setTimeout(() => {
      showPage("voucherPage");
    }, 2000);

  } else {
    document.getElementById("resultText").innerText =
      `You collected ${correctCount} Little Rewards`;

    showPage("resultPage");
  }
}


// =========================
// 🚪 EXIT GAME
// =========================
function exitGame() {
  showPage("welcomePage");

  // reset game
  currentQuestion = 0;
  correctCount = 0;
  ticketUsed = false;

  document.getElementById("ticketStatus").innerText = "UNUSED";
  document.getElementById("ticketInput").value = "";
}function goFinal(){

    showPage("finalPage");

    document.getElementById("ending1").innerHTML =
    "Thank you for playing my little game. 🤍";

    setTimeout(()=>{
        document.getElementById("ending2").innerHTML =
        "I hope it made you smile, even just a little.";
    },1200);

    setTimeout(()=>{
        document.getElementById("ending3").innerHTML =
        "See you again when you receive your next ticket.";
    },2500);

    setTimeout(()=>{
        document.getElementById("ending4").innerHTML =
        "Waiting for the next ticket... 🎟";
    },3800);

}
