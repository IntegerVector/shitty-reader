<template>
  <div class="gallery-container">
    <dir class="gallery-item-container" v-for="url in urlsList" :key="url">
      <img class="gallery-item" v-if="url" :src="url" />
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
  width: 100%;
  height: auto;
  background-color: transparent;
}
</style>
