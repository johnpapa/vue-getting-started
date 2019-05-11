<template>
  <div id="app">
    <HeaderBar />
    <div class="section columns">
      <main class="column">
        <div class="content-container">
          <div class="content-title-group">
            <h2 class="title">Heroes</h2>
            <br />We'll start here
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    HeaderBar,
  },
};
</script>

<style lang="scss">
#app {
  margin: 0;
}
</style>
