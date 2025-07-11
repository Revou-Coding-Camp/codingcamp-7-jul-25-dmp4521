// Array to hold tasks
let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const taskList = document.getElementById('taskList');

    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskName === '') {
        alert('Please enter a task.');
        return;
    }

    if (dueDate === '') {
        alert('Please select a due date.');
        return;
    }

    // Create new task object
    const newTask = {
        id: Date.now(), // unique id based on timestamp
        name: taskName,
        dueDate: dueDate,
        completed: false
    };

    // Add to tasks array
    tasks.push(newTask);

    // Clear inputs
    taskInput.value = '';
    dueDateInput.value = '';

    // Render the updated task list
    renderTasks();
}

// Function to render tasks in the table
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const filter = document.getElementById('filterselect').value;

    // Clear current list
    taskList.innerHTML = '';

    // Filter tasks if needed
    let filteredTasks = tasks;
    if (filter === 'complete') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        // Show empty message
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = 4;
        emptyCell.textContent = 'Task is Empty!!';
        emptyRow.appendChild(emptyCell);
        taskList.appendChild(emptyRow);
        return;
    }

    // Create rows for each task
    filteredTasks.forEach(task => {
        const row = document.createElement('tr');

        // Task name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = task.name;
        if (task.completed) {
            nameCell.style.textDecoration = 'line-through';
            nameCell.style.color = 'gray';
        }
        row.appendChild(nameCell);

        // Due date cell
        const dueDateCell = document.createElement('td');
        dueDateCell.textContent = task.dueDate;
        row.appendChild(dueDateCell);

        // Status cell with checkbox
        const statusCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskStatus(task.id));
        statusCell.appendChild(checkbox);
        row.appendChild(statusCell);

        // Actions cell with delete button
        const actionsCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'bg-red-500 text-white p-[4px] rounded';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        actionsCell.appendChild(deleteBtn);
        row.appendChild(actionsCell);

        taskList.appendChild(row);
    });
}

// Function to toggle task completion status
function toggleTaskStatus(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return {...task, completed: !task.completed};
        }
        return task;
    });
    renderTasks();
}

// Function to delete a single task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Function to delete all tasks
function deleteAllTasks() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        renderTasks();
    }
}

// Function to update the task list based on filter
function updateTaskList() {
    renderTasks();
}

// Event listener for Update button
document.getElementById('update').addEventListener('click', e => {
    e.preventDefault(); // prevent form submission if inside form
    updateTaskList();
});

// Initial render when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});