// src/services/projectService.ts
import axios from 'axios';
import { Project } from '../../types';


const { VITE_PROJECTS_BASE_URL } = import.meta.env;


export const fetchProjects = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(VITE_PROJECTS_BASE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching projects');
  }
};

export const createProject = async (project: Project) => {
    const formData = new FormData();
    Object.entries(project).forEach(([key, value]) => {
      if (key !== 'background') {
        formData.append(key, String(value));
      }
    });
    if (project.background) {
      formData.append('background_image', project.background);
    }
  
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(VITE_PROJECTS_BASE_URL, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
        console.error('Error creating project:', error.response ? error.response.data : error);
        throw new Error('Error creating project');
    }
};

export const updateProject = async (id: number, formData: FormData) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put(`${VITE_PROJECTS_BASE_URL}${id}/`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error updating project:', error.response ? error.response.data : error);
        throw new Error('Error updating project');
    }
};


export const deleteProject = async (id: number) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.delete(`${VITE_PROJECTS_BASE_URL}${id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data; // Or return a success message/indicator as needed
    } catch (error: any) {
        console.error('Error deleting project:', error.response ? error.response.data : error);
        throw new Error('Error deleting project');
    }
};
