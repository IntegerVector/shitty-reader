<template>
  <router-view />
</template>
<style>
:root {
  font-size: 16px;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #000000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}

.page {
  width: 100%;
  height: 100%;
}

button,
input[type="text"],
input[type="search"],
select,
option,
.text-input {
  font-size: 1.5rem;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  cursor: pointer;
  outline: none;
  border: 0;
  background-color: transparent;
}

button {
  user-select: none;
  padding: 0;
  margin: 0;
}

input[type="text"],
input[type="search"],
.text-input {
  display: block;
  cursor: text;
  width: 100%;
  max-width: 100%;
  height: 2rem;
}

select,
option {
  display: grid;
  place-items: center;
}
</style>
