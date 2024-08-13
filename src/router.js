import { createRouter, createWebHistory } from "vue-router";
import store from "./store/store";
import { IS_USER_AUTHENTICATE_GETTER } from "./store/storeconstants";

const Login = () => import("./pages/LoginPage.vue");
const Signup = () => import("./pages/SignupPage.vue");
const Home = () => import("./pages/HomePage.vue");
const Form = () => import("./pages/StudentForm.vue");

const routes = [
  { path: "/", component: Home, meta: { auth: false } },
  { path: "/login", component: Login, meta: { auth: false } },
  { path: "/signup", component: Signup, meta: { auth: false } },
  { path: "/form", component: Form, meta: { auth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`];
  console.log('Navigating to:', to.path);
  console.log('Is authenticated:', isAuthenticated);

  if (to.meta.auth && !isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    next("/login");
  } else if (!to.meta.auth && isAuthenticated) {
    console.log('Authenticated, redirecting to form');
    next("/form");
  } else {
    next();
  }
});


export default router;



