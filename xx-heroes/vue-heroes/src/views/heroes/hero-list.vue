<template>
  <div>
    <transition-group tag="ul" name="list-complete" class="list" mode="out-in">
      <li
        v-for="(hero, index) in heroes"
        :key="hero.id"
        role="presentation"
        class="list-complete-item"
      >
        <div class="card">
          <CardContent :name="hero.name" :description="hero.description"/>
          <footer class="card-footer">
            <ButtonFooter
              class="delete-item"
              iconClasses="fas fa-trash"
              label="Delete"
              :dataId="hero.id"
              :dataIndex="index"
              :item="hero"
              @clicked="deleteHero"
            />
            <ButtonFooter
              class="edit-item"
              iconClasses="fas fa-edit"
              label="Edit"
              :dataId="hero.id"
              :dataIndex="index"
              :item="hero"
              @clicked="selectHero"
            />
          </footer>
        </div>
      </li>
    </transition-group>
    <input type="text" v-model="foo">
    <button @click="swap()">swap out</button>
  </div>
</template>

<script>
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';
import { mapActions } from 'vuex';

const captains = console;

export default {
  name: 'HeroList',
  data() {
    return {
      foo: 'foo',
    };
  },
  props: {
    heroes: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CardContent,
    ButtonFooter,
  },
  methods: {
    deleteHero(hero) {
      this.$emit('deleted', hero);
      captains.log(`You tried to delete ${hero.name}`);
    },
    selectHero(hero) {
      captains.log(`You tried to select ${hero.name}`);
      this.$emit('selected', hero);
    },
    ...mapActions('heroes', ['updateHeroAction']),
    swap() {
      const [hero] = this.heroes;
      const updatedhero = { ...hero, name: 'Aslaug ' + this.foo };
      this.updateHeroAction(updatedhero);
      // this.heroes.splice(0, 1, updatedhero);
    },
  },
};
</script>

<style lang="scss">
/**
* To apply these animations:
* 1. Uncomment the styles
* 2. Convert the <ul> into a <transition-group tag="ul" name="list-complete" class="list" mode="out-in">
* 3. Add class="list-complete-item" to the <li>
**/
.list-complete-item {
  transition: all 700ms;
  // display: inline-block;
  margin-top: 10px !important;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
// .list-complete-leave-active {
//   position: absolute;
// }

.list-item {
  // display: block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 700ms;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
