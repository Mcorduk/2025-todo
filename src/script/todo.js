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

    deleteTask(index) {
        if (index > -1 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
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
