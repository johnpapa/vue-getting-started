<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">Edit Hero</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ hero.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="firstName">first name</label>
              <input class="input" name="firstName" v-model="hero.firstName" />
            </div>
            <div class="field">
              <label class="label" for="lastName">last name</label>
              <input class="input" name="lastName" v-model="hero.lastName" />
            </div>
            <div class="field">
              <label class="label" for="description">description</label>
              <input
                class="input"
                name="description"
                v-model="hero.description"
              />
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
  </div>
</template>

<script>
import { dataService } from '../shared';

export default {
  name: 'HeroDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      hero: {},
    };
  },
  async created() {
    this.hero = await dataService.getHero(this.id);
  },
  computed: {
    fullName() {
      return this.hero ? `${this.hero.firstName} ${this.hero.lastName}` : '';
    },
  },
  methods: {
    cancelHero() {
      this.$router.push({ name: 'heroes' });
    },
    async saveHero() {
      await dataService.updateHero(this.hero);
      this.$router.push({ name: 'heroes' });
    },
  },
};
</script>
