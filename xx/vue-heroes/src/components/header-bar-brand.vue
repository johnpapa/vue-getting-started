<template>
  <div class="navbar-brand">
    <a
      class="navbar-item"
      href="https://vuejs.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab js-logo fa-vuejs fa-2x" aria-hidden="true" />
    </a>
    <router-link to="/" class="navbar-item nav-home">
      <span class="tour">TOUR</span> <span class="of">OF</span>
      <span class="heroes">HEROES</span>
    </router-link>
    <button
      class="link navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true" /> <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'HeaderBarBrand',
};
</script>

<style lang="scss"></style>
