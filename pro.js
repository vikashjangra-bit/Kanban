let tasks = JSON.parse(localStorage.getItem("kanbanData")) || {
    todo: [],
    progress: [],
    done: []
};

let editMode = null;

const modal = document.getElementById("taskModal");

document.getElementById("openModal").onclick = () => {
    editMode = null;
    modal.style.display = "flex";
};

document.getElementById("cancelTask").onclick = () => {
    modal.style.display = "none";
};

function saveData() {
    localStorage.setItem("kanbanData", JSON.stringify(tasks));
}

function render() {
    ["todo","progress","done"].forEach(col => {
        const container = document.getElementById(col);
        container.innerHTML = "";

        tasks[col].forEach((task,index) => {

            const div = document.createElement("div");
            div.className = "task";
            div.draggable = true;

            div.innerHTML = `
                <h4>${task.title}</h4>
                <p>${task.desc}</p>
                <div class="task-actions">
                    <button onclick="editTask('${col}',${index})">✏</button>
                    <button onclick="deleteTask('${col}',${index})">🗑</button>
                </div>
            `;

            div.addEventListener("dragstart", e => {
                e.dataTransfer.setData("column", col);
                e.dataTransfer.setData("index", index);
            });

            container.appendChild(div);
        });
    });

    saveData();
}

function editTask(col,index){
    const task = tasks[col][index];

    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDesc").value = task.desc;
    document.getElementById("taskColumn").value = col;

    editMode = {col,index};
    modal.style.display = "flex";
}

function deleteTask(col,index){
    tasks[col].splice(index,1);
    render();
}

document.getElementById("saveTask").onclick = () => {

    const title = document.getElementById("taskTitle").value.trim();
    const desc = document.getElementById("taskDesc").value.trim();
    const column = document.getElementById("taskColumn").value;

    if(!title) return;

    const newTask = {title,desc};

    if(editMode){
        tasks[editMode.col].splice(editMode.index,1);
    }

    tasks[column].push(newTask);

    modal.style.display = "none";
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";

    render();
};

document.querySelectorAll(".task-list").forEach(list => {

    list.addEventListener("dragover", e => e.preventDefault());

    list.addEventListener("drop", e => {
        e.preventDefault();

        const fromCol = e.dataTransfer.getData("column");
        const index = e.dataTransfer.getData("index");
        const toCol = list.id;

        const moved = tasks[fromCol][index];

        tasks[fromCol].splice(index,1);
        tasks[toCol].push(moved);

        render();
    });

});

render();