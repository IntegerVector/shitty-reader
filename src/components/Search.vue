<template>
  <div class="search-container">
    <form class="search-box" @submit="$event.preventDefault() && search()">
      <div class="search-text">
        <input
          placeholder="Type manga URL here ..."
          type="search"
          v-model="text"
        />
      </div>
      <div class="search-commands">
        <button @click="search()">
          <span class="material-icons text--light"> download </span>
        </button>
        <button @click="clear()">
          <span class="material-icons text--light"> clear </span>
        </button>
        <input type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import { getStrategy } from "@/services/get-strategy-by-source";
import { history } from "@/services/history";

export default {
  name: "Search",
  props: {
    imageType: {
      type: String,
      default: new String("jpeg"),
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
  mounted() {
    this.text = this.getHistory()[0] || "";

    if (this.text) {
      this.search();
    }
  },
  methods: {
    async search() {
      if (this.text === "") {
        this.$emit("onSearch", []);
      }

      const strategy = getStrategy(this.source);
      const data = await strategy.loadPages(`${this.text}|type:${this.type}`);
      this.text = data.text;
      history.push(data.text);
      this.$emit("onSearch", data.urls);
    },
    clear() {
      this.text = "";
      this.$emit("onSearch", []);
    },
    getHistory() {
      return history.get() || [];
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
.search-text {
  flex-grow: 1;
}

.search-commands {
  flex-grow: 0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-end;
  gap: 0.25rem;
  height: 2.5rem;
}

input {
  color: #ffffff;
}

input[type="submit"] {
  visibility: hidden;
  height: 0;
  width: 0;
}
</style>
