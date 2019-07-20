<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Villains</h2>
      <div class="columns">
        <div class="column is-8" v-if="villains">
          <ul v-if="!selectedVillain">
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
                  <button
                    class="link card-footer-item save-button"
                    @click="selectVillain(villain)"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
          <VillainDetail
            :villain="selectedVillain"
            @save="saveVillain"
            @cancel="cancelVillain"
            v-if="selectedVillain"
          />
          <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { data } from '../../shared';
import VillainDetail from '@/views/villains/villain-detail';

export default {
  name: 'Villains',
  data() {
    return {
      villains: [],
      selectedVillain: undefined,
      message: '',
      capeMessage: '',
    };
  },
  components: {
    VillainDetail,
  },
  async created() {
    await this.loadVillains();
  },
  methods: {
    async loadVillains() {
      this.villains = [];
      this.message = 'getting the villains, please be patient';

      this.villains = await data.getVillains();

      this.message = '';
    },
    cancelVillain() {
      this.selectedVillain = undefined;
    },
    saveVillain(villain) {
      const index = this.villains.findIndex(h => h.id === villain.id);
      this.villains.splice(index, 1, villain);
      this.villains = [...this.villains];
      this.selectedVillain = undefined;
    },
    selectVillain(villain) {
      this.selectedVillain = villain;
    },
  },
};
</script>
