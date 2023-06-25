export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to, from);
  if (from && to.path !== from.path) {
    let redirectTo = null;
    if (to.query.redirect_to) {
      redirectTo = to.fullPath.replace('/login?redirect_to=', '');
    } else {
      redirectTo = from.fullPath;
    }

    const redirectToCookie = useCookie('redirectTo', { maxAge: 60 * 60 });
    redirectToCookie.value = redirectTo as string;
  }
});
