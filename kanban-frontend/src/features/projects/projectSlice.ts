// src/features/projects/projectSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import * as projectService from './projectService';
import { Project } from '../../types';

// Existing fetchProjects async thunk
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await projectService.fetchProjects();
    return response;
  }
);

// In your projectSlice.js or projectSlice.ts
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (project: Project, { rejectWithValue }) => {
    try {
      const response = await projectService.createProject(project);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, formData }: { id: number; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await projectService.updateProject(id, formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);


// New async thunk for deleting a project
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id: number, { rejectWithValue }) => {
    try {
      await projectService.deleteProject(id);
      return id; // Return the id to identify which project was deleted
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


interface ProjectsState {
  projects: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  creationStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Separate status for creation
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
  creationStatus: 'idle',
  error: null,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createProject.pending, (state) => {
        state.creationStatus = 'loading';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.creationStatus = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state) => {
        state.creationStatus = 'failed';
      })
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectProjects = (state: RootState): Project[] => state.projects.projects;
export const selectProjectsStatus = (state: RootState) => state.projects.status;
export const selectCreationStatus = (state: RootState) => state.projects.creationStatus; // New selector for creation status

export default projectSlice.reducer;
