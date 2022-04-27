<template>
  <div class="search-container">
    <div class="search-box">
      <div class="search-text">
        <input
          placeholder="Type manga URL here ..."
          type="search"
          v-model="text"
        />
      </div>
      <div class="search-confirm">
        <button @click="search()">⬇️</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getStrategy } from "@/services/get-strategy-by-source";

export default {
  name: "Search",
  props: {
    imageType: {
      type: String,
      default: new String(""),
    },
  },
  emits: {
    onSearch: Array,
  },
  watch: {
    imageType: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.type = newValue;
          this.search();
        }
      },
    },
  },
  data() {
    return {
      text: "",
      source: "MANGA_PILL",
      type: this.imageType,
    };
  },
  methods: {
    async search() {
      const strategy = getStrategy(this.source);
      const data = await strategy.loadPages(`${this.text}|type:${this.type}`);
      this.text = data.text;
      this.$emit("onSearch", data.urls);
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
  border-bottom: 1px solid #ffffff;
}

.search-confirm {
  height: 2.5rem;
  width: 2.5rem;
  flex-grow: 0;
  display: grid;
  place-items: center;
}

.search-text {
  flex-grow: 1;
}

input {
  color: #ffffff;
}
</style>
