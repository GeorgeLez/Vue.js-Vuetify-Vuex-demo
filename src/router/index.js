import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard";
import Projects from "../views/Projects";
import Team from "../views/Team";
import Login from "../views/Login";
import Register from "../views/Register";
import InvalidRoute from "../components/InvalidRoute";
import { auth } from "@/fb";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    alias: "/dashboard",
    meta: { requiresAuth: true },
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: { requiresAuth: true },
  },
  {
    path: "/team",
    name: "Team",
    component: Team,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresTest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresTest: true },
  },
  {
    path: "/404",
    name: "Error",
    component: InvalidRoute,
    // meta: { requiresTest: false, requiresAuth: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log("asta e to:", to);
  // console.log("asta e from:", from);

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresTest = to.matched.some((record) => record.meta.requiresTest);
  const isAuthenticated = auth.currentUser;

  if (to.name) {
    if (requiresAuth) {
      // console.log("requiresAuth");
      if (isAuthenticated) {
        // console.log("isAuthenticated");
        next();
      } else {
        next("/login");
      }
    } else {
      if (requiresTest) {
        // console.log("requiresTest");
        if (
          (to.name == "Login" && isAuthenticated) ||
          (to.name == "Register" && isAuthenticated)
        ) {
          // console.log("Works");
          next("/dashboard");
        } else {
          // console.log("else");
          next();
        }
      } else {
        // console.log("final final final");
        next();
      }
    }
    // if (to.name === "Error") {
    //   console.log("this is the end");
    //   next("/404");
    // }
  } else {
    // console.log("404");
    next("/404");
  }

  // v05and currently using
  // if (to.name) {
  //   if (requiresAuth) {
  //     console.log("requiresAuth");
  //     if (isAuthenticated) {
  //       console.log("isAuthenticated");
  //       next();
  //     } else {
  //       next("/login");
  //     }
  //   } else {
  //     if (requiresTest) {
  //       console.log("requiresTest");
  //       if (
  //         (to.name == "Login" && isAuthenticated) ||
  //         (to.name == "Register" && isAuthenticated)
  //       ) {
  //         console.log("Works");
  //         next("/dashboard");
  //       } else {
  //         console.log("else");
  //         next();
  //       }
  //     } else {
  //       console.log("final final final");
  //       next();
  //     }
  //   }
  //   // if (to.name === "Error") {
  //   //   console.log("this is the end");
  //   //   next("/404");
  //   // }
  // } else {
  //   console.log("404");
  //   next("/404");
  // }

  // v04
  // if (to.name) {
  //   if (requiresAuth) {
  //     console.log("requiresAuth");
  //     if (isAuthenticated) {
  //       console.log("isAuthenticated");
  //       next();
  //     } else {
  //       next("/login");
  //     }
  //   } else {
  //     if (requiresTest) {
  //       console.log("requiresTest");
  //       if (to.name == "Login" && isAuthenticated) {
  //         console.log("Works");
  //         next("/dashboard");
  //       } else {
  //         console.log("else");
  //         next();
  //       }
  //     }
  //   }
  // } else {
  //   next("/404");
  // }

  // v03
  // if (to.name) {
  //   if (requiresAuth) {
  //     if (isAuthenticated) {
  //       next();
  //     } else {
  //       next("/login");
  //     }
  //   } else {
  //     next();
  //   }
  // } else {
  //   next("/404");
  // }

  // v02 worked before but invalid links would redirect to empty pages with navbar
  // if (requiresAuth) {
  //   if (isAuthenticated) {
  //     next();
  //   } else {
  //     next("/login");
  //   }
  // } else {
  //   next();
  // }

  //  v01 base version
  // if (requiresAuth && !isAuthenticated) {
  //   next("/login");
  // } else {
  //   next();
  // }
});

export default router;
