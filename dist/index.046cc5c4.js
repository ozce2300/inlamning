const t=document.getElementById("add"),e=new class{constructor(t,e){this.todos=[],this.task=t,this.completed=!1,this.priority=e}addTodo(t,e){return""!==t&&(1===e||2===e||3===e)}markTodoCompleted(t){t>=0&&t<this.todos.length?this.todos[t].completed=!0:console.error("Invalid todo index.")}getTodos(){return this.todos}saveToLocalStorage(){let t=JSON.stringify(this.todos);localStorage.setItem("todos",t)}loadFromLocalStorage(){let t=localStorage.getItem("todos");t&&(this.todos=JSON.parse(t))}}("",0);function o(){let t=document.getElementById("todosContainer");t.innerHTML="",e.getTodos().forEach(e=>{let o="";o=1===e.priority?"32px":2===e.priority?"24px":"16px",t.innerHTML+=`
        <article id="article"> 
            <p id="p" style="font-size: ${o};">${e.task}</p> 
            <button id="overright">Klar</button>
        </article>`,document.querySelectorAll("#overright").forEach(t=>{t.addEventListener("click",()=>{t.parentElement.querySelector("p").style.textDecoration="line-through"})})})}window.addEventListener("DOMContentLoaded",()=>{e.loadFromLocalStorage(),o()}),t.addEventListener("click",()=>{let t=document.getElementById("task"),r=document.getElementById("priority"),d=document.getElementById("todosContainer"),i=t.value,l=r.valueAsNumber;if(""!==i&&(1===l||2===l||3===l)){let t="";t=1===l?"32px":2===l?"24px":"16px",d.innerHTML+=`
        <article id="article"> 
            <p id="p" style="font-size: ${t};">${i}</p> 
            <button id="overright">Klar</button>
        </article>`,document.querySelectorAll("#overright").forEach(t=>{t.addEventListener("click",()=>{t.parentElement.querySelector("p").style.textDecoration="line-through"})})}e.addTodo(i,l)&&(e.todos.push({task:i,completed:!1,priority:l}),e.saveToLocalStorage(),t.value="",r.value="",o())});
//# sourceMappingURL=index.046cc5c4.js.map
