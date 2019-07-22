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
        import(/* webpackChunkName: "bundle.heroes" */ './views/heroes/heroes.vue'),
    },
    {
      path: '/heroes/:id',
      name: 'hero-detail',
      // props: true,
      props: r => ({ id: parseInt(r.params.id) }),
      component: () =>
        import(/* webpackChunkName: "bundle.heroes" */ './views/heroes/hero-detail.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "bundle.about" */ './views/about.vue'),
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
