import "./styles.css";


// Add tasks to todo list
// delete indiv or all tasks

const TODO = [];



let task1 = new Task("Study", "All day study yee-haw", "progressing", "extreme")


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