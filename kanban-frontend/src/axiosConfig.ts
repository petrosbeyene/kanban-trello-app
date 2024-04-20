// import axios from 'axios';

// const { VITE_REFRESH_TOKEN_ENDPOINT } = import.meta.env

// const axiosWithAuthRefresh = axios.create();

// axiosWithAuthRefresh.interceptors.response.use(response => response, async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//             const response = await axios.post(VITE_REFRESH_TOKEN_ENDPOINT);
//             const newAccessToken = response.data.access;
//             localStorage.setItem('accessToken', newAccessToken);
//             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             return axios(originalRequest);
//         } catch (refreshError) {
//             console.error('Unable to refresh token', refreshError);
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             return Promise.reject(refreshError);
//         }
//     }
//     return Promise.reject(error);
// });

// export default axiosWithAuthRefresh;