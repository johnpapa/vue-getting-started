<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-3">
        <header class="card-header">
          <p class="card-header-title">heroes list</p>
        </header>
        <ul class="list is-hoverable">
          <li v-for="hero in heroes" :key="hero.id">
            <a
              class="list-item"
              @click="selectHero(hero)"
              :class="{ 'is-active': selectedHero === hero }"
            >
              <span>{{ hero.firstName }}</span>
            </a>
          </li>
        </ul>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>

      <div class="column is-3" v-if="selectedHero">
        <header class="card-header">
          <p class="card-header-title">{{ fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" id="id" readonly>
                {{ selectedHero.id }}
              </label>
            </div>
            <div class="field">
              <label class="label" for="firstName">first name</label>
              <input
                class="input"
                id="firstName"
                v-model="selectedHero.firstName"
              />
            </div>
            <div class="field">
              <label class="label" for="lastName">last name</label>
              <input
                class="input"
                id="lastName"
                v-model="selectedHero.lastName"
              />
            </div>
            <div class="field">
              <label class="label" for="description">description</label>
              <input
                class="input"
                id="description"
                v-model="selectedHero.description"
              />
            </div>
            <div class="field">
              <label class="label" for="originDate">originDate</label>
              <input
                type="date"
                class="input"
                id="originDate"
                v-model="selectedHero.originDate"
              />
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
              <label class="input" name="capeMessage">{{ capeMessage }}</label>
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
          <button class="link card-footer-item save-button" @click="saveHero()">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
const dateFormat = 'YYYY-MM-DD';
export default {
  name: 'Heroes',
  data() {
    // let heroes = [
    //   {
    //     id: 10,
    //     firstName: 'Ella',
    //     lastName: 'Papa',
    //     capeCounter: 1,
    //     description: 'fashionista',
    //   },
    // ];
    return {
      heroes: [], // heroes,
      selectedHero: undefined, // heroes[0],
      capeMessage: '',
      message: '',
    };
  },
  created() {
    this.loadHeroes();
  },
  computed: {
    fullName() {
      return `${this.selectedHero.firstName} ${this.selectedHero.lastName}`;
    },
  },
  watch: {
    'selectedHero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(`Watcher evaluated. old=${oldValue}, new=${newValue}`);
        this.handleTheCapes(newValue);
      },
    },
  },
  methods: {
    async getHeroes() {
      const heroes = [
        {
          id: 10,
          firstName: 'Ella',
          lastName: 'Papa',
          capeCounter: 1,
          description: 'fashionista',
          originDate: format(new Date(1996, 5, 1), dateFormat),
        },
        {
          id: 20,
          firstName: 'Madelyn',
          lastName: 'Papa',
          capeCounter: 3,
          description: 'the cat whisperer',
          originDate: format(new Date(1998, 7, 1), dateFormat),
        },
        {
          id: 30,
          firstName: 'Haley',
          lastName: 'Papa',
          capeCounter: 2,
          description: 'pen wielder',
          originDate: format(new Date(1999, 8, 1), dateFormat),
        },
        {
          id: 40,
          firstName: 'Landon',
          lastName: 'Papa',
          capeCounter: 0,
          description: 'arc trooper',
          originDate: format(new Date(2000, 9, 1), dateFormat),
        },
      ];
      return new Promise(resolve => {
        setTimeout(() => resolve(heroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'getting the heroes, please be patient';
      this.heroes = await this.getHeroes();
      this.message = '';
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
    cancelHero() {
      this.message = '';
    },
    saveHero() {
      // This only updates when you click the save button
      this.message = JSON.stringify(this.selectedHero, null, '\n ');
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
};
</script>
