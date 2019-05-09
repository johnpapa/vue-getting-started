<template>
  <div class="card edit-detail">
    <header class="card-header">
      <p class="card-header-title">{{ editingHero.name }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field" v-if="editingHero.id">
          <label class="label" for="id">id</label>
          <input
            class="input"
            name="id"
            placeholder="e.g. HeroColleen"
            readonly
            type="text"
            v-model="editingHero.id"
          />
        </div>
        <div class="field">
          <label class="label" for="name">name</label>
          <input
            class="input"
            name="name"
            placeholder="e.g. Colleen"
            type="text"
            v-model="editingHero.name"
          />
        </div>
        <div class="field">
          <label class="label" for="description">description</label>
          <input
            class="input"
            name="description"
            placeholder="dance fight!"
            type="text"
            v-model="editingHero.description"
          />
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <ButtonFooter
        class="card-footer-item"
        label="Cancel"
        :className="'cancel-button'"
        :iconClasses="'fas fa-undo'"
        :item="editingHero"
        @clicked="clear"
      ></ButtonFooter>
      <ButtonFooter
        class="card-footer-item"
        label="Save"
        :className="'save-button'"
        :iconClasses="'fas fa-save'"
        :item="editingHero"
        @clicked="saveHero"
      ></ButtonFooter>
    </footer>
  </div>
</template>

<script>
import ButtonFooter from '@/components/button-footer.vue';

export default {
  name: 'HeroDetail',
  props: {
    hero: {
      type: Object,
      default() {},
    },
  },
  components: { ButtonFooter },
  data() {
    return {
      addMode: false,
      editingHero: { ...this.hero },
    };
  },
  watch: {
    hero() {
      if (this.hero && this.hero.id) {
        this.editingHero = { ...this.hero };
        this.addMode = false;
      } else {
        this.editingHero = { id: undefined, name: '', description: '' };
        this.addMode = true;
      }
    },
  },
  methods: {
    clear() {
      this.$emit('unselect');
    },
    saveHero() {
      this.$emit('save', this.editingHero);
      this.clear();
    },
  },
};
</script>

<style lang="scss"></style>
