<template>
  <div class="tab-header-container">
    <div
      class="tab-header icon--clickable"
      v-for="tab in tabs"
      :class="selectedTabId === tab.id ? 'tab-header--selected' : ''"
      :key="tab.id"
      @click="onClick(tab)"
    >
      <span class="material-icons text--light icon--smaller">
        {{ tab.icon }}
      </span>
      <span class="tab-label text--bold text--light"> {{ tab.label }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabHeader",
  props: {
    tabs: {
      type: Object,
      default: new Array(),
    },
  },
  emits: {
    onSelect: Object,
  },
  data() {
    return {
      selectedTabId: this.tabs[0].id,
    };
  },
  methods: {
    onClick(tab) {
      this.selectedTabId = tab.id;
      this.$emit("onSelect", tab);
    },
  },
};
</script>

<style scoped>
.tab-header-container {
  display: flex;
  justify-content: stretch;
  align-items: center;
}

.tab-header {
  padding-bottom: 0.5rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.2rem solid transparent;
}

.tab-header--selected {
  border-bottom: 0.2rem solid #ffffff;
}

.tab-label {
  margin-left: 0.5rem;
  display: grid;
  place-items: center;
}
</style>
