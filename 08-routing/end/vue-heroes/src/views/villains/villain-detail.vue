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
            <label class="input" name="id" readonly>{{ villain.id }}</label>
          </div>
          <div class="field">
            <label class="label" for="firstName">first name</label>
            <input class="input" name="firstName" v-model="villain.firstName" />
          </div>
          <div class="field">
            <label class="label" for="lastName">last name</label>
            <input class="input" name="lastName" v-model="villain.lastName" />
          </div>
          <div class="field">
            <label class="label" for="description">description</label>
            <input
              class="input"
              name="description"
              v-model="villain.description"
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
        <button class="link card-footer-item" @click="saveVillain()">
          <i class="fas fa-save"></i>
          <span>Save</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { data } from '../../shared';

export default {
  name: 'VillainDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      villain: {},
    };
  },
  async created() {
    this.villain = await data.getVillain(this.id);
  },
  computed: {
    fullName() {
      return this.villain
        ? `${this.villain.firstName} ${this.villain.lastName}`
        : '';
    },
  },
  methods: {
    cancelVillain() {
      this.$router.push({ name: 'villains' });
      // this.$emit('cancel');
    },
    saveVillain() {
      this.$router.push({ name: 'villains' });
      // this.$emit('save', this.villain);
    },
  },
};
</script>
