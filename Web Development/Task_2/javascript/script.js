document.addEventListener('DOMContentLoaded', function() {
  const newTodoInput = document.getElementById('new-todo');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');

  addBtn.addEventListener('click', function() {
    const taskText = newTodoInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    if (taskText !== '') {
      const priority = document.querySelector('input[name="priority"]:checked').value;
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.dataset.priority = priority;
      li.innerHTML = `
        <label>${taskText}</label>
        <div>
          <span>Start: ${startDate}</span>
          <span>End: ${endDate}</span>
          <button class="complete-btn">Complete</button>
        </div>
      `;
      todoList.appendChild(li);
      newTodoInput.value = '';
      startDateInput.value = '';
      endDateInput.value = '';
    }
  });

  todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('complete-btn')) {
      const listItem = e.target.closest('.todo-item');
      listItem.classList.toggle('completed');
    }
  });
});
