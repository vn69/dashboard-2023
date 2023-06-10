<script setup lang="ts">
import TodoHeader2 from '@/components/TodoHeader2.vue';
import TodoFooter2 from '@/components/TodoFooter2.vue';
import TodoItem2 from '@/components/TodoItem2.vue';

import { useTodoStore } from '@/stores/todo';
const todoStore = useTodoStore();
</script>

<template>
    <div className="grid">
        <div className="col-12">
            <div className="card">
                <h5>Todo List 2</h5>
                <div class="col-12 md:col-6">
                    <TodoHeader2></TodoHeader2>

                    <div class="flex flex-column my-2">
                        <div v-for="item of todoStore.filteredTodos" :key="item.id" class="flex align-items-center">
                            <TodoItem2 :item="item" :removeItemConfirm="todoStore.removeItemConfirm"></TodoItem2>
                        </div>
                    </div>

                    <TodoFooter2></TodoFooter2>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
