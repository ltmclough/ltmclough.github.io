const questions = [
    { 
        question: "How many mathematical operators are used in JS?", 
        options: ["6", "4", "5", "8"], 
        answer: "6" 
    },
    { 
        question: "Which of the following is used for concatenation in strings?", 
        options: ["/", "+", "_", "-"], 
        answer: "+" 
    },
    { 
        question: "What method is used to see if a string includes a substring?", 
        options: ["has()", "contains()", "includes()", "isIn()"], 
        answer: "includes()" 
    },
    { 
        question: "What method is used to extract a substring from a string?", 
        options: ["replace()", "includes()", "take()", "slice()"], 
        answer: "slice()" 
    },
    { 
        question: "How do you add an item to an array?", 
        options: ["Use the push() function", "Use the pull() function", "Make a second array with the new value", "Change an element within the old array"], 
        answer: "Use the push() function" 
    },
    { 
        question: "Which of the following methods allow you to convert a string into an array?", 
        options: ["replace()", "split()", "slice()", "contains()"], 
        answer: "split()" 
    },
    { 
        question: "How many comparison operators are used in JS?", 
        options: ["7", "8", "6", "5"], 
        answer: "6" 
    },
    { 
        question: "How many logical operators are used in JS?", 
        options: ["6", "4", "2", "3"], 
        answer: "3" 
    },
    { 
        question: "What is the standard way to set up a for loop?", 
        options: ["(initializer; condition; final-expression)", "(condition; initializer; final-expression)", "(final-expression; condition; initializer)", "(initializer; final-expression; condition)"], 
        answer: "(initializer; condition; final-expression)" 
    },
    { 
        question: "How can you exit a loop early?", 
        options: ["Use a continue statement", "Use a break statement", "Find the end condition", "Exit the program"], 
        answer: "Use a break statement" 
    },
    { 
        question: "How is a custom made function invoked?", 
        options: ["State the parameters of the function", "Call a built-in function", "Call its name with parentheses after it", "Call its name"], 
        answer: "Call its name with parentheses after it" 
    },
    { 
        question: "Will a function work without calling the proper parameters?", 
        options: ["Yes, you can use as many as you want", "No, you must always use the exact amount of parameters", "No, there is no scenario where that will work", "No, but there is a work around"], 
        answer: "No, but there is a work around" 
    },
    { 
        question: "Can a function call a variable that is initialized within another function?", 
        options: ["Unless the function is within the other, then no", "No, functions can never call variables that are created within other functions", "Yes, there is not limit to which variables you can and can not call", "No, you can't call any variables within a function"], 
        answer: "Unless the function is within the other, then no" 
    },
    { 
        question: "Which line of code will remove the event listener?", 
        options: ['"btn.removeEventListener(changeBackground);"', '"btn.removeEventListener("click", changeBackground);"', '"btn.removeEventListener("click");"', '"btn.removeEventListener(changeBackground, "click");"'], 
        answer: '"btn.removeEventListener("click", changeBackground);"' 
    },
    { 
        question: "Which of these JavaScript runtimes are best suited for serverside services?", 
        options: ["Bun", "Chrome", "Node.js", "Deno"], 
        answer: "Node.js" 
    },
    { 
        question: "What happens if you add an event listener to a button and its parent elements?", 
        options: ["Only the element the button is contained in will activate a click event", "Only the highest parent element activates a click event", "Only the immediate parent element activates a click event", "All parental elements activate a click event"], 
        answer: "All parental elements activate a click event" 
    },
    { 
        question: "In a nutshell, what is an object?", 
        options: ["An element that can hold multiple types of variables and functions", "An element that can hold multiple variables", "An element that contains multiple functions", "An element that contains specific variables"], 
        answer: "An element that can hold multiple types of variables and functions" 
    },
    { 
        question: "How are variables/functions within an object directly called?", 
        options: ["By directly calling the variable/function name", "Using dot and/or bracket notation", "By calling the object and letting context do its thing", "By calling an outside function"], 
        answer: "Using dot and/or bracket notation" 
    },
    { 
        question: "What does the 'this' modifier do?", 
        options: ["It is a method/function that calls upon the attached variable", "It refers to a different object", "It refers to the object variable that the current method/function has called", "It initializes the attached variable"], 
        answer: "It refers to the object variable that the current method/function has called" 
    },
    { 
        question: "What does a constructor do?", 
        options: ["It allows us to build new functions", "It creates a new object", "It builds a new function", "It creates a new object and allows us to edit it using 'this'"], 
        answer: "It creates a new object and allows us to edit it using 'this'" 
    },    




];

let currentQuestionIndex = 0;
let score = 0;

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionObj = questions[currentQuestionIndex];
        document.getElementById("question").textContent = questionObj.question;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";
        
        questionObj.options.forEach(option => {
            let button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    } else {
        document.getElementById("quiz-container").innerHTML = `<h2>Game Over! Final Score: ${score}</h2>`;
    }
}

function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestionIndex].answer) {
        score++;
        alert("Correct!");
    } else {
        alert("Incorrect. The correct answer is: " + questions[currentQuestionIndex].answer);
    }
    currentQuestionIndex++;
    document.getElementById("score").textContent = "Score: " + score;
    displayQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    shuffleQuestions();
    displayQuestion();
});
