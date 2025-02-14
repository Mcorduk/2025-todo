// TODO: Enable a seperate Todo List
// User can add or delete Todo List Separate from the default one
// User can navigate to Todo's from sidebar
// Each Todo has it's own tasks
// Each Todo Has it's own completed tasks

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