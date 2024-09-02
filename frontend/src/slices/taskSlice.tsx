import { RootState } from "../store";
import taskService from "../services/taskService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ITask {
  title: string;
  _id?: any;
}

const initialState: {
  tasks: ITask[];
  task: ITask | null;
  error: string | null;
  success: boolean;
  loading: boolean;
  message: string | null;
} = {
  tasks: [],
  task: null,
  error: null,
  success: false,
  loading: false,
  message: null,
};

export const addTask = createAsyncThunk(
  "task/add",
  async (task: any, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const token = state.auth.user?.token;

    const data = await taskService.addTask(task, token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getUserTasks = createAsyncThunk(
  "user/tasks",
  async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const token = state.auth.user?.token;
    const data = await taskService.getUserTasks(token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id: any, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const token = state.auth.user?.token;
    const data = await taskService.deleteTask(id, token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async (taskData: any, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const token = state.auth.user?.token;
    const data = await taskService.updateTask(
      { title: taskData.title },
      taskData.id,
      token
    );
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.task = action.payload;
        if (state.task) {
          state.tasks.unshift(state.task);
        }
        state.message = "Tarefa adicionada com sucesso";
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string; // Ensure payload is a string or handle accordingly
      })
      .addCase(getUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserTasks.fulfilled,
        (state, action: PayloadAction<ITask[]>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.tasks = action.payload;
        }
      )
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTask.fulfilled,
        (state, action: PayloadAction<{ _id: string }>) => {
          state.error = null;
          state.loading = false;
          state.success = true;
          state.tasks = state.tasks.filter((task) => {
            return task._id !== action.payload._id;
          });
          state.message = "Tarefa deletada com sucesso";
        }
      )
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.task = null;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.tasks = state.tasks.map((task) => {
          if (task._id === action.payload.task._id) {
            return (task.title = action.payload.task.title);
          }
          return task;
        });
        state.message = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
