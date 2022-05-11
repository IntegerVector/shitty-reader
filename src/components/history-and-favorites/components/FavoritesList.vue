<template>
  <ul class="list-container">
    <li v-for="item in itemsList" :key="item">
      <CoverPreview :searchString="item" @click="$emit('onSelect', item)" />
      <span @click="$emit('onSelect', item)">
        {{ item }}
      </span>
      <button
        class="material-icons text--light"
        :id="'icon-' + item"
        @click="toggleFav(item)"
      >
        star
      </button>
    </li>
  </ul>
</template>

<script>
import CoverPreview from "@/components/CoverPreview.vue";

import { favorites } from "@/services/favorites";

export default {
  name: "FavoritesList",
  components: {
    CoverPreview,
  },
  emits: {
    onSelect: String,
  },
  data() {
    return {
      itemsList: favorites.get(),
    };
  },
  methods: {
    toggleFav(item) {
      const btn = document.getElementById("icon-" + item);
      btn.textContent =
        btn.textContent === "star_border" ? "star" : "star_border";
      favorites.toggle(item);
    },
  },
};
</script>

<style scoped>
.list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 0.5rem 1rem 0.5rem 1rem;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #ffffff;
}
</style>
