import type {
  LoginPayload,
  SignupPayload,
  SignupResponse,
  LoginResponse,
} from "~/features/auth/types/authTypes";
import type { User } from "~/types/user";

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { $api } = useNuxtApp();
    const config = useRuntimeConfig();

    const rootUrl = config.public.apiBase.replace(/\/api$/, "");

    await $api(`${rootUrl}/sanctum/csrf-cookie`);

    const xsrfToken = useCookie("XSRF-TOKEN").value;

    return await $api<LoginResponse>("/login", {
      method: "POST",
      body: payload,
      headers: {
        'X-XSRF-TOKEN': xsrfToken || '', 
      }
    });
  },

  async signup(payload: SignupPayload): Promise<SignupResponse> {
    const { $api } = useNuxtApp();

    return await $api<SignupResponse>("/signup", {
      method: "POST",
      body: payload,
    });
  },

  async fetchUser(): Promise<User> {
    const { $api } = useNuxtApp();
    return await $api<User>("/user");
  },
};
