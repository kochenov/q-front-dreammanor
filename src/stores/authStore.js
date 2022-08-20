import { defineStore } from "pinia";
import { getError } from "../utils/helpers";
import AuthService from "../services/AuthService";

export const useAuth = defineStore({
  id: "authStore",
  state: () => ({
    user: null,
    error: null,
    loading: false,
  }),

  actions: {
    async login(payload) {
      try {
        await AuthService.login(payload);
        await this.getAuthUser();

        if (this.loggedIn) this.router.push({ path: "/dashboard" });
      } catch (error) {
        this.error = getError(error);
      }
    },
    async logout() {
      try {
        await AuthService.logout();
        this.user = null;
        this.router.push({ path: "/login" });
      } catch (error) {
        this.user = null;
        this.error = getError(error);
      }
    },
    // Получение текущего пользователя
    async getAuthUser() {
      try {
        // Устанавливаю флаг загрузки на активный
        this.loading = true;
        // Делаю запрос на сервер для получения данных пользователя
        const response = await AuthService.getAuthUser();
        // Помещаю данные пользователя полученные с сервера в стейт
        this.user = response.data.data;
        // Устанавливаю флаг загрузки на не активный
        this.loading = false;
        // Возвращаю полученные данные
        return response;
      } catch (error) {
        // обнуляю данные
        this.user = null;
        // флаг загрузки
        this.loading = false;
        // вывод ошибки
        this.error = getError(error);
        return error;
      }
    },
  },

  getters: {
    loggedIn: (state) => !!state.user,
    isAdmin: (state) => (state.user ? state.user.isAdmin : false),
  },
});
