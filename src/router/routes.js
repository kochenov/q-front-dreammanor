const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        meta: { title: "Главная" },
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/profile",
    name: "profile",
    meta: { title: "Профиль" },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "myProfile",
        meta: { title: "Личные данные" },
        component: () => import("pages/user/ProfilePage.vue"),
      },
    ],
  },
  {
    path: "/calculate",
    name: "calculate",
    meta: { title: "Расчёты" },
    redirect: "/calculate/seeding",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "seeding/:id?",
        name: "seeding",
        meta: { title: "Расчёты посева" },
        component: () => import("pages/SeedingPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: "notFound",
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
