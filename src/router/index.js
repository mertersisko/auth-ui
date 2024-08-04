import { createRouter, createWebHistory } from "vue-router";
//import MainLayout from "../components/layouts/vList/MainLayout";
import MainLayout from "../components/layouts/dxTree/MainLayout";
//import useUserStore from "@/stores/user_store";
//const userStore = useUserStore();
//import Login from "../views/auth/Login.vue";

//Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: MainLayout,
    children: [
      {
        path: "/home",
        name: "homepage",
        component: () => import("../views/HomePage.vue"),
      },
      {
        path: "/customer",
        name: "customer",
        component: () => import("../views/customer/CustomerList.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/user/UserList.vue"),
      },
      {
        path: "/pagelist",
        name: "pagelist",
        component: () => import("../views/user_roles/pages/PageList.vue"),
      },
      {
        path: "/role-template",
        name: "roletemplate",
        component: () => import("../views/user_roles/role_template/RoleTemplate.vue"),
      },
      {
        path: "/department",
        name: "department",
        component: () => import("../views/department/DepartmentList.vue"),
      },
      {
        path: "/title",
        name: "title",
        component: () => import("../views/title/TitleList.vue"),
      },
    ],
  },

  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/auth/LoginPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/LoginPage.vue"),
  },

  //   {
  //     path: "/forgotpassword",
  //     name: "forgotpassword",
  //     component: () => import("../views/auth/ForgotPwd.vue"),
  //   },
  //   {
  //     path: "/changepasswordbykey",
  //     name: "changepasswordbykey",
  //     component: () => import("../views/auth/ChangePwdByKey.vue"),
  //   },
  //   {
  //     path: "/login",
  //     name: "login",
  //     component: Login,
  //   },
  //   {
  //     path: "/logout",
  //     name: "logout",
  //     component: Login,
  //   },

  //    { path: '/:pathMatch(.*)*',
  //      component: () => import("../views/auth/PageNotFound.vue" )
  //    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// const router = new VueRouter({
//   mode: "hash",
//   base: process.env.BASE_URL,
//   routes,
// });

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/changepasswordbykey", "/forgotpassword"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("key");


//  if(to.name == "department")
//  {
//     userStore.fillUserLookup();
//  }

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
