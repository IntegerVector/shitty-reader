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

.left-arrow,
.right-arrow,
.top-arrow,
.bottom-arrow {
  transform: rotate(45deg);
  width: 1rem;
  height: 1rem;
  display: block;
}

.left-arrow {
  border-left: 2px solid #000000;
  border-bottom: 2px solid #000000;
  margin-left: 0.5rem;
}

.right-arrow {
  border-right: 2px solid #000000;
  border-top: 2px solid #000000;
  margin-right: 0.5rem;
}

.top-arrow {
  border-left: 2px solid #000000;
  border-top: 2px solid #000000;
  margin-top: 0.5rem;
}

.bottom-arrow {
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;
  margin-bottom: 0.5rem;
}
</style>
