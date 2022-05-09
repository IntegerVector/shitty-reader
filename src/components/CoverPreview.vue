<template>
  <div class="cover-container">
    <div v-for="url in urls" :key="url">
      <img
        class="cover-item"
        alt="No data"
        :id="url"
        :src="url"
        @load="loaded(url)"
      />
    </div>
  </div>
</template>

<script>
import { getStrategy } from "@/services/get-strategy-by-source";

export default {
  name: "CoverPreview",
  props: {
    searchString: {
      type: String,
      default: new String(""),
    },
  },
  data() {
    return {
      strategy: getStrategy("MANGA_PILL"),
      urls: [],
    };
  },
  mounted() {
    this.urls = this.strategy.getCovers(this.searchString);
  },
  methods: {
    loaded(url) {
      const image = document.getElementById(url);
      image.style.display = "block";
    },
  },
};
</script>

<style scoped>
.cover-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-item {
  display: none;
  height: 4rem;
  margin-right: 0.5rem;
}
</style>
