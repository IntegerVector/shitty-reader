<template>
  <div class="gallery-container">
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
  emits: {
    noData: null,
  },
  data() {
    return {
      errorsCount: 0,
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

      if (this.errorsCount >= this.urlsList.length) {
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
