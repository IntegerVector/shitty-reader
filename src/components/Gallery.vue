<template>
  <div class="gallery-container">
    <img class="gallery-item" v-for="url in urlsList" :key="url" :src="url" />
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
};
</script>

<style scoped>
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}

.gallery-item {
  width: 100%;
  height: auto;
  background-color: transparent;
}
</style>
