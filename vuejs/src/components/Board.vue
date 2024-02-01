<script setup lang="ts">
import { ref } from 'vue';
import Square from './Square.vue'

const props = defineProps<{
  rows: Number,
  cols: Number,
  mines: Number,
}>();

// TODO - move this to a method, probably
const boardData = ref([...Array(props.rows)].map(() => [...Array(props.cols)].map(() => ({
  value: 'empty',
  isFlagged: false,
  isRevealed: false,
}))));
const minesRemaining = ref(0)
const handleClick = (payload: {row: Number, col: Number}) => {
  const {row, col} = payload;
  alert(`Clicked row (${row}) col (${col})`);
}
</script>

<template>
  <div>
    <p>Mines remaining: {{ mines}}</p>
    <div class="board">
      <div class="row" v-for="(row, rowIndex) in boardData" :key="rowIndex">
        <div class="square" v-for="(square, squareIndex) in row" :key="`${rowIndex} + ${squareIndex}`">
          <Square 
            :row="rowIndex" 
            :col="squareIndex"
            :value="square.value"
            :isFlagged="square.isFlagged"
            :isRevealed="square.isRevealed"
            @click="handleClick"
          />
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
