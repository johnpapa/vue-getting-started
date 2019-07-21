<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group" v-if="!selectedHero">
          <h2 class="title">Heroes</h2>
          <ul>
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
                    class="link card-footer-item"
                    @click="selectHero(hero)"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <HeroDetail
          v-if="selectedHero"
          :id="selectedHero.id"
          @done="loadHeroes"
        />
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataService } from '../shared';
import HeroDetail from './hero-detail';

export default {
  name: 'Heroes',
  data() {
    return {
      heroes: [],
      message: '',
      selectedHero: undefined,
    };
  },
  components: {
    HeroDetail,
  },
  async created() {
    await this.loadHeroes();
  },
  methods: {
    async loadHeroes() {
      this.heroes = [];
      this.selectedHero = undefined;
      this.message = 'getting the heroes, please be patient';

      this.heroes = await dataService.getHeroes();

      this.message = '';
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
};
</script>
