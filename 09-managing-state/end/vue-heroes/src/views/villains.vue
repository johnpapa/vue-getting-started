<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Villains</h2>
          <ul>
            <li v-for="villain in villains" :key="villain.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="villain.name" class="name">
                      {{ villain.firstName }} {{ villain.lastName }}
                    </div>
                    <div class="description">{{ villain.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <router-link
                    tag="button"
                    class="link card-footer-item"
                    :to="{ name: 'villain-detail', params: { id: villain.id } }"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </router-link>
                  <!-- <router-link
                    tag="button"
                    class="link card-footer-item"
                    :to="{ path: `villains/${villain.id}` }"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </router-link> -->
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
  name: 'Villains',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      villains: [],
      message: '',
    };
  },
  async created() {
    await this.loadVillains();
  },
  methods: {
    async loadVillains() {
      this.villains = [];
      this.message = 'getting the villains, please be patient';

      this.villains = await dataService.getVillains();

      this.message = '';
    },
  },
};
</script>
