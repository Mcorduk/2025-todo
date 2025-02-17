import { TASK_PROPERTY, TASK_STATUS, TASK_PRIORITY } from "./constants";

// TODO: Enable a seperate Todo List
// User can add or delete Todo List Separate from the default one
// User can navigate to Todo's from sidebar
// Each Todo has it's own tasks
// Each Todo Has it's own completed tasks

class Todo {
  constructor(name) {
    this._name = name;
    this._tasks = [];
  }

  get name() {
    return this._name;
  }
  get tasks() {
    return this._tasks;
  }

  addTask(task) {
    return this._tasks.push(task);
  }

  deleteTask(index) {
    if (index > -1 && index < this._tasks.length) {
      this._tasks.splice(index, 1);
    }
  }

  toggleTaskStatus(index) {
    let task = this.getTask(index); 
    if(task.status === TASK_STATUS.INCOMPLETE) {
      task.status = "complete";
    } else if(task.status === TASK_STATUS.COMPLETE) {
      task.status = "incomplete";
    }
  }

  toggleTaskPriority(index) {
    let task = this.getTask(index); 
    
    const priorities = Object.values(TASK_PRIORITY)
    let priorityIndex = priorities.indexOf(task.priority)

    task.priority = priorities[priorityIndex + 1]
  }

  getTaskCount(property = TASK_PROPERTY.STATUS, value = TASK_STATUS.INCOMPLETE) {
    let count = 0;

    for (let task of this._tasks) {
      const PROPERTIES = Object.values(TASK_PROPERTY);
      
      if (!PROPERTIES.includes(property)) {
        throw new Error("Unidentified property")
      }

      if (task[property] === value){
        count++;
      } 
    }

    return count;
  }

  getTask(index) {
    return this._tasks[index]; 
  }
}


export { Todo };
/*  
function createTodoList() {
    const tasks = [];
  
    return {
      addTask(description) {
        const task = createTask(description);
        tasks.push(task);
      },
      removeTask(index) {
        tasks.splice(index, 1);
      },
      getTasks() {
        return tasks;
      },
    };
  }
  
const todoList = createTodoList();

todoList.addTask('Learn JavaScript');
todoList.addTask('Build a to-do app');
todoList.addTask('Write tests');

function displayTasks() {
  const tasks = todoList.getTasks();
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.description} - ${task.completed ? 'Completed' : 'Pending'}`);
  });
}

todoList.getTasks()[0].markCompleted();

displayTasks();
*/