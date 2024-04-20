export interface SignupFormValues {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password1: string;
    password2: string;
}

export interface SigninResponse {
    access: string;
    refresh: string;
  }
  

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface userUpdateFormValues {
    first_name: string;
    last_name: string;
}


export interface Project {
    id?: number;
    title: string;
    description: string;
    background_color?: string;
    background_image?: string;
    background: File | null;
}