// src/services/projectService.ts
import axios from 'axios';
import { Project } from '../../types';

const API_BASE_URL = 'http://localhost:8000/api/projects/'; // Adjust this URL based on your actual API's URL


export const fetchProjects = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching projects');
  }
};

// export const fetchProjectById = async (id: number) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching project');
//   }
// };

// In projectService.js or projectService.ts

export const createProject = async (project: Project) => {
    const formData = new FormData();
    Object.entries(project).forEach(([key, value]) => {
      if (key !== 'background_image') {
        formData.append(key, String(value));
      }
    });
    if (project.background_image) {
      formData.append('background_image', project.background_image);
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          Authorization: `Token ${token}`,
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
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_BASE_URL}${id}/`, formData, {
            headers: {
                Authorization: `Token ${token}`,
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
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_BASE_URL}${id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data; // Or return a success message/indicator as needed
    } catch (error: any) {
        console.error('Error deleting project:', error.response ? error.response.data : error);
        throw new Error('Error deleting project');
    }
};
