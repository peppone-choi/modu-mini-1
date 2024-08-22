import { CreateTodoType } from "../@types/todo.type";

export class Todo {
  id: number; // 할 일 고유번호
  content: string; // 할 일 내용
  startDay: string; // 할 일 시작 날짜
  endDay: string; // 할 일 종료 날짜
  startTime: string | null; // 할 일 시작 시간
  endTime: string | null; // 할 일 종료 시간
  isCompleted: boolean; // 완료 여부
  allDay: boolean; // 종일 여부
  constructor(create: CreateTodoType) {
    this.id = create.id;
    this.content = create.content;
    this.startDay = create.startDay;
    this.endDay = create.endDay;
    this.startTime = create.startTime;
    this.endTime = create.endTime;
    this.isCompleted = false;
    this.allDay = create.allDay;
  } // 생성자

  update(update: Partial<Todo>) {
    Object.assign(this, update);
  } // 할 일 업데이트 함수
}
