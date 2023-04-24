<template>
    <Checkbox v-model="item.isDone" :inputId="item.id" :binary="true" />
    <label class="mx-2" :for="item.id" :class="[item.isDone && 'line-through']">{{ item.name }}</label>
    <Button :disabled="!item.isDone" @click="removeItemConfirm($event, item.id)" icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" />
</template>

<script setup lang="ts">
const props = defineProps({
    item: Object,
    removeItemConfirm: Function
});
</script>

<style lang="scss" scoped></style>
