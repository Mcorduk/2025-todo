import { taskConst } from "./constants";

class Todo {
    constructor(icon, name) {
        this.icon = icon;
        this.name = name;
        this.tasks = [];
    }

    getTask(index) {
        return this.tasks[index];
    }

    addTask(task) {
        return this.tasks.push(task);
    }

    editTask(index, newTask) {
        if (index > -1 && index < this.tasks.length) {
            let task = this.tasks[index];

            // Update the task's properties with newTask's properties

            task.icon = newTask.icon;

            task.name = newTask.name;

            task.description = newTask.description;

            task.time = newTask.time;

            task.date = newTask.date;

            task.status = newTask.status;

            task.priority = newTask.priority;
        } else {
            throw new Error("Invalid task index");
        }
    }

    deleteTask(index) {
        if (index > -1 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        } else {
            throw new Error("Invalid task index");
        }
    }

    getTaskCount(
        property = taskConst.PROPERTY.STATUS,
        value = taskConst.STATUS.INCOMPLETE,
    ) {
        let count = 0;

        for (let task of this.tasks) {
            const PROPERTIES = Object.values(taskConst.PROPERTY);

            if (!PROPERTIES.includes(property)) {
                throw new Error("Unidentified property");
            }

            if (task[property] === value) {
                count++;
            }
        }

        return count;
    }
}

export { Todo };
