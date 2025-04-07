const courses = [
    { name: "MATH 174", prereqs: [] },
    { name: "CSCI 220", prereqs: ["MATH 174"] },
    { name: "PHYS 101", prereqs: [] },
    { name: "CSCI 250", prereqs: ["CSCI 220"] },
    { name: "CSCI 380", prereqs: ["CSCI 210"] },
    { name: "CSCI 204", prereqs: [] },
    { name: "CSCI 210", prereqs: ["MATH 174"] }
];

// Function to create a course
function createCourseElement(course) {
    let div = document.createElement("div");
    div.classList.add("course");
    div.draggable = true;

    let title = document.createElement("span");
    title.textContent = course.name;

    let prereqText = document.createElement("small");
    prereqText.textContent = `Prereqs: ${course.prereqs.length ? course.prereqs.join(", ") : "None"}`;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function () {
        div.parentNode.removeChild(div);
        enableCourse(course.name);
    };

    div.appendChild(title);
    div.appendChild(prereqText);
    div.appendChild(removeBtn);

    div.addEventListener("click", () => alert(`${course.name} - Prerequisites: ${prereqText.textContent}`));

    div.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", JSON.stringify(course));
    });

    return div;
}

// Function to add courses to the course list
function populateCourseList() {
    let courseList = document.getElementById("courseList");
    courseList.innerHTML = "<h3>Available Courses</h3>";
    courses.forEach(course => {
        courseList.appendChild(createCourseElement(course));
    });
}

function disableCourse(courseName) {
    let courseItems = document.querySelectorAll("#courseList .course");
    courseItems.forEach(course => {
        if (course.firstChild.textContent === courseName) {
            course.style.display = "none";
        }
    });
}

function enableCourse(courseName) {
    let courseItems = document.querySelectorAll("#courseList .course");
    courseItems.forEach(course => {
        if (course.firstChild.textContent === courseName) {
            course.style.display = "block";
        }
    });
}

// Function to get courses from a previous semester
function getTakenCourses() {
    let takenCourses = new Set();
    document.querySelectorAll(".semester .course").forEach(course => {
        takenCourses.add(course.firstChild.textContent);
    });
    return takenCourses;
}

document.querySelectorAll(".semester").forEach(container => {
    container.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    container.addEventListener("drop", (event) => {
        event.preventDefault();
        let courseData = JSON.parse(event.dataTransfer.getData("text"));

        let takenCourses = getTakenCourses();
        
        // Check if the course is already in any semester
        let allCourses = document.querySelectorAll(".semester .course");
        for (let course of allCourses) {
            if (course.firstChild.textContent === courseData.name) {
                alert("This course has already been taken in a previous semester!");
                return;
            }
        }

        // Check if prerequisites are met
        for (let prereq of courseData.prereqs) {
            if (!takenCourses.has(prereq)) {
                alert(`Cannot take ${courseData.name} until prerequisite ${prereq} is completed in a previous semester.`);
                return;
            }
        }

        container.appendChild(createCourseElement(courseData));
        disableCourse(courseData.name);
    });
});

document.getElementById("reset").addEventListener("click", () => {
    document.querySelectorAll(".semester").forEach(container => container.innerHTML = "<h3>" + container.querySelector("h3").textContent + "</h3>");
    populateCourseList();
});

populateCourseList();
