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
  methods: {
    loaded(url) {
      const image = document.getElementById(url);
      image.style.visibility = "visible";
      image.style.display = "block";
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
  visibility: hidden;
  display: none;
}
</style>
