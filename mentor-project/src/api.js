import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add the access token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 (Unauthorized) and we haven't already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    // No refresh token available, force logout
                    throw new Error("No refresh token available");
                }

                // Call the refresh-token endpoint
                const res = await axios.post("http://127.0.0.1:3000/refresh-token", {
                    refreshToken,
                });

                if (res.status === 200) {
                    // Save new access token
                    const newAccessToken = res.data.token;
                    localStorage.setItem("accessToken", newAccessToken);

                    // Update the authorization header for the original request
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // Retry the original request
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails (e.g., refresh token expired), clear storage and redirect
                console.error("Session expired, please log in again.");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("role");
                
                // Typically you might use a more robust navigation approach,
                // but window.location is a safe fallback outside of React components.
                window.location.href = "/login";
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
