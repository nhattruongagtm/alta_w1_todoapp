import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../models/Task";
import { deleteTaskFS, updateTaskFS} from "../api/firestore";
export interface TaskSlice {
  taskList: Task[];
  edit: Task;
}
const initialEdit:Task = {
  id: "",
  status: false,
  title: "",
}
const initialTask: TaskSlice = {
  taskList: [],
  edit: initialEdit,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialTask,
  reducers: {
    loadTaskByID: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
    },
    createTask: (state, action: PayloadAction<Task>) => {
      state.taskList.push(action.payload);
    },
    chooseItem: (state, action: PayloadAction<Task>) => {
      state.edit = action.payload;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      updateTaskFS(action.payload)
      const index = state.taskList.findIndex((item) => item.id === task.id);
      if (index > -1) {
        state.taskList.splice(index, 1, task);
      }
      state.edit = initialEdit;
    },
    deleteTask: (state, action:PayloadAction<string>) =>{
      state.edit = initialEdit;
      state.taskList = state.taskList.filter(item =>item.id !== action.payload);
      deleteTaskFS(action.payload);
    },
  },
});

export const { loadTaskByID, createTask, chooseItem, updateTask,deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
