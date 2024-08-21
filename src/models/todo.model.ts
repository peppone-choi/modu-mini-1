export class Todo {
  static id = 0;
  id: number; // 할 일 고유번호
  content: string; // 할 일 내용
  day: string; // 할 일 날짜
  time: string; // 할 일 시간
  isCompleted: boolean; // 완료 여부
  constructor(content: string, day: string, time: string) {
    this.id = ++Todo.id;
    this.content = content;
    this.day = day;
    this.time = time;
    this.isCompleted = false;
  } // 생성자
  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  } // 완료여부 토글
  updateContent(content: string) {
    this.content = content;
  } // 내용 수정
  updateDay(day: string) {
    this.day = day;
  } // 날짜 수정
  updateTime(time: string) {
    this.time = time;
  } // 시간 수정
}
