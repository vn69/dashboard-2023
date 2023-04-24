<template>
    <div v-if="todoList.length" class="flex align-items-center">
        <Chip :label="remaining + ' item left'" />
        <SelectButton class="mx-2" :modelValue="selectedValue" :options="options" aria-labelledby="basic" @update:modelValue="$emit('update:selectedValue', $event)" />
        <Button :disabled="todoList.length === remaining" @click="clearAllItemConfirm($event)" severity="danger"> Clear</Button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    todoList: Array,
    remaining: Number,
    selectedValue: String,
    clearAllItemConfirm: Function
});
const emit = defineEmits(['update:selectedValue']);

const options = ['all', 'complete', 'uncomplete'];
</script>

<style lang="scss" scoped></style>
