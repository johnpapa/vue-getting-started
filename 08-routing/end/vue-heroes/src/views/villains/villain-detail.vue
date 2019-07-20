<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{ fullName }}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label" for="id">id</label>
            <label class="input" name="id" readonly>{{
              clonedVillain.id
            }}</label>
          </div>
          <div class="field">
            <label class="label" for="firstName">first name</label>
            <input
              class="input"
              name="firstName"
              v-model="clonedVillain.firstName"
            />
          </div>
          <div class="field">
            <label class="label" for="lastName">last name</label>
            <input
              class="input"
              name="lastName"
              v-model="clonedVillain.lastName"
            />
          </div>
          <div class="field">
            <label class="label" for="description">description</label>
            <input
              class="input"
              name="description"
              v-model="clonedVillain.description"
            />
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button
          class="link card-footer-item cancel-button"
          @click="cancelVillain()"
        >
          <i class="fas fa-undo"></i>
          <span>Cancel</span>
        </button>
        <button
          class="link card-footer-item save-button"
          @click="saveVillain()"
        >
          <i class="fas fa-save"></i>
          <span>Save</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VillainDetail',
  props: {
    villain: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      clonedVillain: { ...this.villain },
    };
  },
  computed: {
    fullName() {
      return this.clonedVillain
        ? `${this.clonedVillain.firstName} ${this.clonedVillain.lastName}`
        : '';
    },
  },
  methods: {
    cancelVillain() {
      this.$emit('cancel');
    },
    saveVillain() {
      this.$emit('save', this.clonedVillain);
    },
  },
};
</script>
