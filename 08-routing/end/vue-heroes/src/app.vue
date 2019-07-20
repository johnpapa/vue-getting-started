<template>
  <div id="app">
    <HeaderBar />
    <div class="main-section columns">
      <NavBar />
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar';
import NavBar from '@/components/nav-bar';

export default {
  name: 'App',
  components: { HeaderBar, NavBar },
};
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
