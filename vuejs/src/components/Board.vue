<script setup lang="ts">
import { ref } from 'vue';
import Square from './Square.vue'

const props = defineProps<{
  rows: Number,
  cols: Number,
  mines: Number,
}>()

// TODO - move this to a method, probably
const boardData = ref([...Array(props.rows)].map(() => [...Array(props.cols)].map(() => 'x')));
const minesRemaining = ref(0)
</script>

<template>
  <div>
    <p>Mines remaining: {{ props.mines}}</p>
    <div class="board">
      <div class="row" v-for="row in boardData">
        <div class="square" v-for="square in row">
          <!-- <Square /> -->
          {{ square }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .board {
    border: 2px black solid;
    display: inline-block;
    text-align: center;
  }
  .row {
    display: flex;
  }

  .square {
    width: 30px;
    height: 30px;
    border: 1px black solid;
  }
</style>
