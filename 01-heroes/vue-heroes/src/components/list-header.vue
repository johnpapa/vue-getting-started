<template>
  <div class="content-title-group">
    <router-link :to="routePath">
      <h2 class="title">{{ title }}</h2>
    </router-link>
    <button class="button add-button" @click="handleAdd" aria-label="add">
      <i class="fas fa-plus" aria-hidden="true"></i>
    </button>
    <button
      class="button refresh-button"
      @click="handleRefresh"
      aria-label="refresh"
    >
      <i class="fas fa-sync" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ListHeader',
  props: {
    title: {
      type: String,
      default: () => '',
    },
    routePath: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    handleAdd() {
      this.$emit('add');
    },
    handleRefresh() {
      this.$emit('refresh');
    },
  },
};
</script>

<style lang="scss"></style>
