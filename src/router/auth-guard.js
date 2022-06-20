const isAuthenticatedGuard = async (to, from, next) => {
  return new Promise(() => {
    const auth = sessionStorage.auth_code;
    const currentUser = auth ? JSON.parse(atob(auth)) : null;
    if (currentUser.admi == true) {
      console.log("esta Autenticado");
      next();
    } else {
      console.log("Cerrando sesión");
      next({ name: "Login" });
    }
  });
};
export default isAuthenticatedGuard;
