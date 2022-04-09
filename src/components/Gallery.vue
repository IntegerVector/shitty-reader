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
    <button ref="upButton" class="up-button" @click="goUp()">🔝</button>
    <div class="space-for-up-button">
      <!-- This is just an empty space to don't allow "Up" button to cover last page! -->
    </div>
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
  mounted() {
    const btn = this.$refs.upButton;
    window.onscroll = () => {
      if (
        document.body.scrollTop > 250 ||
        document.documentElement.scrollTop > 250
      ) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    };
  },
  methods: {
    loaded(url) {
      const image = document.getElementById(url);
      image.style.display = "block";
    },
    goUp() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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

.up-button {
  position: fixed;
  right: 2rem;
  bottom: 1rem;
  display: none;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}

.space-for-up-button {
  width: 100%;
  height: 5rem;
}
</style>
