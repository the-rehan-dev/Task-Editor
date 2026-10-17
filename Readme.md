# Task Editor

A simple, lightweight to-do app built with plain HTML, CSS and JavaScript. No frameworks or dependencies.

## Features

- Add tasks with the **Add** button or the **Enter** key
- Mark tasks as complete or incomplete with a checkbox
- Edit a task by double-clicking it (**Enter** or clicking away saves, **Esc** cancels)
- Remove individual tasks, or clear all completed tasks at once
- Filter tasks: **All**, **Active** or **Done**
- Counter showing how many tasks are left
- Duplicate and empty-task validation with inline error messages
- Tasks are saved in the browser (`localStorage`), so they survive a page refresh
- Responsive layout, keyboard-accessible, and respects reduced-motion settings

## Getting Started

1. Download or clone the project.
2. Open `index.html` in any modern browser.

No build step or installation is needed.

## Project Structure

```
Task_Editor/
├── index.html   # Page structure
├── style.css    # Theme, layout and animations
└── script.js    # App logic, state and storage
```

## How It Works

- **State:** All tasks live in a single `tasks` array, and each task is `{ id, text, done }`.
- **Rendering:** A single `render()` function rebuilds the list from that array whenever something changes.
- **Storage:** `save()` writes the array to `localStorage` after every change. `load()` reads it when the page opens.
- **Security:** Task text is inserted with `textContent`, never `innerHTML`, so user input can't inject HTML.

## Customization

Colors are defined as CSS variables at the top of `style.css`:

```css
:root {
    --bg-1: #0f1b4c;
    --bg-2: #2a1a5e;
    --accent: #5b8cff;
    --danger: #ff5c6c;
}
```

Change these to retheme the whole app.

## Limitations

- Tasks are stored only in the current browser on the current device.
- Clearing site data erases saved tasks.
- Private or incognito windows may not keep tasks between sessions.

