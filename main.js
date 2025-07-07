const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addBtn = $(".add-btn");
const formAdd = $("#addTaskModal");
const modalClose = $(".modal-close");
const btnCancel = $(".btn-cancel");
const todoForm = $(".todo-app-form");
const titleInput = $("#taskTitle");

function closeForm() {
  formAdd.className = "modal-overlay";
  todoForm.reset();
}

// Hiển thị modal "Thêm mới"
function openForm() {
  formAdd.className = "modal-overlay show";
  setTimeout(() => titleInput.focus(), 100);
}

// Xử lí mở modal
addBtn.onclick = openForm;

// Xử lí đóng modal sau khi "thêm mới"
modalClose.onclick = closeForm;
btnCancel.onclick = closeForm;

// Xử lí khi form submit
const todoTasks = JSON.parse(localStorage.getItem("todoTask")) ?? [];

todoForm.onsubmit = (event) => {
  event.preventDefault();
  // Lấy toàn bộ formdata (dữ liệu từ các input, textare,...)
  const newTask = Object.fromEntries(new FormData(todoForm));
  newTask.isCompleted = false; // Mặc định task chưa được hoàn thành

  // Thêm task vao đầu danh sách
  todoTasks.unshift(newTask); // Thêm newTask vào đầu

  // Lưu toàn bộ danh sách task vao localStorage
  localStorage.setItem("todoTask", JSON.stringify(todoTasks));

  //  đóng modal
  closeForm();

  renderTasks(todoTasks);
};

function renderTasks(tasks) {
  const html = tasks
    .map(
      (task) => `
        <div class="task-card ${task.color} ${
        task.isCompleted ? "completed" : ""
      }">
          <div class="task-header">
            <h3 class="task-title">${task.title}</h3>
            <button class="task-menu">
              <i class="fa-solid fa-ellipsis fa-icon"></i>
              <div class="dropdown-menu">
                <div class="dropdown-item">
                  <i class="fa-solid fa-pen-to-square fa-icon"></i>
                  Edit
                </div>
                <div class="dropdown-item complete">
                  <i class="fa-solid fa-check fa-icon"></i>
                  ${task.isCompleted ? "Mark as Active" : "Mark as Completed"}
                </div>
                <div class="dropdown-item delete">
                  <i class="fa-solid fa-trash fa-icon"></i>
                  Delete
                </div>
              </div>
            </button>
          </div>
          <p class="task-description">
           ${task.description}
          </p>
          <div class="task-time">${task.startTime} - ${task.endTime}</div>
        </div>
  `
    )
    .join("");

  const todoList = $("#todoList");

  todoList.innerHTML = html;
}

// Render lần đầu, để hiển thị được danh sách task lấy từ localStorage
renderTasks(todoTasks);
