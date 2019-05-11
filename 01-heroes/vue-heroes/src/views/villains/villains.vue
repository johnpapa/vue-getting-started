<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      @refresh="getVillains"
      @add="enableAddMode"
      :routePath="routePath"
    ></ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="villains">
        <VillainList
          v-if="!selected"
          :villains="villains"
          :selectedVillain="selected"
          @selected="select($event)"
          @deleted="askToDelete($event)"
        ></VillainList>
        <VillainDetail
          v-if="selected"
          :villain="selected"
          @unselect="clear"
          @save="save"
        ></VillainDetail>
      </div>
    </div>

    <Modal
      class="modal-villain"
      :message="message"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteVillain"
    ></Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import VillainDetail from './villain-detail.vue';
import VillainList from './villain-list.vue';

const captains = console;

export default {
  name: 'Villains',
  data() {
    return {
      villainToDelete: null,
      message: '',
      routePath: '/villains',
      selected: null,
      showModal: false,
      title: 'Villains',
    };
  },
  components: {
    ListHeader,
    VillainList,
    VillainDetail,
    Modal,
  },
  created() {
    this.getVillainsAction();
  },
  computed: {
    ...mapGetters('villains', { villains: 'villains' }),
  },
  methods: {
    ...mapActions('villains', [
      'getVillainsAction',
      'deleteVillainAction',
      'addVillainAction',
      'updateVillainAction',
    ]),
    askToDelete(villain) {
      this.villainToDelete = villain;
      this.showModal = true;
      if (this.villainToDelete.name) {
        this.message = `Would you like to delete ${this.villainToDelete.name}?`;
        captains.log(this.message);
      }
    },
    clear() {
      this.selected = null;
    },
    closeModal() {
      this.showModal = false;
    },
    deleteVillain() {
      this.closeModal();
      if (this.villainToDelete) {
        captains.log(
          `You said you want to delete ${this.villainToDelete.name}`
        );
        this.deleteVillainAction(this.villainToDelete);
      }
      this.clear();
    },
    enableAddMode() {
      this.selected = {};
    },
    getVillains() {
      this.getVillainsAction();
      this.clear();
    },
    save(villain) {
      captains.log('villain changed', villain);
      villain.id
        ? this.updateVillainAction(villain)
        : this.addVillainAction(villain);
    },
    select(villain) {
      this.selected = villain;
    },
  },
};
</script>

<style lang="scss"></style>
