<template>
  <Dialog :visible="visible" modal header="Lô tô" :style="{ width: '700px' }" @update:visible="$emit('update:visible', false)">
      <div v-for="(item, index) in data" :key="index" class="mt-3">
        <span>Chọn số:</span>
        <InputNumber class="number-only" v-model="item.num" :min="0" :max="99" inputId="integeronly" />
        <span class="ml-3">Điểm:</span>
        <InputNumber class="number-only" v-model="item.point" :min="0" inputId="integeronly" />
        <span class="ml-3">Thành tiền: {{item.point*24000}}</span>
      </div>
      <div class="flex justify-content-center">
        <Button class="mt-2" label="Thêm" icon="pi pi-plus" @click="addMore"/>
      </div>
      <template #footer>
          <Button label="Đóng" icon="pi pi-times" @click="$emit('update:visible', false)" text />
          <Button label="Ok" icon="pi pi-check" @click="$emit('submit', data)"/>
      </template>
  </Dialog>
</template>

<script setup lang="ts">
import {selectNumber} from "./types"

import { ref } from "vue"
  const props = defineProps({
    visible: { type: Boolean, required: true },
  })
  const data = ref<selectNumber[]>([
    { num: null, point: 0 }
  ])
  const addMore = () => {
    data.value.push({ num: null, point: 0 })
  }

</script>

<style scoped>
</style>