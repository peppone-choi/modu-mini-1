import "./main";
import "./styles/todo.scss";
import { Todo } from "./models/todo.model";
import { render } from "sass";
import dayjs from "dayjs";

const timeline = document.querySelector("#timeline");
const dayTimeList: Array<string> = [];
const timelineHtmlList: Array<string> = [];
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector(".add-task");
const taskTitleInput = document.querySelector("#task-title");
const taskStartDate = document.querySelector("#start-date");
const taskEndDate = document.querySelector("#end-date");
const taskStartTime = document.querySelector("#start-time");
const taskEndTime = document.querySelector("#end-time");
const allDayCheck = document.querySelector("#allday");
const addTaskItemButton = document.querySelector(".add-task-item");
const calenderContainer = document.querySelector(".calendar-container");
const todoList = JSON.parse(localStorage.getItem("todo") ?? JSON.stringify([])); // 로컬스토리지에 있는 todo를 가져와서 파싱
for (let i = 0; i < 24; i++) {
  dayTimeList.push(`${String(i).padStart(2, "0")}:00`);
  dayTimeList.push(`${String(i).padStart(2, "0")}:30`);
}

// 오늘 날짜
const today = dayjs(new Date());
let selectedDate = today.format("YYYY-MM-DD");
// 요일 배열
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const renderCalendar = () => {
  const temp = document.createElement("ul");
  const renderDayList: Array<string> = [];
  days.forEach((day, i) => {
    renderDayList.push(`<li data-date="${dayjs(selectedDate)
      .add(i - dayjs(selectedDate).day(), "day")
      .format("YYYY-MM-DD")}">
                        <button class="${day}">
                            <p class="date">${dayjs(selectedDate).date() + (i - today.day())}</p>
                            <p>${day}</p>
                        </button>
                    </li>`);
  });
  temp.innerHTML = renderDayList.join("");
  if (calenderContainer instanceof HTMLElement) {
    calenderContainer.appendChild(temp);
  }
};

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

allDayCheck?.addEventListener("change", (e) => {
  if (e.target instanceof HTMLInputElement && taskStartTime instanceof HTMLInputElement && taskEndTime instanceof HTMLInputElement) {
    if (e.target.checked) {
      taskStartTime.setAttribute("disabled", "true");
      taskEndTime.setAttribute("disabled", "true");
      taskStartTime.value = "";
      taskEndTime.value = "";
    } else {
      taskStartTime.removeAttribute("disabled");
      taskEndTime.removeAttribute("disabled");
    }
  }
});

addTaskItemButton?.addEventListener("click", () => {
  if (
    !(taskTitleInput instanceof HTMLInputElement) ||
    !(taskStartDate instanceof HTMLInputElement) ||
    !(taskStartTime instanceof HTMLInputElement) ||
    !(taskEndTime instanceof HTMLInputElement) ||
    !(taskEndDate instanceof HTMLInputElement) ||
    !(allDayCheck instanceof HTMLInputElement)
  ) {
    return;
  } // 타입 가드
  if (
    taskTitleInput.value == "" ||
    taskStartDate.value == "" ||
    (taskStartDate.value === taskEndDate.value && (taskEndTime.value === "" || taskStartTime.value === "") && !allDayCheck.checked) ||
    (!allDayCheck.checked && taskStartTime.value == "" && taskEndTime.value == "")
  ) {
    alert("모든 항목을 입력해주세요");
    return;
  } // 빈 값 체크

  if (taskStartDate.value > taskEndDate.value) {
    alert("시작일이 종료일보다 늦습니다.");
    return;
  } // 시작일 종료일 비교
  if (taskStartDate.value === taskEndDate.value && taskStartTime.value > taskEndTime.value) {
    alert("시작시간이 종료시간보다 늦습니다.");
    return;
  }
  const newTodo = new Todo({
    id: todoList.length === 0 ? 0 : todoList[todoList.length - 1].id + 1,
    content: taskTitleInput.value,
    startDay: taskStartDate.value,
    endDay: taskEndDate.value,
    startTime: taskStartTime.value === "" ? null : taskStartTime.value,
    endTime: taskEndTime.value === "" ? null : taskEndTime.value,
  });
  if (todoList.length === 0) {
    // 로컬스토리지에 todo가 없을 때
    localStorage.setItem("todo", JSON.stringify([newTodo])); // 새로운 todo를 배열로 만들어서 저장
  } else {
    // 로컬스토리지에 todo가 있을 때
    const newTodoList = [...todoList, newTodo]; // 기존 todo와 새로운 todo를 합침
    localStorage.setItem("todo", JSON.stringify(newTodoList)); // 합친 todo를 다시 저장
  }
  taskTitleInput.value = "";
  taskStartDate.value = new Date().toISOString().slice(0, 10);
  taskEndDate.value = new Date().toISOString().slice(0, 10);
  taskStartTime.disabled = false;
  taskEndTime.disabled = false;
  taskStartTime.value = "";
  taskEndTime.value = "";
  allDayCheck.checked = false;

  modal?.setAttribute("style", "display: none");
});

renderTimeLine();
renderCalendar();

// 오늘 날짜 now 클래스에 입력
const nowButton = document.querySelector(".calendar-container ul li[data-date='" + today.format("YYYY-MM-DD") + "']");
if (nowButton instanceof HTMLElement) {
  nowButton.classList.add("now");
}
