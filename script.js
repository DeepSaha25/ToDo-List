//Select DOM elements
const input =document.getElementById('todo-input')
const addBtn= document.getElementById('add-btn')
const list = document.getElementById('todo-list')

//Try to load aved todos from localStorage(if any)
const saved = localStorage.getItem('todos');
const todos = saved?JSON.parse(saved):[];

function saveTodos(){
    //Save current todos array to localStorage
    localStorage.setItem('todos',JSON.stringify(todos));
}
//Create a dom node for a todo object and append it to the list
function createTodoNode(todo,index){

}

//Render the whole todo list from todos array
function render(){
    list.innerHTML='';

    //Recreate each item
    todos.forEach((todo,index) => {
        const node = createTodoNode(todo ,index);
        list.appendChild(node)
    });
}

