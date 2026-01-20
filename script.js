const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Restore score
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of ${questions.length}.`;
}

function handleAnswerSelection(questionIndex, choice) {
  userAnswers[questionIndex] = choice;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    const questionTitle = document.createElement("p");
    questionTitle.innerText = q.question;
    questionDiv.appendChild(questionTitle);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // ✅ Restore checked state (HTML + JS)
      if (userAnswers[i] === choice) {
        radio.checked = true;
        radio.setAttribute("checked", "true");
      }

      radio.addEventListener("change", () => {
        // remove checked attribute from siblings
        document
          .querySelectorAll(`input[name="question-${i}"]`)
          .forEach(r => r.removeAttribute("checked"));

        radio.checked = true;
        radio.setAttribute("checked", "true");

        handleAnswerSelection(i, choice);
      });

      label.appendChild(radio);
      label.append(` ${choice}`);
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}


renderQuestions();

submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
