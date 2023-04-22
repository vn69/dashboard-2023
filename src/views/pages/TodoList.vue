<template>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    <div className="grid">
        <div className="col-12">
            <div className="card">
                <h5>Todo List</h5>
                <div class="col-12 md:col-6">
                    <div class="p-inputgroup">
                        <InputText placeholder="enter job" v-model="inputValue" />
                        <Button @click="addItem" :disabled="!inputValue" icon="pi pi-plus" severity="success" />
                    </div>

                    <div class="flex flex-column my-2">
                        <div v-for="item of filteredTodos" :key="item.id" class="flex align-items-center">
                            <Checkbox v-model="item.isDone" :inputId="item.id" :binary="true" />
                            <label class="mx-2" :for="item.id" :class="[item.isDone && 'line-through']">{{ item.name }}</label>
                            <Button :disabled="!item.isDone" @click="removeItemConfirm($event, item.id)" icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" />
                        </div>
                    </div>

                    <div v-if="todoList.length" class="flex align-items-center">
                        <Chip v-if="remaining > 0" :label="remaining + ' item left'" />
                        <SelectButton class="mx-2" v-model="selectedValue" :options="options" aria-labelledby="basic" />
                        <Button :disabled="todoList.length === remaining" @click="clearAllItemConfirm($event)" severity="danger"> Clear</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
const confirm = useConfirm();
const toast = useToast();
const getRandomStringId = () => {
    return Date.now() + '';
};
const STORAGE_KEY = 'Todo-List-Test';
const todoList = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []);
const inputValue = ref('');
const selectedValue = ref(null);
const options = ref(['all', 'complete', 'uncomplete']);

// handel
const addItem = () => {
    const name = inputValue.value.trim();
    if (name === '') return;
    todoList.push({ name, id: getRandomStringId(), isDone: false });
    toast.add({ severity: 'success', summary: 'Success', detail: 'Job is added.', life: 3000 });
    inputValue.value = '';
};

const removeItem = (id) => {
    const index = todoList.findIndex((e) => e.id === id);
    index > -1 && todoList.splice(index, 1);
};

const removeItemConfirm = (event, id) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
            removeItem(id);
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const clearAllItem = () => {
    const todoNotDone = filters['uncomplete'](todoList);
    todoList.length = 0;
    todoList.push(...todoNotDone);
};

const clearAllItemConfirm = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
            clearAllItem();
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'All Done Job is deleted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
// watch todoList
watch(todoList, () => {
    // console.log({ todoList });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
});

// filter
const filters = {
    all: (todos) => todos.filter((todo) => todo),
    uncomplete: (todos) => todos.filter((todo) => !todo.isDone),
    complete: (todos) => todos.filter((todo) => todo.isDone)
};
const remaining = computed(() => filters['uncomplete'](todoList).length);

const filteredTodos = computed(() => {
    // console.log('filters::::', selectedValue.value);
    if (selectedValue.value == null) {
        return filters['all'](todoList);
    }
    return filters[selectedValue.value](todoList);
});
</script>

<style lang="scss" scoped></style>
