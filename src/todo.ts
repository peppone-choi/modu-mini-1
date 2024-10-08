import "./main";
import "./styles/todo.scss";
import { Todo } from "./models/todo.model";

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
const addTaskItemButton = document.querySelector(".add-task-item") as HTMLElement;
const calenderContainer = document.querySelector(".calendar-container");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const lastWeek = document.querySelector(".last_week");
const nextWeek = document.querySelector(".next_week");
const homeButton = document.querySelector(".back_home");
const laswWeekdiv = document.querySelector(".last_week");
const nextWeekdiv = document.querySelector(".next_week");
let todoList = JSON.parse(localStorage.getItem("todo") ?? JSON.stringify([])); // 로컬스토리지에 있는 todo를 가져와서 파싱

for (let i = 0; i < 24; i++) {
  dayTimeList.push(`${String(i).padStart(2, "0")}:00`);
  dayTimeList.push(`${String(i).padStart(2, "0")}:30`);
}

// 오늘 날짜
const today = dayjs(new Date());
const todayDate = today.format("YYYY-MM-DD");
let selectedDate = localStorage.getItem("selectedDate") ?? todayDate;
// 요일 배열
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const renderLastAndNextWeek = () => {
  if (laswWeekdiv instanceof HTMLElement && nextWeekdiv instanceof HTMLElement) {
    laswWeekdiv.textContent = dayjs(selectedDate).subtract(7, "day").format("M월");
    nextWeekdiv.textContent = dayjs(selectedDate).add(7, "day").format("M월");
  }
};

const renderCalendar = () => {
  const temp = document.createElement("ul");
  const renderDayList: Array<string> = [];
  days.forEach((day, i) => {
    renderDayList.push(`<li data-date="${dayjs(selectedDate)
      .add(i - dayjs(selectedDate).day(), "day")
      .format("YYYY-MM-DD")}">
                        <button class="${day}">
                            <p class="date">${dayjs(selectedDate)
                              .add(i - dayjs(selectedDate).day(), "day")
                              .format("D")}</p>
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
        </div>
      `;
    timelineHtmlList.push(temp.innerHTML);
  });
  if (timeline) {
    timeline.appendChild(document.createRange().createContextualFragment(timelineHtmlList.join("")));
  }
};

const renderTodo = () => {
  const renderTodoList = todoList.filter((todo: Todo) => {
    return todo.startDay <= selectedDate && todo.endDay >= selectedDate;
  });
  renderTodoList.sort((a: Todo, b: Todo) => {
    const startTimeA = a.startTime?.replace(":", "");
    const startTimeB = b.startTime?.replace(":", "");
    if (startTimeA && startTimeB) {
      return parseInt(startTimeA) - parseInt(startTimeB);
    }
    return 0;
  });
  renderTodoList.forEach((todo: Todo) => {
    let minite = 0;
    let isZeroOrThirty = false;
    let time = todo.startTime ?? "00:00";
    if (todo.startTime) {
      minite = parseInt(todo.startTime.split(":")[1]);
    }
    if (minite === 0 || minite === 30) {
      isZeroOrThirty = true;
    }
    if (!isZeroOrThirty && minite < 30) {
      time = `${todo.startTime?.split(":")[0]}:00`;
    } else if (!isZeroOrThirty && minite > 30) {
      time = `${todo.startTime?.split(":")[0]}:30`;
    }
    const divTime = document.querySelector(`.timeline-row[data-time='${time}']`);
    if (divTime instanceof HTMLElement) {
      divTime.innerHTML += `<div class="time-contents">
        <div class="time-item ${isZeroOrThirty ? `top` : `middle`}" data-item-time="${todo.startTime}">
          <label for="check-${todo.id}" class="checkbox">
            <input type="checkbox" name="isCompleted" id="check-${todo.id}" ${todo.isCompleted ? "checked" : ""} />
            <div class="check"></div>
          </label>
          <p class="content">${todo.content} ${
        todo.allDay
          ? `${
              todo.startDay === todo.endDay ? "하루종일" : `${todo.startDay.split("-")[1]}월 ${todo.startDay.split("-")[2]}일 ~ ${todo.endDay.split("-")[1]}월 ${todo.endDay.split("-")[2]}일 하루종일`
            }`
          : `(${
              todo.startDay === todo.endDay
                ? `${`${todo.startTime} ~ ${todo.endTime}`}`
                : `${`${todo.startDay.split("-")[1]}월 ${todo.startDay.split("-")[2]}일 ${todo.startTime} ~ ${todo.endDay.split("-")[1]}월 ${todo.endDay.split("-")[2]}일 ${todo.endTime}`}`
            })`
      }</p>
      <button class="update" data-id="${todo.id}">
        <img class="pencil" src="/img/icon_pencil.svg" alt="수정">
      </button>
      <button class="delete" data-id="${todo.id}">
        <img class="trash_can" src="/img/icon_trash_can.svg" alt="삭제">
      </button>
        </div>`;
    }
    const checkbox = document.querySelector(`#check-${todo.id}`);
    if (checkbox instanceof HTMLInputElement) {
      checkbox.addEventListener("change", () => {
        todo.isCompleted = !todo.isCompleted;
        localStorage.setItem("todo", JSON.stringify(todoList));
      });
    }
  });
};

homeButton?.addEventListener("click", () => {
  location.href = "/";
});

addTaskButton?.addEventListener("click", () => {
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
  taskTitleInput.value = "";
  taskStartDate.value = today.format("YYYY-MM-DD");
  taskEndDate.value = today.format("YYYY-MM-DD");
  taskStartTime.disabled = false;
  taskEndTime.disabled = false;
  taskStartTime.value = "";
  taskEndTime.value = "";
  allDayCheck.checked = false;
  modal?.setAttribute("style", "display: block");
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
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
    taskTitleInput.value = "";
    taskStartDate.value = today.format("YYYY-MM-DD");
    taskEndDate.value = today.format("YYYY-MM-DD");
    taskStartTime.disabled = false;
    taskEndTime.disabled = false;
    taskStartTime.value = "";
    taskEndTime.value = "";
    allDayCheck.checked = false;
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
  if (document.querySelector(".edit-task")) {
    document.querySelector(".edit-task")?.remove();
  }

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
    allDay: allDayCheck.checked,
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
  taskStartDate.value = today.format("YYYY-MM-DD");
  taskEndDate.value = today.format("YYYY-MM-DD");
  taskStartTime.disabled = false;
  taskEndTime.disabled = false;
  taskStartTime.value = "";
  taskEndTime.value = "";
  allDayCheck.checked = false;

  modal?.setAttribute("style", "display: none");
  todoList = JSON.parse(localStorage.getItem("todo") ?? JSON.stringify([]));
  location.reload();
});

renderTimeLine();
renderCalendar();
renderTodo();
renderLastAndNextWeek();

const updateButtonList = document.querySelectorAll(".update");
const deleteButtonList = document.querySelectorAll(".delete");

calenderContainer?.querySelectorAll("ul li").forEach((li) => {
  li.addEventListener("click", () => {
    if (li instanceof HTMLElement) {
      selectedDate = li.dataset.date ?? todayDate;
      localStorage.setItem("selectedDate", selectedDate);
      location.reload();
    }
  });
});

// 이전 주, 다음 주 버튼
prevButton?.addEventListener("click", () => {
  selectedDate = dayjs(selectedDate).subtract(7, "day").format("YYYY-MM-DD");
  localStorage.setItem("selectedDate", selectedDate);
  location.reload();
});

nextButton?.addEventListener("click", () => {
  selectedDate = dayjs(selectedDate).add(7, "day").format("YYYY-MM-DD");
  localStorage.setItem("selectedDate", selectedDate);
  location.reload();
});

if (prevButton instanceof HTMLElement && lastWeek instanceof HTMLElement) {
  prevButton.addEventListener("mouseover", () => {
    lastWeek.style.display = "block";
  });

  prevButton.addEventListener("mouseout", () => {
    lastWeek.style.display = "none";
  });
}

if (nextButton instanceof HTMLElement && nextWeek instanceof HTMLElement) {
  nextButton.addEventListener("mouseover", () => {
    nextWeek.style.display = "block";
  });

  nextButton.addEventListener("mouseout", () => {
    nextWeek.style.display = "none";
  });
}

// 오늘 날짜 now 클래스에 입력
const nowButton = document.querySelector(".calendar-container ul li[data-date='" + today.format("YYYY-MM-DD") + "']");
if (nowButton instanceof HTMLElement) {
  nowButton.classList.add("now");
}

// 선택된 날짜 selected 클래스에 입력
const selectedButton = document.querySelector(".calendar-container ul li[data-date='" + selectedDate + "']");
if (selectedButton instanceof HTMLElement) {
  selectedButton.classList.add("selected");
}

updateButtonList.forEach((button) => {
  button.addEventListener("click", () => {
    const editButton = document.createElement("button");
    editButton.classList.add("edit-task");
    editButton.textContent = "수정";
    editButton.classList.add("add-task-item");
    if (document.querySelector(".edit-task")) {
      document.querySelector(".edit-task")?.remove();
    }
    modal?.querySelector(".modal_body")?.appendChild(editButton);
    modal?.setAttribute("style", "display: block");
    if (!(button instanceof HTMLElement)) {
      return;
    }
    const id = button.dataset.id;
    const editTodo = todoList.filter((todo: Todo) => {
      if (id === undefined || id === null) {
        return;
      } // 타입 가드
      todo.id === parseInt(id);
    });
    if (editTodo.length === 0) {
      return;
    }
    const editTodoItem = editTodo[0];
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
    taskTitleInput.value = editTodoItem.content;
    taskStartDate.value = editTodoItem.startDay;
    taskEndDate.value = editTodoItem.endDay;
    taskStartTime.value = editTodoItem.startTime ?? "";
    taskEndTime.value = editTodoItem.endTime ?? "";
    allDayCheck.checked = editTodoItem.allDay;
    if (editTodoItem.allDay) {
      taskStartTime.setAttribute("disabled", "true");
      taskEndTime.setAttribute("disabled", "true");
    }
    editButton.addEventListener("click", () => {
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
      const updateTodo = todoList.map((todo: Todo) => {
        if (id === undefined || id === null) {
          return;
        } // 타입 가드
        if (todo.id === parseInt(id)) {
          todo.content = taskTitleInput.value;
          todo.startDay = taskStartDate.value;
          todo.endDay = taskEndDate.value;
          todo.startTime = taskStartTime.value === "" ? null : taskStartTime.value;
          todo.endTime = taskEndTime.value === "" ? null : taskEndTime.value;
          todo.allDay = allDayCheck.checked;
        }
        return todo;
      });
      localStorage.setItem("todo", JSON.stringify(updateTodo));
      todoList = JSON.parse(localStorage.getItem("todo") ?? JSON.stringify([]));
      location.reload();
    });
  });
});

deleteButtonList.forEach((button) => {
  button.addEventListener("click", () => {
    if (!(button instanceof HTMLElement)) {
      return;
    } // 타입 가드
    const id = button.dataset.id;
    if (id === undefined || id === null) {
      return;
    } // 타입 가드
    const deleteTodo = todoList.filter((todo: Todo) => todo.id !== parseInt(id));
    localStorage.setItem("todo", JSON.stringify(deleteTodo));
    todoList = JSON.parse(localStorage.getItem("todo") ?? JSON.stringify([]));
    location.reload();
  });
});
