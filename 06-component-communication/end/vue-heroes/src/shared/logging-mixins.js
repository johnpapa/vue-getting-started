import { logger } from './';

const hookMessageSuffix = 'hook called (from mixin)';

export const lifecycleHooks = {
  // Computeds
  computed: {
    componentName() {
      return `${this.$options.name} component`;
    },
  },
  // LifeCycle Hooks
  created() {
    logger.info(`${this.componentName} created ${hookMessageSuffix}`);
    logger.info('component data', this.$data);
  },
  mounted() {
    logger.info(`${this.componentName} mounted ${hookMessageSuffix}`);
  },
  updated() {
    logger.info(`${this.componentName} updated ${hookMessageSuffix}`);
  },
  destroyed() {
    logger.info(`${this.componentName} destroyed ${hookMessageSuffix}`);
  },
};

export const heroWatchers = {
  // Watchers
  watch: {
    selectedHero: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        logger.info('old values', oldValue);
        logger.info('new values', newValue);
      },
    },
  },
};
