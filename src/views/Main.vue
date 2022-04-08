<template>
  <div class="page">
    <Search @onSearch="loadImages($event)" />
    <Gallery :urlsList="urlsList" />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Gallery from "@/components/Gallery.vue";

export default {
  name: "Main",
  components: {
    Search,
    Gallery,
  },
  data() {
    return {
      urlsList: [],
    };
  },
  methods: {
    loadImages($event) {
      this.urlsList = $event || [];
    },
  },
};
</script>
