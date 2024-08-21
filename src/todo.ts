import dayjs from "dayjs";
import "./main";
import "./styles/todo.scss";
const timeline = document.querySelector("#timeline");
const dayTimeList: Array<string> = [];
const timelineHtmlList: Array<string> = [];
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal_body");
const addTaskButton = document.querySelector(".add-task");
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

renderTimeLine();
