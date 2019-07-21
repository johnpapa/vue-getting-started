import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/page-not-found';

Vue.use(Router);
console.log('process.env.BASE_URL');
console.log(process.env.BASE_URL);
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
      path: '/villains/:id',
      name: 'villain-detail',
      props: route => ({ id: parseInt(route.params.id) }),
      component: () =>
        import(/* webpackChunkName: "villains" */ './views/villains/villain-detail.vue'),
      // children: [
      //   {
      //     path: 'view',
      //     name: 'villain-ro',
      //     component: VillainB,
      //   },
      //   {
      //     path: 'detail',
      //     name: 'villain-edit',
      //     // props: route => ({ id: parseInt(route.params.id) }),
      //     component: VillainEdit,
      //   },
      // ],
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
