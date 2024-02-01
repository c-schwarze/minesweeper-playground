<script setup lang="ts">
import { ref } from 'vue';
import Board from './components/Board.vue'

// This is where we will keep track of the rows, cols, and mines
const rows = ref(10);
const cols = ref(10);
const mines = ref(10);
// createBoardKey - key-changing technique to force a rerender when we want
const createBoardKey = ref(0);
</script>

<template>
  <header>
    <h1>Minesweeper</h1>
    <h2>Todos</h2>
    <ol>
      <li>Add click to flag mines</li>
      <li>Generate random mines</li>
      <li>Add click to reveal square</li>
      <li>Add win/loss conditions</li>
    </ol>
  </header>

  <main>
    <label>Number of Rows: <input v-model.number="rows" type="text" /></label>
    <br />
    <label>Number of Columns: <input v-model.number="cols" type="text" /></label>
    <br />
    <label>Number of Mines: <input v-model.number="mines" type="text" /></label>
    <br />
    <button @click="createBoardKey++">Create new board</button>
    <Board
      :key="createBoardKey"
      :rows="rows"
      :cols="cols"
      :mines="mines"
    />
  </main>
</template>
