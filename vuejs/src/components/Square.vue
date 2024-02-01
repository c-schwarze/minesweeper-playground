<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  row: Number;
  col: Number;
}>();

defineEmits({
  click(payload: { row: Number, col: Number }) {}
});
</script>

<template>
  <button @click="$emit('click', {row: props.row, col: props.col})">X</button>
</template>

<style scoped>

</style>
