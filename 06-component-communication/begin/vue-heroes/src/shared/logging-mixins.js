// import { format } from 'date-fns';

// const displayTimeFormat = 'HH:mm:ss.SSS';

// const hookMessageSuffix = 'hook called (from mixin)';

// export const lifecycleHooks = {
//   computed: {
//     componentName() {
//       return `${this.$options.name} component`;
//     },
//   },
//   created() {
//     this.log(`${this.componentName} created ${hookMessageSuffix}`);
//     this.log('component data', this.$data);
//   },
//   mounted() {
//     this.log(`${this.componentName} mounted ${hookMessageSuffix}`);
//   },
//   updated() {
//     this.log(`${this.componentName} updated ${hookMessageSuffix}`);
//   },
//   destroyed() {
//     this.log(`${this.componentName} destroyed ${hookMessageSuffix}`);
//   },
//   methods: {
//     log(message, data) {
//       console.log(`Log ${format(Date.now(), displayTimeFormat)}: ${message}`);
//       if (data) {
//         console.log(JSON.stringify(data, null, 2));
//       }
//     },
//   },
// };

// export const heroWatchers = {
//   watch: {
//     selectedHero: {
//       immediate: true,
//       deep: true,
//       handler(newValue, oldValue) {
//         this.log('old values', oldValue);
//         this.log('new values', newValue);
//       },
//     },
//   },
// };
