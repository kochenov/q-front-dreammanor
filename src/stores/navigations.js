import { defineStore } from "pinia";

export const useNavigationsStore = defineStore("navigations", {
  state: () => ({
    breadscrumbs: [],
    curendDinamicPage: null,
  }),
  getters: {
    navBread: (state) =>
      state.curendDinamicPage
        ? [...state.breadscrumbs, ...state.curendDinamicPage]
        : state.breadscrumbs,
  },
  actions: {
    load(routes) {
      this.breadscrumbs = routes;
      this.curendDinamicPage = null;
    },
    addRoutes(arr) {
      this.curendDinamicPage = [{ ...arr }];
    },
  },
});
