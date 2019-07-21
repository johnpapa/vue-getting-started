<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
      <div class="columns">
        <div class="column is-8" v-if="heroes">
          <!-- <heroes-list> -->
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
          <!-- <heroes-list> -->

          <!-- <hero-detail> -->
          <div v-if="selectedHero">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ fullName }}</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="field">
                    <label class="label" for="id">id</label>
                    <label class="input" name="id" readonly>{{
                      selectedHero.id
                    }}</label>
                  </div>
                  <div class="field">
                    <label class="label" for="firstName">first name</label>
                    <input
                      class="input"
                      name="firstName"
                      v-model="selectedHero.firstName"
                    />
                  </div>
                  <div class="field">
                    <label class="label" for="lastName">last name</label>
                    <input
                      class="input"
                      name="lastName"
                      v-model="selectedHero.lastName"
                    />
                  </div>
                  <div class="field">
                    <label class="label" for="description">description</label>
                    <input
                      class="input"
                      name="description"
                      v-model="selectedHero.description"
                    />
                  </div>
                  <div class="field">
                    <label class="label" for="originDate">origin date</label>
                    <input
                      type="date"
                      class="input"
                      id="originDate"
                      v-model="selectedHero.originDate"
                    />
                    <p class="comment">
                      My origin story began on
                      {{ selectedHero.originDate | shortDate }}
                    </p>
                  </div>
                  <div class="field">
                    <label class="label" for="capeCounter">cape counter</label>
                    <input
                      class="input"
                      name="capeCounter"
                      type="number"
                      v-model="selectedHero.capeCounter"
                    />
                  </div>
                  <div class="field">
                    <label class="label" for="capeMessage">cape message</label>
                    <label class="input" name="capeMessage">{{
                      capeMessage
                    }}</label>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <button
                  class="link card-footer-item cancel-button"
                  @click="cancelHero()"
                >
                  <i class="fas fa-undo"></i>
                  <span>Cancel</span>
                </button>
                <button class="link card-footer-item" @click="saveHero()">
                  <i class="fas fa-save"></i>
                  <span>Save</span>
                </button>
              </footer>
            </div>
          </div>
          <!-- </hero-detail> -->

          <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

import { displayDateFormat, ourHeroes } from '../shared';

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
  created() {
    this.loadHeroes();
  },
  computed: {
    fullName() {
      return this.selectedHero
        ? `${this.selectedHero.firstName} ${this.selectedHero.lastName}`
        : '';
    },
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
    },
    saveHero() {
      const index = this.heroes.findIndex(h => h.id === this.selectedHero.id);
      this.heroes.splice(index, 1, this.selectedHero);
      this.heroes = [...this.heroes];
      this.selectedHero = undefined;
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
    handleTheCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = 'Where is my cape?';
          break;
        case 1:
          this.capeMessage = 'One is all I need';
          break;
        case 2:
          this.capeMessage = 'Alway have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
    },
  },
  watch: {
    'selectedHero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(
          `CapeCounter watcher evalauted. old=${oldValue}, new=${newValue}`
        );
        this.handleTheCapes(newValue);
      },
    },
  },
  filters: {
    shortDate: function(value) {
      return format(value, displayDateFormat);
    },
  },
};
</script>
