<script setup lang="ts">
import Board from './components/Board.vue'

// This is where we will keep track of the rows, cols, and mines
const props = {
  rows:  10,
  cols:  10,
  mines: 10,
}
</script>

<template>
  <header>
    <h1>Minesweeper</h1>

    <label>Number of Rows: <input /></label>
    <br />
    <label>Number of Columns: <input /></label>
    <br />
    <label>Number of Mines: <input /></label>
  </header>

  <main>
    <Board v-bind="props" />
  </main>
</template>
