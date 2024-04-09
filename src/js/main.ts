/**
 * Author: Özgür Celik
 * Email: ozce2300@student.miun.se
*/

import { Todo } from "./iTODO";

export class todo implements Todo {
    task: string;
    completed: boolean;
    priority: number;

    constructor(task: string, priority: number) {
        this.task = task;
        this.completed = false;
        this.priority = priority;
    }

    todos: Todo[] = [];

    addTodo(task: string, priority: number): boolean {
        if (task !== "" && (priority === 1 || priority === 2 || priority === 3)) {
            return true;
        }
        else {
            return false;
        }
    }

    markTodoCompleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
        } else {
            console.error("Invalid todo index.");
        }
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    saveToLocalStorage(): void {
        const todosJSON = JSON.stringify(this.todos);
        localStorage.setItem('todos', todosJSON);
    }

    loadFromLocalStorage() {
        const savedToDos = localStorage.getItem("todos");
        if (savedToDos) this.todos = JSON.parse(savedToDos);
    }
}

const addEl = document.getElementById("add") as HTMLButtonElement;

const todoInstance = new todo("", 0); // Skapar en instans av todo-klassen

// Ladda uppgifter från localStorage vid sidans inläsning
window.addEventListener('DOMContentLoaded', () => {
    todoInstance.loadFromLocalStorage();
    renderTodos();
});

addEl.addEventListener("click", () => {
    const taskEl = document.getElementById("task") as HTMLInputElement;
    const priorityEl = document.getElementById("priority") as HTMLInputElement;
    const todosContainerEl = document.getElementById("todosContainer") as HTMLDivElement;

    const task = taskEl.value;
    const priority = priorityEl.valueAsNumber;
    if (task !== "" && (priority === 1 || priority === 2 || priority === 3)) {

        let textSize = ''; 

        if (priority === 1) {
            textSize = '32px'; 
        } else if (priority === 2) {
            textSize = '24px';
        } else {
            textSize = '16px';
        }

        todosContainerEl.innerHTML += `
        <article id="article"> 
            <p id="p" style="font-size: ${textSize};">${task}</p> 
            <button id="overright">Klar</button>
        </article>`;

        const overright = document.querySelectorAll("#overright"); 
        overright.forEach(button => {
            button.addEventListener("click", () => {
                const article = button.parentElement as HTMLButtonElement; // hitta föräldern (<article>) för knappen
                const paragraph = article.querySelector("p") as HTMLParagraphElement; // hitta <p>-elementet i samma artikel

                paragraph.style.textDecoration = "line-through"; // överstryk texten
            });

        });
    }

    const iTodo: Todo = {
        task: task,
        completed: false,
        priority: priority
    };

    if (todoInstance.addTodo(task, priority)) { // Använder instansen för att validera att uppgiften ska läggas till
        todoInstance.todos.push(iTodo); // Lägger till i klassen todos-array

        todoInstance.saveToLocalStorage(); // Sparar till localStorage

        taskEl.value = ""; // Rensar input
        priorityEl.value = ""; // Rensar input

        renderTodos(); // Uppdatera visningen av uppgifterna
    }
});

// Funktion för att rendera uppgifterna
function renderTodos() {
    const todosContainerEl = document.getElementById("todosContainer") as HTMLDivElement;
    todosContainerEl.innerHTML = ""; // Rensa behållaren för att undvika duplicering

    todoInstance.getTodos().forEach(todo => {
        let textSize = ''; // För att lagra storleken på texten baserat på prio
        if (todo.priority === 1) {
            textSize = '32px'; 
        } else if (todo.priority === 2) {
            textSize = '24px'; 
        } else {
            textSize = '16px'; 
        }

        todosContainerEl.innerHTML += `
        <article id="article"> 
            <p id="p" style="font-size: ${textSize};">${todo.task}</p> 
            <button id="overright">Klar</button>
        </article>`;

        const overright = document.querySelectorAll("#overright"); 


        overright.forEach(button => {
            button.addEventListener("click", () => {
                const article = button.parentElement as HTMLButtonElement; // Hitta föräldern (<article>) för knappen
                const paragraph = article.querySelector("p") as HTMLParagraphElement; // Hitta <p>-elementet i samma artikel

                paragraph.style.textDecoration = "line-through"; // Överstryk texten
            });

        });
    });
}
