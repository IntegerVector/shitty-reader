<template>
  <ul class="list-container">
    <li v-for="item in itemsList" :key="item">
      <CoverPreview :searchString="item" @click="$emit('onSelect', item)" />
      <span @click="$emit('onSelect', item)">
        {{ item }}
      </span>
      <button class="material-icons text--light" @click="deleteItem(item)">
        delete
      </button>
    </li>
  </ul>
</template>

<script>
import CoverPreview from "@/components/CoverPreview.vue";

import { history } from "@/services/history";

export default {
  name: "HistoryList",
  components: {
    CoverPreview,
  },
  emits: {
    onSelect: String,
  },
  data() {
    return {
      itemsList: history.get(),
    };
  },
  methods: {
    deleteItem(item) {
      history.delete(item);
      this.itemsList = history.get();
    },
  },
};
</script>

<style scoped>
.list-container {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 1rem 2rem 1rem 2rem;
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #ffffff;
}
</style>
