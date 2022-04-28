<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-commands">
        <span class="material-icons icon--clickable" @click="$emit('onClose')">
          close
        </span>
      </div>
      <div class="modal-content">
        <HistoryList @onSelect="$emit('onSelect', $event)" />
      </div>
    </div>
  </div>
</template>

<script>
import HistoryList from "./components/HistoryList.vue";

export default {
  name: "HistoryAndFavoritesModal",
  components: {
    HistoryList,
  },
  emits: {
    onClose: null,
    onSelect: String,
  },
};
</script>

<style scoped>
.modal-overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0000009d;
  display: grid;
  place-items: center;
}

.modal-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 3rem;
  display: flex;
  flex-direction: column;
  background-color: #1f1f1f;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.modal-commands {
  width: calc(100% - 2rem);
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.modal-content {
  position: fixed;
  top: 7rem;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: #000000;
}
</style>
