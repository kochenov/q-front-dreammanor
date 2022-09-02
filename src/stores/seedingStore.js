import { defineStore } from "pinia";
import { getError } from "../utils/helpers";
import { vegetable, seeding } from "../services/SeedingService";

export const useSeeding = defineStore({
  id: "seedingStore",
  state: () => ({
    vegetables: null,
    currentVegetable: null,
    error: null,
    loading: false,
  }),

  actions: {
    async listVegetable() {
      this.loading = true;
      try {
        this.error = null;
        const response = await vegetable.list();
        this.vegetables = response.data.data;
      } catch (error) {
        this.error = getError(error);
      }
      this.loading = false;
    },

    async oneVegetable(id) {
      this.loading = true;
      try {
        this.error = null;
        const response = await vegetable.one(id);
        this.currentVegetable = response.data.data;
      } catch (error) {
        this.error = getError(error);
      }
      this.loading = false;
    },

    async createSeeding(data) {
      this.loading = true;
      try {
        this.error = null;
        const response = await seeding.create(data);
        this.currentVegetable = response.data.data;
      } catch (error) {
        this.error = getError(error);
      }
      this.loading = false;
    },

    async seedingList() {
      this.loading = true;
      try {
        this.error = null;
        const response = await seeding.list();
        this.currentVegetable = response.data.data;
      } catch (error) {
        this.error = getError(error);
      }
      this.loading = false;
    },
  },

  getters: {
    // loggedIn: (state) => !!state.user,
    // isAdmin: (state) => (state.user ? state.user.isAdmin : false),
  },
});
