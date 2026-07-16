class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoList';
        
        // DOM elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.clearBtn = document.getElementById('clearBtn');
        this.taskCount = document.getElementById('taskCount');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.attachEventListeners();
        this.render();
    }
    
    attachEventListeners() {
        // Add task on button click
        this.addBtn.addEventListener('click', () => this.addTodo());
        
        // Add task on Enter key
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        
        // Clear completed
        this.clearBtn.addEventListener('click', () => this.clearCompleted());
        
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
    }
    
    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (text === '') {
            alert('Please enter a task!');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.todoInput.focus();
        this.saveToStorage();
        this.render();
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToStorage();
        this.render();
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }
    
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            return;
        }
        
        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToStorage();
            this.render();
        }
    }
    
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            case 'all':
            default:
                return this.todos;
        }
    }
    
    updateTaskCount() {
        const activeTodos = this.todos.filter(todo => !todo.completed).length;
        const totalTodos = this.todos.length;
        
        if (activeTodos === 0 && totalTodos > 0) {
            this.taskCount.textContent = 'All tasks completed!';
        } else if (activeTodos === 1) {
            this.taskCount.textContent = '1 task left';
        } else {
            this.taskCount.textContent = `${activeTodos} tasks left`;
        }
        
        // Enable/disable clear button
        const hasCompleted = this.todos.some(todo => todo.completed);
        this.clearBtn.disabled = !hasCompleted;
    }
    
    render() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';
        
        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = `
                <div class="empty-state">
                    <p>${this.currentFilter === 'all' ? 'No tasks yet. Add one to get started!' : 
                       this.currentFilter === 'active' ? 'No active tasks!' : 
                       'No completed tasks!'}</p>
                </div>
            `;
        } else {
            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        data-id="${todo.id}"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn" data-id="${todo.id}">Delete</button>
                `;
                
                // Checkbox event listener
                li.querySelector('.todo-checkbox').addEventListener('change', (e) => {
                    this.toggleTodo(parseInt(e.target.dataset.id));
                });
                
                // Delete button event listener
                li.querySelector('.delete-btn').addEventListener('click', (e) => {
                    this.deleteTodo(parseInt(e.target.dataset.id));
                });
                
                this.todoList.appendChild(li);
            });
        }
        
        this.updateTaskCount();
    }
    
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }
    
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.todos = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            this.todos = [];
        }
    }
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});