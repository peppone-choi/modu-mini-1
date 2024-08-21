import { CreateTodoType } from "../@types/todo.type";

export class Todo {
  static id = 0;
  id: number; // 할 일 고유번호
  content: string; // 할 일 내용
  startDay: string; // 할 일 시작 날짜
  endDay: string; // 할 일 종료 날짜
  startTime: string; // 할 일 시작 시간
  endTime: string; // 할 일 종료 시간
  isCompleted: boolean; // 완료 여부
  constructor(create: CreateTodoType) {
    this.id = ++Todo.id;
    this.content = create.content;
    this.startDay = create.startDay;
    this.endDay = create.endDay;
    this.startTime = create.startTime;
    this.endTime = create.endTime;
    this.isCompleted = false;
  } // 생성자
  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  } // 완료여부 토글
  updateContent(content: string) {
    this.content = content;
  } // 내용 수정
  updateStartDay(startDay: string) {
    this.startDay = startDay;
  } // 시작 날짜 수정
  updateEndDay(endDay: string) {
    this.endDay = endDay;
  } // 종료 날짜 수정
  updateStartTime(startTime: string) {
    this.startTime = startTime;
  } // 시작 시간 수정
  updateEndTime(endTime: string) {
    this.endTime = endTime;
  } // 종료 시간 수정
}
