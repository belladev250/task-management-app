import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  isLoading: false,
  isRegisterSuccess: false,
  isRegisterError: false,
  isGetTasksSuccess: false,
  isGetTasksError: false,
  isEditTaskSuccess: false,
  isEditTaskError: false,
  isDeleteTaskSuccess: false,
  isDeleteTaskError: false,
  message: "",
};

const errorMessageHandler = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

// Register Task
export const register = createAsyncThunk(
  "task/register",
  async (task, thunkAPI) => {
    try {
      return await taskService.register(task);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Tasks
export const getTasks = createAsyncThunk("task/getTasks", async (thunkAPI) => {
  try {
    return await taskService.getTasks();
  } catch (error) {
    const message = errorMessageHandler(error);
    return thunkAPI.rejectWithValue(message);
  }
});

// Edit Task
export const editTask = createAsyncThunk(
  "task/editTask",
  async (task, thunkAPI) => {
    try {
      return await taskService.editTask(task);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      return await taskService.deleteTask(taskId);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isRegisterSuccess = false;
      state.isRegisterError = false;
      state.isGetTasksSuccess = false;
      state.isGetTasksError = false;
      state.isEditTaskSuccess = false;
      state.isEditTaskError = false;
      state.isDeleteTaskSuccess = false;
      state.isDeleteTaskError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRegisterSuccess = true;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isRegisterError = true;
      state.message = action.payload;
    });

    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isGetTasksSuccess = true;
      state.tasks = [...action.payload];
    });

    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.isGetTasksError = true;
      state.message = action.payload;
    });

    builder.addCase(editTask.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isEditTaskSuccess = true;
      state.message = action.payload;
    });

    builder.addCase(editTask.rejected, (state, action) => {
      state.isLoading = false;
      state.isEditTaskError = true;
      state.message = action.payload;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDeleteTaskSuccess = true;
      state.message = action.payload;
    });

    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.isDeleteTaskError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
