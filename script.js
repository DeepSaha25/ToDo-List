// Select DOM elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Try to load saved todos from localStorage
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save the todos array to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a DOM node for a todo object
function createTodoNode(todo, index) {
    const li = document.createElement("li");
    li.className = "todo-item";  

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.className = "todo-check";  

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        render();
        saveTodos();
    });

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.className = "todo-text";  

    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo:", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            render();
            saveTodos();
        }
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn"; 

    delBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render the full todo list
function render() {
    list.innerHTML = "";
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// Add a new todo
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = "";
    render();
    saveTodos();
}

addBtn.addEventListener("click", addTodo);
render();
