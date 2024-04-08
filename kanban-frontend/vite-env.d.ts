/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SIGNUP_ENDPOINT: string;
    readonly VITE_SIGNIN_ENDPOINT: string;
    readonly VITE_USER_DETAILS_ENDPOINT: string;
    readonly VITE_LOGOUT_ENDPOINT: string;
    readonly VITE_PASSWORD_RESET_ENDPOINT: string;
    readonly VITE_PASSWORD_RESET_CONFIRM_ENDPOINT: string;
    readonly VITE_PROJECTS_BASE_URL: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
