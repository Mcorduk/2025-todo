import { taskConst } from "./constants";
import { parse, format } from "date-fns";

class Task {
    constructor(
        icon,
        name,
        description,
        time,
        date,
        status = taskConst.STATUS.INCOMPLETE,
        priority = taskConst.PRIORITY.LOW,
    ) {
        this.icon = icon;
        this.name = name;
        this.description = description;
        this._time = time;
        this._date = date;
        this._status = status;
        this._priority = priority;
    }

    get time() {
        return this._time;
    }

    get date() {
        return this._date;
    }

    get status() {
        return this._status;
    }

    get priority() {
        return this._priority;
    }

    set date(date) {
        this._date = date;
    } //Will add validation later on

    set time(time) {
        try {
            const parsedTime = parse(time, "HH:mm", new Date());
            this._time = format(parsedTime, "ha").toLowerCase();
        } catch {
            this._time = "";
        }
    }

    set status(newStatus) {
        const STATUSES = Object.values(taskConst.STATUS);
        if (!STATUSES.includes(newStatus)) {
            return;
        }

        this._status = newStatus;
    }

    set priority(newPriority) {
        const TASK_PRIORITIES = Object.values(taskConst.PRIORITY);
        if (!TASK_PRIORITIES.includes(newPriority)) {
            return;
        }

        this._priority = newPriority;
    }

    toggleStatus() {
        if (this.status === taskConst.STATUS.INCOMPLETE) {
            this.status = taskConst.STATUS.COMPLETE;
        } else if (this.status === taskConst.STATUS.COMPLETE) {
            this.status = taskConst.STATUS.INCOMPLETE;
        }
    }

    togglePriority() {
        const priorities = Object.values(taskConst.PRIORITY);
        let currentIndex = priorities.indexOf(this.priority);

        this.priority = priorities[(currentIndex + 1) % priorities.length];
    }
}

export { Task };
