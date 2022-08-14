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
    path: "/calculate",
    name: "calculate",
    meta: { title: "Расчёты" },
    redirect: "/calculate/seeding",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "seeding",
        name: "seeding",
        meta: { title: "Расчёты посева" },
        component: () => import("pages/SeedingPage.vue"),
        children: [
          {
            path: "test",
            name: "seeding-test",
            meta: { title: "Расчёты посева test" },
            component: () => import("pages/SeedingPage.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
