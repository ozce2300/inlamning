import { itodo } from "./iTODO"

export class todo implements itodo {
    task: string;
    completed: boolean;
    priority: number;

    constructor(task: string, completed: boolean, priority: number) {
        this.task = task;

        this.completed = completed;
        this.priority = priority;
    }


}

