// src/services/authService.js
import api from "./api";
import Cookies from "js-cookie";

export const authService = {
  register: async (userData) => {
    const response = await api.post("/user/signup", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/user/signin", credentials);
    const { token, user } = response.data;
    
    // Store token in both cookie and localStorage
    if (token) {
      Cookies.set("token", token, {
        expires: 7, // 7 days
        path: "/",
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      });
      localStorage.setItem("auth_token", token);
    }
    
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/user/signout");
    // Clear both cookie and localStorage
    Cookies.remove("token", { path: "/" });
    localStorage.removeItem("auth_token");
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  updateProfile: async (formData) => {
    const response = await api.patch("/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.patch("/user/change-password", passwordData);
    return response.data;
  },
};
