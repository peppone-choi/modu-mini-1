import dayjs from "dayjs";
import "./main";
import "./styles/todo.scss";
const timeline = document.querySelector("#timeline");
const dayTimeList: Array<string> = [];
const timelineHtmlList: Array<string> = [];
for (let i = 0; i < 24; i++) {
  dayTimeList.push(`${String(i).padStart(2, "0")}:00`);
  dayTimeList.push(`${String(i).padStart(2, "0")}:30`);
}

const renderTimeLine = () => {
  dayTimeList.forEach((time) => {
    timelineHtmlList.push(`
          <div class="timeline-row" data-time="${time}">
            <span class="time">${time}</span>
            <div class="time-contents"></div>
        </div>`);
  });
  if (timeline) {
    timeline.innerHTML = timelineHtmlList.join("");
  }
};

renderTimeLine();
