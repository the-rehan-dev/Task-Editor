
let tasks = [];
let filter = "all";


const form      = document.getElementById("taskForm");
const inputBox  = document.getElementById("inputBox");
const errorMsg  = document.getElementById("errorMsg");
const list      = document.getElementById("showTask");
const emptyMsg  = document.getElementById("emptyMsg");
const toolbar   = document.getElementById("toolbar");
const counter   = document.getElementById("counter");
const clearDone = document.getElementById("clearDone");


function load() {
  try { tasks = JSON.parse(localStorage.getItem("tasks")) || []; }
  catch { tasks = []; }
}
function save() {
  try { localStorage.setItem("tasks", JSON.stringify(tasks)); } catch {}
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

function addTask() {
  const text = inputBox.value.trim();

 
  if (!text) {
    showError("Please enter a task!");
    return;
  }

  if (tasks.some((t) => t.text.toLowerCase() === text.toLowerCase())) {
    showError("That task already exists.");
    return;
  }

  tasks.push({ id: Date.now(), text, done: false });
  inputBox.value = "";
  showError("");
  save();
  render();
  inputBox.focus();
}

function showError(msg) {
  errorMsg.textContent = msg;
  inputBox.classList.toggle("invalid", Boolean(msg));
}
inputBox.addEventListener("input", () => showError(""));


document.querySelector(".filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filterBtn");
  if (!btn) return;
  filter = btn.dataset.filter;
  document.querySelectorAll(".filterBtn")
    .forEach((b) => b.classList.toggle("active", b === btn));
  render();
});


clearDone.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  save();
  render();
});


function render() {
  list.innerHTML = "";

  const visible = tasks.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );

  visible.forEach((t) => list.appendChild(createTaskEl(t)));

  const remaining = tasks.filter((t) => !t.done).length;
  counter.textContent = `${remaining} task${remaining === 1 ? "" : "s"} left`;
  toolbar.hidden = tasks.length === 0;
  emptyMsg.hidden = visible.length > 0;
  emptyMsg.textContent = tasks.length === 0
    ? "No tasks yet. Add your first one above!"
    : "Nothing to show in this filter.";
}

function createTaskEl(task) {
  const li = document.createElement("li");
  li.className = "task" + (task.done ? " done" : "");

  
  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = task.done;
  check.setAttribute("aria-label", "Mark task complete");
  check.addEventListener("change", () => {
    task.done = check.checked;
    save();
    render();
  });

 
  const span = document.createElement("span");
  span.className = "taskText";
  span.textContent = task.text;
  span.title = "Double-click to edit";
 
  span.addEventListener("dblclick", () => startEdit(task, span));

  const removeBtn = document.createElement("button");
  removeBtn.className = "removeBtn";
  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("aria-label", `Remove task: ${task.text}`);

  removeBtn.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    save();
    render();
  });

  li.append(check, span, removeBtn);
  return li;
}


function startEdit(task, span) {
  const input = document.createElement("input");
  input.className = "editInput";
  input.value = task.text;
  input.maxLength = 120;
  span.replaceWith(input);
  input.focus();
  input.select();

  let finished = false;
  const finish = (commit) => {
    if (finished) return; 
    finished = true;
    const val = input.value.trim();
    if (commit && val) task.text = val;
    save();
    render();
  };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finish(true);
    if (e.key === "Escape") finish(false);
  });
  input.addEventListener("blur", () => finish(true));
}


load();
render();