<template>
  <div id="app">
    <HeaderBar />
    <div class="section columns">
      <NavBar />
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar.vue';
import NavBar from '@/components/nav-bar.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    HeaderBar,
    NavBar,
  },
};
</script>

<style lang="scss"></style>
