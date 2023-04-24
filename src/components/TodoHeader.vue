<template>
    <div class="p-inputgroup">
        <InputText placeholder="enter job" :value="jobName" @input="$emit('update:jobName', $event.target.value)" @keypress.enter="$emit('addItemEmit')" />
        <Button @click="$emit('addItemEmit')" :disabled="!jobName" icon="pi pi-plus" severity="success" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    jobName: String
});
</script>

<style scoped></style>
