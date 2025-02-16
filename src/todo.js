// TODO: Enable a seperate Todo List
// User can add or delete Todo List Separate from the default one
// User can navigate to Todo's from sidebar
// Each Todo has it's own tasks
// Each Todo Has it's own completed tasks

class Todo {
  constructor(name) {
    this._name = name;
    this.tasks = [];
    this.completedTasks = [];
  }

  get name() {
    return this._name;
  }

  addTask(description) {
  }

  deleteTask(index) {
    if (index > -1 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
    }
  }

  markTaskCompleted(index) {

  }

  getTasks(includeCompleted = false) {
    if (includeCompleted) {
      return this.tasks.concat(this.completedTasks);
    }
    return this.tasks;
  }

  getCompletedTasks() {
    return this.completedTasks;
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