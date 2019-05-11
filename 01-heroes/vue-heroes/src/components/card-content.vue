<template>
  <div class="card-content">
    <div class="content">
      <transition name="fade" mode="out-in">
        <div :key="name" class="name">{{ name }}</div>
      </transition>
      <div class="description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContent',
  props: {
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="scss">
.fade-enter-active {
  transition: all 1.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
