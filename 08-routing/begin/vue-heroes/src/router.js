import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/page-not-found';

Vue.use(Router);

const parseId = route => ({ id: parseInt(route.params.id) });
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
        import(/* webpackChunkName: "bundle.heroes" */ './views/heroes/hero-list.vue'),
    },
    {
      path: '/villains',
      name: 'villains',
      component: () =>
        import(/* webpackChunkName: "bundle.villains" */ './views/villains/villain-list.vue'),
    },
    {
      path: '/heroes/:id',
      name: 'hero-detail',
      // props: true,
      props: parseId,
      component: () =>
        import(/* webpackChunkName: "bundle.heroes" */ './views/heroes/hero-detail.vue'),
    },
    {
      path: '/villains/:id',
      name: 'villain-detail',
      // props: true,
      props: parseId,
      component: () =>
        import(/* webpackChunkName: "bundle.villains" */ './views/villains/villain-detail.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "bundle.about" */ './views/about.vue'),
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
