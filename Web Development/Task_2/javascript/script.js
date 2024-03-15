document.addEventListener('DOMContentLoaded', function() {
  const newTodoInput = document.getElementById('new-todo');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const addBtn = document.getElementById('add-btn');
  const deleteAllBtn = document.getElementById('delete-all-btn');
  const todoList = document.getElementById('todo-list');

  // Load tasks from localStorage when the page is loaded
  loadTasks();

  addBtn.addEventListener('click', function() {
    const taskText = newTodoInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    if (taskText !== '') {
      const priority = document.querySelector('input[name="priority"]:checked').value;
      const task = { id: Date.now(), text: taskText, startDate: startDate, endDate: endDate, priority: priority, completed: false };
      addTask(task);
      newTodoInput.value = '';
      startDateInput.value = '';
      endDateInput.value = '';
    }
  });

  deleteAllBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all tasks?')) {
      localStorage.removeItem('tasks');
      renderTasks();
    }
  });

  function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
  }

  function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (task.completed) {
      li.classList.add('completed');
    }
    li.innerHTML = `
      <label>${task.text}</label>
      <div>
        <span>Start: ${task.startDate}</span>
        <span>End: ${task.endDate}</span>
        <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
        <button class="update-btn">Update</button>
      </div>
    `;
    li.dataset.id = task.id;
    todoList.appendChild(li);
  }
  

  function renderTasks() {
    todoList.innerHTML = '';
    loadTasks();
  }

  todoList.addEventListener('click', function(e) {
    const target = e.target;
    const listItem = target.closest('.todo-item');
    const taskId = listItem.dataset.id;
    if (target.classList.contains('complete-btn')) {
      toggleCompleted(taskId);
    } else if (target.classList.contains('delete-btn')) {
      deleteTask(taskId);
    } else if (target.classList.contains('update-btn')) {
      updateTask(taskId);
    }
  });

  function toggleCompleted(id) {
    const tasks = getTasks();
    const index = tasks.findIndex(task => task.id == id);
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function deleteTask(id) {
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.id != id);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    renderTasks();
  }

  function updateTask(id) {
    const tasks = getTasks();
    const taskToUpdate = tasks.find(task => task.id == id);
    const newText = prompt('Enter new text for the task:', taskToUpdate.text);
    if (newText !== null) {
      const newStartDate = prompt('Enter new start date:', taskToUpdate.startDate);
      const newEndDate = prompt('Enter new end date:', taskToUpdate.endDate);
      taskToUpdate.text = newText;
      taskToUpdate.startDate = newStartDate;
      taskToUpdate.endDate = newEndDate;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  }
});
