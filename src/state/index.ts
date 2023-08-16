import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskStatusType = "todo" | "in-progress" | "done";
export interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  status: TaskStatusType;
}
export interface stateType {
  mode: "light" | "dark";
  tasks: Task[];
}

const initialState: stateType = {
  mode: "light",
  tasks: [],
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index] = action.payload;
    },
  },
});

export const { toggleTheme, addTask, deleteTask, updateTask } =
  themeSlice.actions;
export default themeSlice.reducer;
