export class Todo {
  static id = 0;
  id: number;
  content: string;
  day: string;
  time: string;
  isCompleted: boolean;
  constructor(content: string, day: string, time: string) {
    this.id = ++Todo.id;
    this.content = content;
    this.day = day;
    this.time = time;
    this.isCompleted = false;
  }
  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }
  updateContent(content: string) {
    this.content = content;
  }
  updateDay(day: string) {
    this.day = day;
  }
  updateTime(time: string) {
    this.time = time;
  }
}
