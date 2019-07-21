import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/page-not-found';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/heroes',
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: () =>
        import(/* webpackChunkName: "heroes" */ './views/heroes/hero-list.vue'),
    },
    {
      path: '/villains',
      name: 'villains',
      component: () =>
        import(/* webpackChunkName: "villains" */ './views/villains/villain-list.vue'),
    },
    {
      path: '/heroes/:id',
      name: 'hero-detail',
      props: true,
      // props: route => ({ id: parseInt(route.params.id) }),
      component: () =>
        import(/* webpackChunkName: "heroes" */ './views/heroes/hero-detail.vue'),
    },
    {
      path: '/villains/:id',
      name: 'villain-detail',
      props: true,
      // props: route => ({ id: parseInt(route.params.id) }),
      component: () =>
        import(/* webpackChunkName: "villains" */ './views/villains/villain-detail.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/about.vue'),
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
