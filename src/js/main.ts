import { todo } from "./iTODO";

class TodoList implements todo  {
    task:string
    completerd:boolean
    priority: number

    constructor( task:string, priority: number ,) {
        this.task = task;
        this.completerd = false;
        this.priority = priority
    }


let todos : object[] = [];


addTodo(task: string, priority: number) : boolean {
    if(task != "" && (priority == 1 || priority == 2 || priority == 3)) {

        return true;
    }

    else {
        return false;
    }
} 

}

