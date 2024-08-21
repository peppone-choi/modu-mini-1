import dayjs from "dayjs";
import "./main";
import "./styles/todo.scss";
import { Todo } from "./models/todo.model";
import { Value } from "sass";
const timeline = document.querySelector("#timeline");
const dayTimeList: Array<string> = [];
const timelineHtmlList: Array<string> = [];
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector(".add-task");
const taskTitleInput = document.querySelector("#task-title");
const taskStartDate = document.querySelector("#start-date");
const taskStartTime = document.querySelector("#start-time");
const taskEndTime = document.querySelector("#end-time");
const addTaskItemButton = document.querySelector(".add-task-item");

for (let i = 0; i < 24; i++) {
  dayTimeList.push(`${String(i).padStart(2, "0")}:00`);
  dayTimeList.push(`${String(i).padStart(2, "0")}:30`);
}

const renderTimeLine = () => {
  dayTimeList.forEach((time) => {
    const temp = document.createElement("div");
    temp.innerHTML = `
      <div class="timeline-row" data-time="${time}">
            <span class="time">${time}</span>
            <div class="time-contents"></div>
        </div>
      `;
    timelineHtmlList.push(temp.innerHTML);
  });
  if (timeline) {
    timeline.appendChild(document.createRange().createContextualFragment(timelineHtmlList.join("")));
  }
};

addTaskButton?.addEventListener("click", () => {
  modal?.setAttribute("style", "display: block");
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal?.setAttribute("style", "display: none");
  }
});

addTaskItemButton?.addEventListener("click", () => {
  if (!(taskTitleInput instanceof HTMLInputElement) || !(taskStartDate instanceof HTMLInputElement) || !(taskStartTime instanceof HTMLInputElement) || !(taskEndTime instanceof HTMLInputElement)) {
    return;
  } // 타입 가드
  if (taskTitleInput.value == "" || taskStartDate.value == "" || taskStartTime.value == "" || taskEndTime.value == "") {
    alert("모든 항목을 입력해주세요");
    return;
  } // 빈 값 체크
  console.log(taskTitleInput.value);
  console.log(taskStartDate.value);
  console.log(taskStartTime.value);
  console.log(taskEndTime.value);

  const newTodo = new Todo({
    content : taskTitleInput.value,
    day : taskStartDate.value,
    startTime : taskStartTime.value,
    endTime : taskEndTime.value,
  });
  console.log(newTodo);

  if (!localStorage.getItem("todo")) return;
  const oldTodo = JSON.parse(localStorage.getItem("todo") as string);
  console.log(oldTodo);

  localStorage.setItem("todo", JSON.stringify({id: newTodo.id, data: newTodo}))
  modal?.setAttribute("style", "display: none");
});

renderTimeLine();
