<template>
  <div class="card edit-detail">
    <header class="card-header">
      <p class="card-header-title">{{ editingVillain.name }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field" v-if="editingVillain.id">
          <label class="label" for="id">id</label>
          <input
            class="input"
            name="id"
            placeholder="e.g. VillainColleen"
            readonly
            type="text"
            v-model="editingVillain.id"
          />
        </div>
        <div class="field">
          <label class="label" for="name">name</label>
          <input
            class="input"
            name="name"
            placeholder="e.g. Colleen"
            type="text"
            v-model="editingVillain.name"
          />
        </div>
        <div class="field">
          <label class="label" for="description">description</label>
          <input
            class="input"
            name="description"
            placeholder="dance fight!"
            type="text"
            v-model="editingVillain.description"
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
        :item="editingVillain"
        @clicked="clear"
      ></ButtonFooter>
      <ButtonFooter
        class="card-footer-item"
        :className="'save-button'"
        :iconClasses="'fas fa-save'"
        :item="editingVillain"
        label="Save"
        @clicked="saveVillain"
      ></ButtonFooter>
    </footer>
  </div>
</template>

<script>
import ButtonFooter from '@/components/button-footer.vue';

export default {
  name: 'VillainDetail',
  props: {
    villain: {
      type: Object,
      default() {},
    },
  },
  components: { ButtonFooter },
  data() {
    return {
      addMode: false,
      editingVillain: { ...this.villain },
    };
  },
  watch: {
    villain() {
      if (this.villain && this.villain.id) {
        this.editingVillain = { ...this.villain };
        this.addMode = false;
      } else {
        this.editingVillain = { id: undefined, name: '', description: '' };
        this.addMode = true;
      }
    },
  },
  methods: {
    clear() {
      this.$emit('unselect');
    },
    saveVillain() {
      this.$emit('save', this.editingVillain);
      this.clear();
    },
  },
};
</script>

<style lang="scss"></style>
