<template>
  <div class="search-container">
    <div class="search-box">
      <div class="search-type">
        <select v-model="type">
          <option value="png">png</option>
          <option value="jpeg">jpeg</option>
          <option value="jpg">jpg</option>
        </select>
      </div>
      <div class="search-text">
        <input type="search" v-model="text" />
      </div>
      <div class="search-confirm">
        <button @click="search()">Go</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getStrategy } from "@/services/get-strategy-by-source";

export default {
  name: "Search",
  emits: {
    onSearch: Array,
  },
  data() {
    return {
      text: "",
      source: "MANGA_PILL",
      type: "jpeg",
    };
  },
  methods: {
    async search() {
      const strategy = getStrategy(this.source);
      const data = await strategy.loadPages(`${this.text}|type:${this.type}`);
      this.$emit("onSearch", data);
    },
  },
};
</script>
<style scoped>
.search-container {
  display: grid;
  place-items: center;
  padding: 1rem;
}

.search-box {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000000;
}

.search-source,
.search-confirm {
  height: 2.5rem;
  width: 2.5rem;
}

.search-source {
  flex-grow: 0;
}

.search-text {
  flex-grow: 1;
}

.search-confirm {
  flex-grow: 0;
  display: grid;
  place-items: center;
}
</style>
