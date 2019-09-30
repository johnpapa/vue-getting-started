<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Heroes</h2>
          <button class="button refresh-button" @click="loadHeroes()">
            <i class="fas fa-sync"></i>
          </button>
          <router-link
            tag="button"
            class="button add-button"
            :to="{ name: 'hero-detail', params: { id: 0 } }"
          >
            <i class="fas fa-plus"></i>
          </router-link>
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
                    @click="askToDelete(hero)"
                  >
                    <i class="fas fa-trash"></i>
                    <span>Delete</span>
                  </button>
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
    <Modal
      :message="modalMessage"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteHero"
    >
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from '@/components/modal';
// import { dataService } from '../shared';

export default {
  name: 'Heroes',
  data() {
    return {
      // heroes: [],
      heroToDelete: null,
      message: '',
      showModal: false,
    };
  },
  components: {
    Modal,
  },
  async created() {
    await this.loadHeroes();
  },
  methods: {
    ...mapActions(['getHeroesAction', 'deleteHeroAction']),
    // map `this.deleteHeroAction(hero)` to `this.$store.dispatch('deleteHeroAction', hero)`
    // map `this.getHeroesAction()` to `this.$store.dispatch('getHeroesAction')`
    askToDelete(hero) {
      this.heroToDelete = hero;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteHero() {
      this.closeModal();
      if (this.heroToDelete) {
        await this.deleteHeroAction(this.heroToDelete);
      }
      /** The loadHeroes is not needed,
       *  but it's nice to query the database
       * in case any other changes were made by other users
       */
      await this.loadHeroes();
    },
    async loadHeroes() {
      // this.heroes = [];
      this.message = 'getting the heroes, please be patient';
      // this.heroes = await dataService.getHeroes();
      // 1. dispatch the action
      // await this.$store.dispatch('getHeroesAction');
      // 2. shortcut to dispatch using the mapped Action
      await this.getHeroesAction();
      this.message = '';
    },
  },
  computed: {
    // 1.Access state
    // heroes() {
    //   return this.$store.state.heroes;
    // },
    // 2. map the state
    // ...mapState({ heroes: state => state.heroes }),
    // 3. shorcut to map the state
    // ...mapState({ heroes: 'heroes' }),
    // 4. quickest way to map state
    ...mapState(['heroes']),
    // map this.heroes to store.state.heroes
    modalMessage() {
      const name =
        this.heroToDelete && this.heroToDelete.fullName
          ? this.heroToDelete.fullName
          : '';
      return `Would you like to delete ${name} ?`;
    },
  },
};
</script>
