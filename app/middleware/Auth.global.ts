import { usePermissions } from "~/features/auth/composables/UsePermissions";


export default defineNuxtRouteMiddleware((to) => {
  const isLogged = useCookie("is_logged_in");
  const authUser = useCookie("auth_user");

  const publicRoutes = [
    "/login",
    "/register",
    "/esqueci-senha",
    "/esqueci-minha-senha",
  ];
  const isPublicRoute = publicRoutes.includes(to.path);

  if (isLogged.value) {
    if (isPublicRoute) return navigateTo("/dashboards");
  } else {
    if (!isPublicRoute) return navigateTo("/login");
  }

  const { hasPermission } = usePermissions();
  const requiredPerm = to.meta.requiresPermission as string;

  if (requiredPerm) {
    if (!authUser.value || !hasPermission(requiredPerm)) {
      console.warn('aqui')
      throw createError({
        statusCode: 403,
        statusMessage: "Acesso negado ou sessão incompleta",
      });
    }
  }
});
