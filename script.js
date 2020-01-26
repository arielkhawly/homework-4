//Allow User to start the quiz
//timer begins

// Question Arrays

// Array of questions
const questionArray = [
    'Commonly used data types do NOT include:',
    'The condition in an if/else statement is enclosed within ______.',
    'Arrays in JavaScript can be used to store ______.',
    'String values must be closed within ____ when being assigned to variables.',
    'A very useful tool used during development and debugging for printing content to the debugger is:'
]

// Array of arrays with each question's options
const choicesArray = [
    ['Strings', 'Booleans', 'Alerts', 'Numbers'],
    ['Quotes', 'Curly Brackets', 'Parentheses', 'Square Brackets'],
    ['Numbers and Strings', 'Other Arrays', 'Booleans', 'All of the Above'],
    ['Commas', 'Curly Brackets', 'Quotes', 'Parentheses'],
    ['JavaScript', 'Terminal/Bash', 'For Loops', 'Console.log'],
]

// The index of each correct answer in its respective array
const correctArray = [2, 1, 3, 2, 3]

// Index of current question, according to questionArray

let currentQuestion = 0;

let seconds = 75 // Initial state of timer
let timer = document.getElementById('timer')
let status = document.getElementById('status') // Tell whether we got a question right or wrong
let scoreboard = document.getElementById('scoreboard')
let quizDiv = document.getElementById("quiz");
let timerInterval

function countdown() {
    // Hide the intro screen
    let intro = document.getElementById("intro")
    intro.style.display = "none"

    // show the first question
    quizDiv.style.display = "block"
    showQuestion(currentQuestion);
    timer.textContent = "Time: " + seconds;

    timerInterval = setInterval(function () {
        if (seconds <= 0) {
            clearInterval(timerInterval);
            endQuiz(seconds);
        } else {
            seconds--;
            timer.textContent = 'Time:' + seconds;
        }
    }, 1000);
}
let quizStart = document.getElementById("start")

quizStart.addEventListener("click", function () {
    countdown();
});


//Change screens to show question one

// Show the question on the page
function showQuestion(q) {
    if (q > 4) { // remember, start at 0 when counting
        // end quiz, show score
        clearInterval(timerInterval)
        endQuiz(seconds)
    } else {
        // show question
        let element = document.getElementById("question");
        element.textContent = questionArray[q];

        // show options
        let choices = choicesArray[q];
        for (let i = 0; i < choices.length; i++) {
            let element = document.getElementById("option" + i);
            element.textContent = choices[i];
            guess(q, i);
        }
    }
}

// Create buttons for each possible answer
function guess(q, id) {
    let button = document.getElementById("btn" + id)
    // button.removeEventListener('click')
    button.addEventListener('click', function () {
        if (id !== correctArray[q]) {
            seconds -= 10; // decrement timer if wrong answer is chosen
            timer.textContent = 'Time: ' + seconds;
            // don't forget to update the visuals
            status.textContent = "Wrong!"
        } else {
            status.textContent = "Correct!"
        }
        currentQuestion++;
        showQuestion(currentQuestion); // move on to the next question
    })
}

// End quiz, display final score
function endQuiz(score) {
    quizDiv.style.display = "none" // hide the quiz div

    scoreboard.style.display = "block"
    document.getElementById('scoreDisplay').textContent = "Your final score is " + score
}

// Add user's initials and score to rankings
let scoreForm = document.getElementById("enterInitials")

scoreForm.addEventListener('submit', function(event) {
    let scoreList = document.getElementById("scoreList")
    event.preventDefault()

    // Grab the initials the user entered
    let enteredInitials = document.getElementById("initials").value
    console.log(enteredInitials)

    // Hide the form
    scoreboard.style.display = "none"

    // At least check if they entered something
    if (enteredInitials.length > 0) {
        // show the table
        document.getElementById("scorePage").style.display = "block"
        // Add a list item
        scoreList.innerHTML += `<li>${enteredInitials} - ${seconds}</li>`
    }
})



