<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
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
                  <router-link
                    tag="button"
                    class="link card-footer-item"
                    :to="{ name: 'hero-detail', params: { id: hero.id } }"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </router-link>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataService } from '../shared';

export default {
  name: 'Heroes',
  data() {
    return {
      heroes: [],
      message: '',
    };
  },
  async created() {
    await this.loadHeroes();
  },
  methods: {
    async loadHeroes() {
      this.heroes = [];
      this.message = 'getting the heroes, please be patient';

      this.heroes = await dataService.getHeroes();

      this.message = '';
    },
  },
};
</script>
