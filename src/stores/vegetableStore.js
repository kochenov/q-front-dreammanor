import { defineStore } from "pinia";
import { getError } from "../utils/helpers";
import VegetableService from "../services/VegetableService";

export const useVegetable = defineStore({
  id: "vegetableStore",
  state: () => ({
    vegetables: null,
    currentVegetable: null,
    error: null,
    loading: false,
  }),

  actions: {
    async list() {
      this.loading = true;
      try {
        this.error = null;
        const response = await VegetableService.list();
        this.vegetables = response.data.data;
      } catch (error) {
        this.error = getError(error);
      }
      this.loading = false;
    },

    async one(id) {
      this.loading = true;
      try {
        this.error = null;
        const response = await VegetableService.one(id);
        this.currentVegetable = response.data.data;
      } catch (error) {
        this.error = getError(error);
      }
      this.loading = false;
    },
  },

  getters: {
    loggedIn: (state) => !!state.user,
    isAdmin: (state) => (state.user ? state.user.isAdmin : false),
  },
});
