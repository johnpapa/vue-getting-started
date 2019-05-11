<template>
  <button
    class="link card-footer-item"
    :class="className"
    :aria-label="label"
    tabIndex="0"
    @click="handleClick"
    :data-index="dataIndex"
    :data-id="dataId"
  >
    <i :class="iconClasses"></i> <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonFooter',
  props: {
    item: {
      type: Object,
      default() {},
    },
    className: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
    dataIndex: {
      type: Number,
      default: () => null,
    },
    dataId: {
      type: String,
      default: () => '',
    },
    iconClasses: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    handleClick() {
      this.$emit('clicked', this.item);
    },
  },
};
</script>

<style lang="scss"></style>
