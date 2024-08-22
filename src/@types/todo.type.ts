export type CreateTodoType = {
  id: number;
  content: string;
  startDay: string;
  endDay: string;
  startTime: string | null;
  endTime: string | null;
  allDay: boolean;
};
