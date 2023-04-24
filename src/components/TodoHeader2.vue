<template>
    <div class="p-inputgroup">
        <InputText placeholder="enter job" v-model="todoStore.inputValue" @keypress.enter="todoStore.addItem" />
        <Button @click="todoStore.addItem" :disabled="!todoStore.inputValue" icon="pi pi-plus" severity="success" />
    </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
const todoStore = useTodoStore();
</script>

<style scoped></style>
