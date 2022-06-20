import Vue from "vue";
import VueRouter from "vue-router";
import isAuthenticatedGuard from "./auth-guard.js";
Vue.use(VueRouter);
let title = "TractorApp";

const routes = [
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/",
    redirect: "/page_init",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
    meta: {
      title: `${title} - Login`,
    },
  },
  {
    path: "/page_init",
    name: "page_init",
    component: () => import("../components/page_init.vue"),
    meta: {
      title: `${title} - intro`,
    },
  },

  {
    path: "/inicio",
    component: () => import("../components/MenuPrincipal.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/Viajes",
        name: "Viajes",
        beforeEnter: isAuthenticatedGuard,
        component: () => import("../components/Viajes.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Viajes`,
        },
      },
      {
        path: "/Ingreso",
        name: "Ingreso",
        component: () => import("../components/Ingreso.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Registrar Gasto`,
        },
      },
      {
        path: "/Gastos",
        name: "Gastos",
        beforeEnter: isAuthenticatedGuard,
        component: () => import("../components/Gastos.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Gastos`,
        },
      },
      {
        path: "",
        name: "ListaViajes",
        component: () => import("../components/ListaViajes.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Viajes`,
        },
      },
      {
        path: "/panelUsuarios",
        name: "panelUsuarios",
        component: () => import("../components/Panel_Usuarios.vue"),
        meta: {
          requiresAuth: true,
          title: `${title} - Panel Usuarios`,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = sessionStorage.auth_code;

  document.title = to.meta.title;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth ? JSON.parse(atob(auth)) : null;

  if (requiresAuth && !currentUser) next("login");
  /*   else if (
    (currentUser && currentUser.init == "ADMI" && !requiresAuth) ||
    (currentUser &&
      currentUser.init == "ADMI" &&
      to.path.indexOf("admin") == -1)
  ) {
    next("admin"), console.log("PARE 1");
  } */ else if (!requiresAuth && currentUser && to.path !== "/inicio")
    next("inicio");
  else {
    next();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
});

export default router;
