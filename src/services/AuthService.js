import { api } from "boot/axios";

/*
 * Добавьте перехватчик ответов
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 419].includes(error.response.status)) {
      console.info(
        "[401, 419]: Пользователь не авторизован, не удалось войти в систему с помощью API"
      );
    }
    return Promise.reject(error);
  }
);

export default {
  async login(payload) {
    await api.get("/sanctum/csrf-cookie");
    console.log("Запрос");
    return api.post("/login", payload);
  },
  logout() {
    return api.post("/logout");
  },
  async forgotPassword(payload) {
    await api.get("/sanctum/csrf-cookie");
    return api.post("/forgot-password", payload);
  },
  // Получает текущего пользователя
  getAuthUser() {
    return api.get("/api/user");
  },
  async resetPassword(payload) {
    await api.get("/sanctum/csrf-cookie");
    return api.post("/reset-password", payload);
  },
  async registerUser(payload) {
    await api.get("/sanctum/csrf-cookie");
    return api.post("/register", payload);
  },
  sendVerification(payload) {
    return api.post("/email/verification-notification", payload);
  },
};
