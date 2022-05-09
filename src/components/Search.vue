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
        <button v-if="text" @click="toggleFav()">
          <span v-if="!isFav" class="material-icons icon--smaller text--light">
            star_border
          </span>
          <span v-if="isFav" class="material-icons icon--smaller text--light">
            star
          </span>
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
import { favorites } from "@/services/favorites";

export default {
  name: "Search",
  props: {
    searchString: {
      type: String,
      default: new String(""),
    },
  },
  emits: {
    onSearch: Array,
  },
  watch: {
    searchString: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.text = this.searchString;
          this.isFav = favorites.has(this.text);
          this.search();
        }
      },
    },
  },
  data() {
    return {
      text: "",
      source: "MANGA_PILL",
      isFav: false,
    };
  },
  mounted() {
    this.text = this.getHistory().pop() || "";
    this.updateIsFav();

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
      const data = await strategy.loadPages(`${this.text}`);
      this.text = data.text;
      history.push(data.text);
      this.updateIsFav();
      this.$emit("onSearch", data.urls);
    },
    clear() {
      this.text = "";
      this.isFav = false;
      this.$emit("onSearch", []);
    },
    getHistory() {
      return history.get() || [];
    },
    toggleFav() {
      favorites.toggle(this.text);
      this.updateIsFav();
    },
    updateIsFav() {
      this.isFav = favorites.has(this.text);
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
  align-items: center;
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
