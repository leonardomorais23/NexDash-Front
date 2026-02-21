import { defineStore } from "pinia";
import { authService } from "~/services/auth/authService";
import type { LoginPayload } from "~/types/authTypes";
import type { User } from "~/types/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    async login(payload: LoginPayload) {
      const data = await authService.login(payload);
      this.user = data.user;
    },

    async logout() {
      const { $api } = useNuxtApp();
      await $api("/logout", { method: "POST" });
      this.user = null;
    },
    async fetchUser() {
      try {
        const user = await authService.fetchUser();
        this.user = user;
      } catch {
        this.user = null;
      }
    },
  },
});
