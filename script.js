const questions = {
    easy: [
        { korean: "안녕하세요", options: { A: "नमस्कार", B: "धन्यवाद", C: "पानी", D: "पुस्तक" }, correctAnswer: "A" },
        { korean: "물", options: { A: "पानी", B: "घर", C: "साथी", D: "माया" }, correctAnswer: "A" },
        { korean: "사람", options: { A: "व्यक्ति", B: "पानी", C: "गाडी", D: "माया" }, correctAnswer: "A" },
    ],
    medium: [
        { korean: "회사", options: { A: "कम्पनी", B: "पानी", C: "घर", D: "माया" }, correctAnswer: "A" },
        { korean: "일", options: { A: "काम", B: "साथी", C: "माया", D: "पानी" }, correctAnswer: "A" },
        { korean: "회의", options: { A: "बैठक", B: "पानी", C: "साथी", D: "भात" }, correctAnswer: "A" },
    ],
    hard: [
        { korean: "기계", options: { A: "मेशिन", B: "पानी", C: "साथी", D: "माया" }, correctAnswer: "A" },
        { korean: "설계", options: { A: "डिजाइन", B: "पानी", C: "साथी", D: "माया" }, correctAnswer: "A" },
        { korean: "기술", options: { A: "प्रविधि", B: "पानी", C: "साथी", D: "भात" }, correctAnswer: "A" },
    ]
};

let currentLevel = 'easy';
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 30;
let wrongAnswers = [];

// Load question based on the current level
function loadQuestion() {
    const question = questions[currentLevel][currentQuestionIndex];
    document.getElementById('korean-word').textContent = question.korean;
    const options = document.querySelectorAll('.option-btn');
    options.forEach(option => {
        option.textContent = question.options[option.dataset.answer];
    });
    document.getElementById('result').textContent = '';
    document.getElementById('next-btn').style.display = 'none'; // Hide Next button until answer is selected
    startTimer();
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions[currentLevel].length) {
        currentQuestionIndex = 0; // Reset to start if no more questions
    }
    loadQuestion();
}

// Check selected answer
function checkAnswer(selectedOption) {
    const question = questions[currentLevel][currentQuestionIndex];
    const resultContainer = document.getElementById('result');

    if (selectedOption === question.correctAnswer) {
        resultContainer.textContent = 'Correct!';
        resultContainer.className = 'correct';
        score++;
    } else {
        resultContainer.textContent = 'Incorrect!';
        resultContainer.className = 'incorrect';
        wrongAnswers.push(question);  // Record wrong answer
    }

    document.getElementById('score').textContent = `Score: ${score}`;

    // Show next button after selection or timeout
    document.getElementById('next-btn').style.display = 'block';
}

// Start the countdown timer
function startTimer() {
    timeRemaining = 30; // Reset timer to 30 seconds at start of each question
    document.getElementById('timer').textContent = `${timeRemaining}s`;

    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = `${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            document.getElementById('result').textContent = 'Time is up!';
            wrongAnswers.push(questions[currentLevel][currentQuestionIndex]); // Record time-out as wrong
            document.getElementById('next-btn').style.display = 'block';
        }
    }, 1000);
}

// Level selection functionality
document.getElementById('level-select-btn').addEventListener('click', () => {
    const levels = ['easy', 'medium', 'hard'];
    let nextLevel = levels[(levels.indexOf(currentLevel) + 1) % 3];
    currentLevel = nextLevel;
    document.getElementById('level').textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
    loadQuestion();
});

// Listen for option button clicks
document.querySelectorAll('.option-btn').forEach(button => {
    button.addEventListener('click', () => {
        checkAnswer(button.dataset.answer);
    });
});

// Display wrong answers after the game ends
function displayWrongAnswers() {
    const wrongList = document.getElementById('wrong-answers-list');
    wrongList.innerHTML = '<h3>Wrong Answers:</h3>';
    const ul = document.createElement('ul');
    wrongAnswers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = `${answer.korean} - Correct Answer: ${answer.options[answer.correctAnswer]}`;
        ul.appendChild(li);
    });
    wrongList.appendChild(ul);
}

// Initial load
loadQuestion();
