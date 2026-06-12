import axios from "axios";

const API = axios.create({ baseURL: "https://store-backend-1-pws2.onrender.com/api" });
// Attach JWT token from localStorage to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("stylehub_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginAPI = (data) => API.post("/auth/login", data);
export const registerAPI = (data) => API.post("/auth/register", data);
export const getMeAPI = () => API.get("/auth/me");

// Products
export const getProductsAPI = (params) => API.get("/products", { params });
export const getProductByIdAPI = (id) => API.get(`/products/${id}`);
export const createProductAPI = (data) => API.post("/products", data);
export const updateProductAPI = (id, data) => API.put(`/products/${id}`, data);
export const deleteProductAPI = (id) => API.delete(`/products/${id}`);

// Orders
export const placeOrderAPI = (data) => API.post("/orders", data);
export const getMyOrdersAPI = () => API.get("/orders/mine");
export const getAllOrdersAPI = () => API.get("/orders");
export const updateOrderStatusAPI = (id, status) => API.put(`/orders/${id}/status`, { status });

// Users (admin)
export const getAllCustomersAPI = () => API.get("/users");
export const updateCustomerDiscountAPI = (id, data) => API.put(`/users/${id}/discount`, data);
export const deleteCustomerAPI = (id) => API.delete(`/users/${id}`);
export const getAdminStatsAPI = () => API.get("/users/stats/admin");

// Profile (customer)
export const updateProfileAPI = (data) => API.put("/users/profile/me", data);

export default API;
