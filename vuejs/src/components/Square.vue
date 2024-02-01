<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  row: Number;
  col: Number;
  value: String;
  isFlagged: boolean;
  isRevealed: boolean;
}>();

defineEmits({
  click(payload: { row: Number, col: Number }) {}
});

const displayValue = () => {
    if (props.isFlagged) {
        return 'F'
    } else if (props.isRevealed && props.value === 'mine') {
        return 'B'
    } else if (props.value === 'mine') {
        return 'M'
    }
    return ' '
}
</script>

<template>
  <button class="button" @click="$emit('click', {row: props.row, col: props.col})">{{displayValue()}}</button>
</template>

<style scoped>
    button.button {
        width: 100%;
        height: 100%;
    }
</style>
