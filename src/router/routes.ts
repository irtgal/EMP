import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('../pages/HomePage.vue') },
      { path: 'search', name: 'SearchMovie', component: () => import('../pages/SearchPage.vue') },
      { path: 'movie/:id', name: 'MovieDetails', component: () => import('../pages/MovieDetailsPage.vue'), props: true },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
];

export default routes;