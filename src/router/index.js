import { createRouter, createWebHistory } from "vue-router";
import AddressListView from "../views/AddressListView.vue";
import AddressAddView from "../views/AddressAddView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "addressAdd",
      component: AddressAddView,
    },
    {
      path: "/list",
      name: "addressList",
      component: AddressListView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;
