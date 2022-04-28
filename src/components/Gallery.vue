<template>
  <div v-if="urlsList.length > 0" class="gallery-container">
    <dir class="gallery-item-container" v-for="url in urlsList" :key="url">
      <img
        class="gallery-item"
        alt="Page not exists"
        v-if="url"
        :id="url"
        :src="url"
        @load="loaded(url)"
        @error="onError($event)"
      />
    </dir>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  props: {
    urlsList: {
      type: Array,
      default: new Array(),
    },
  },
  watch: {
    urlsList: {
      deep: true,
      // eslint-disable-next-line no-unused-vars
      handler(newValue, oldValue) {
        this.errorsCount = 0;
        this.loadedCount = 0;
      },
    },
  },
  emits: {
    noData: null,
  },
  data() {
    return {
      errorsCount: 0,
      loadedCount: 0,
    };
  },
  methods: {
    loaded(url) {
      const image = document.getElementById(url);
      image.style.display = "block";
    },
    onError($event) {
      if ($event.type === "error") {
        ++this.errorsCount;
      }

      if (this.errorsCount >= this.urlsList.length && this.loadedCount === 0) {
        this.errorsCount = 0;
        this.$emit("noData");
      }
    },
  },
};
</script>

<style scoped>
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}

.gallery-item,
.gallery-item-container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  background-color: transparent;
}

.gallery-item {
  display: none;
}
</style>
