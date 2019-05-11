<template>
  <ul class="list">
    <li
      v-for="(villain, index) in villains"
      :key="villain.id"
      role="presentation"
    >
      <div class="card">
        <CardContent :name="villain.name" :description="villain.description" />
        <footer class="card-footer">
          <ButtonFooter
            class="delete-item"
            iconClasses="fas fa-trash"
            @clicked="deleteVillain"
            label="Delete"
            :dataIndex="index"
            :dataId="villain.id"
            :item="villain"
          />
          <ButtonFooter
            class="edit-item"
            iconClasses="fas fa-edit"
            @clicked="selectVillain"
            label="Edit"
            :dataIndex="index"
            :dataId="villain.id"
            :item="villain"
          />
        </footer>
      </div>
    </li>
  </ul>
</template>

<script>
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';

const captains = console;

export default {
  name: 'VillainList',
  props: {
    villains: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CardContent,
    ButtonFooter,
  },
  methods: {
    deleteVillain(villain) {
      this.$emit('deleted', villain);
      captains.log(`You tried to delete ${villain.name}`);
    },
    selectVillain(villain) {
      captains.log(`You tried to select ${villain.name}`);
      this.$emit('selected', villain);
    },
  },
};
</script>

<style lang="scss"></style>
