<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-8" v-if="heroes">
        <ul v-if="!selectedHero">
          <li v-for="hero in heroes" :key="hero.id">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <div :key="hero.name" class="name">
                    {{ hero.firstName }} {{ hero.lastName }}
                  </div>
                  <div class="description">{{ hero.description }}</div>
                </div>
              </div>
              <footer class="card-footer">
                <button
                  class="link card-footer-item save-button"
                  @click="selectHero(hero)"
                >
                  <i class="fas fa-check"></i>
                  <span>Select</span>
                </button>
              </footer>
            </div>
          </li>
        </ul>
        <HeroDetail
          :hero="selectedHero"
          @save="saveHero"
          @cancel="cancelHero"
          v-if="selectedHero"
        />
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

import { inputDateFormat, lifecycleHooks, selectedItem } from '../shared';
import HeroDetail from '@/components/hero-detail';

const ourHeroes = [
  {
    id: 10,
    firstName: 'Ella',
    lastName: 'Papa',
    capeCounter: 1,
    originDate: format(new Date(1996, 5, 1), inputDateFormat),
    description: 'fashionista',
  },
  {
    id: 20,
    firstName: 'Madelyn',
    lastName: 'Papa',
    capeCounter: 3,
    originDate: format(new Date(1998, 7, 1), inputDateFormat),
    description: 'the cat whisperer',
  },
  {
    id: 30,
    firstName: 'Haley',
    lastName: 'Papa',
    capeCounter: 2,
    originDate: format(new Date(1999, 8, 1), inputDateFormat),
    description: 'pen wielder',
  },
  {
    id: 40,
    firstName: 'Landon',
    lastName: 'Papa',
    capeCounter: 0,
    originDate: format(new Date(2000, 9, 1), inputDateFormat),
    description: 'arc trooper',
  },
];
export default {
  name: 'Heroes',
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: '',
      capeMessage: '',
    };
  },
  components: {
    HeroDetail,
  },
  mixins: [lifecycleHooks, selectedItem],
  created() {
    this.loadHeroes();
    this.log(`${this.componentName} created hook called`);
  },
  methods: {
    async getHeroes() {
      return new Promise(resolve => {
        setTimeout(() => resolve(ourHeroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'getting the heroes, please be patient';
      this.heroes = await this.getHeroes();
      this.message = '';
    },
    cancelHero() {
      this.selectedHero = undefined;
      this.message = '';
    },
    saveHero(hero) {
      this.selectedHero = undefined;
      const index = this.heroes.findIndex(h => h.id === hero.id);
      this.heroes.splice(index, 1, hero);
      this.heroes = [...this.heroes];
      this.message = JSON.stringify(hero);
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
};
</script>
