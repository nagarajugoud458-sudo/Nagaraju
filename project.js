let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.done) return;
        if (filter === "pending" && task.done) return;

        const li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${index})" class="${task.done ? 'completed' : ''}">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    tasks.push({ text: input.value, done: false });
    input.value = "";

    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function filterTasks(type) {
    renderTasks(type);
}

function searchTask() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const listItems = document.querySelectorAll("li");

    listItems.forEach(li => {
        const text = li.innerText.toLowerCase();
        li.style.display = text.includes(search) ? "block" : "none";
    });
}

// Initial render
renderTasks();