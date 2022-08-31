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
  // список всех овощей
  async list() {
    return await api.get("/api/v1/vegetables");
  },
  // Данные об овоще
  async one(id) {
    return await api.get("/api/v1/vegetables/" + id);
  },
  // Загрузить занные конкретного сорта
  async sortsList(id) {
    return await api.get("/api/v1/vegetable/sorts/" + id);
  },
};
