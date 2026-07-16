# To-Do List Application

A modern, interactive to-do list web application with local storage functionality.

## Features

✅ **Add Tasks** — Easily add new tasks to your list
✅ **Mark Complete** — Check off tasks as you complete them
✅ **Delete Tasks** — Remove individual tasks
✅ **Filter View** — View all, active, or completed tasks
✅ **Clear Completed** — Bulk delete all completed tasks
✅ **Local Storage** — Tasks persist across browser sessions
✅ **Task Counter** — See how many tasks are left
✅ **Responsive Design** — Works perfectly on desktop and mobile
✅ **Beautiful UI** — Modern gradient design with smooth animations

## How to Use

1. **Add a Task**
   - Type your task in the input field
   - Click "Add Task" or press Enter

2. **Complete a Task**
   - Check the checkbox next to the task
   - Completed tasks appear with a strikethrough

3. **Delete a Task**
   - Click the "Delete" button next to any task

4. **Filter Tasks**
   - Click "All" to see all tasks
   - Click "Active" to see only incomplete tasks
   - Click "Completed" to see only finished tasks

5. **Clear Completed**
   - Click "Clear Completed" to remove all finished tasks at once

## Technical Details

- **HTML5** — Semantic markup and structure
- **CSS3** — Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript** — No dependencies, pure ES6 class-based architecture
- **Local Storage API** — Persistent data storage in the browser
- **XSS Protection** — HTML escaping for user input

## Data Storage

Tasks are stored in the browser's localStorage with the following structure:

```json
[
  {
    "id": 1234567890,
    "text": "Buy groceries",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Android)

## File Structure

```
.
├── index.html     # HTML structure
├── styles.css     # Styling and animations
├── app.js         # Application logic
└── README.md      # Documentation
```

## Installation

1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start adding tasks!

## No Installation Required

This is a pure client-side application. Simply open the HTML file in any modern web browser and start using it immediately. All data is saved locally on your device.

## License

Free to use and modify.
