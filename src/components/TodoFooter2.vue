<template>
    <div v-if="todoStore.todoList.length" class="flex align-items-center">
        <Chip :label="todoStore.remaining + ' item left'" />
        <SelectButton class="mx-2" v-model="todoStore.selectedValue" :options="options" aria-labelledby="basic" />
        <Button :disabled="todoStore.todoList.length === todoStore.remaining" @click="todoStore.clearAllItemConfirm($event)" severity="danger"> Clear</Button>
    </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
const todoStore = useTodoStore();
const options = ['all', 'complete', 'uncomplete'];

</script>

<style lang="scss" scoped></style>
