<template>
  <div class="page">
    <Search
      ref="search"
      :imageType="imageType"
      :searchString="searchString"
      @onSearch="loadImages($event)"
    />
    <Gallery :urlsList="urlsList" @noData="nextImageType()" />
    <HistoryAndFavoritesModal
      v-if="isModalOpened"
      @onClose="closeModal()"
      @onSelect="itemFromModalSelected($event)"
    />
    <div class="tool-bar">
      <button class="tool-bar-button" @click="openModal()">
        <span class="material-icons text--dark"> list </span>
      </button>
      <button ref="upButton" class="tool-bar-button up-button" @click="goUp()">
        <span class="material-icons text--dark"> expand_less </span>
      </button>
      <button class="tool-bar-button" v-if="urlsList.length" @click="goBack()">
        <span class="material-icons text--dark"> navigate_before </span>
      </button>
      <button class="tool-bar-button" v-if="urlsList.length" @click="goNext()">
        <span class="material-icons text--dark"> navigate_next </span>
      </button>
    </div>
    <div class="space-for-up-button">
      <!-- This is just an empty space to don't allow "Up" button to cover last page! -->
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Gallery from "@/components/Gallery.vue";
import HistoryAndFavoritesModal from "@/components/history-and-favorites/HistoryAndFavoritesModal.vue";

import { getStrategy } from "@/services/get-strategy-by-source";

export default {
  name: "Main",
  components: {
    Search,
    Gallery,
    HistoryAndFavoritesModal,
  },
  data() {
    return {
      imageTypesList: ["jpeg", "jpg", "png"],
      imageType: "jpeg",
      searchString: "",
      urlsList: [],
      strategy: getStrategy("MANGA_PILL"),
      isModalOpened: false,
    };
  },
  mounted() {
    const btn = this.$refs.upButton;
    window.onscroll = () => {
      if (
        document.body.scrollTop > 250 ||
        document.documentElement.scrollTop > 250
      ) {
        btn.style.display = "grid";
      } else {
        btn.style.display = "none";
      }
    };
  },
  methods: {
    nextImageType() {
      const index = this.imageTypesList.indexOf(this.imageType);
      this.imageType = this.imageTypesList[index + 1] || this.imageTypesList[0];
    },
    updateSearchString(string) {
      this.$refs.search.text = string;
      this.$refs.search.search();
    },
    loadImages($event) {
      this.urlsList = $event || [];
    },
    goUp() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    async goNext() {
      const newBookAndChapter = await this.strategy.nextChapterByPages(
        this.urlsList
      );
      this.updateSearchString(newBookAndChapter);
    },
    async goBack() {
      const newBookAndChapter = await this.strategy.previousChapterByPages(
        this.urlsList
      );
      this.updateSearchString(newBookAndChapter);
    },
    openModal() {
      this.isModalOpened = true;
    },
    closeModal() {
      this.isModalOpened = false;
    },
    itemFromModalSelected($event) {
      if ($event) {
        this.closeModal();
        this.searchString = $event;
      }
    },
  },
};
</script>

<style scoped>
.tool-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.tool-bar-button {
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  margin-left: 1.5rem;
  display: grid;
  place-items: center;
}

.up-button {
  display: none;
}

.space-for-up-button {
  width: 100%;
  height: 6rem;
}
</style>
