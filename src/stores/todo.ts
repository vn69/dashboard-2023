import { computed, reactive, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { Todo } from '../type/Todo';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

export const useTodoStore = defineStore('todo', () => {
    const confirm = useConfirm();
    const toast = useToast();
    const getRandomStringId = () => {
        return Date.now() + '';
    };

    const STORAGE_KEY = 'Todo-List-Test-Components-With-Piana';
    const todoList: Todo[] = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'));
    const inputValue = ref('');
    const selectedValue = ref('all');

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
    // watch todoList check
    watch(todoList, () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
    });

    // filter
    const filters = {
        all: (todos) => todos.filter((todo) => todo),
        uncomplete: (todos) => todos.filter((todo) => !todo.isDone),
        complete: (todos) => todos.filter((todo) => todo.isDone)
    };
    const remaining = computed<number>(() => filters['uncomplete'](todoList).length);

    const filteredTodos = computed<Todo[]>(() => {
        // console.log('filters::::', selectedValue.value);
        if (selectedValue.value == null) {
            return filters['all'](todoList);
        }
        return filters[selectedValue.value](todoList);
    });
    return { inputValue, selectedValue, todoList, addItem, remaining, filteredTodos, clearAllItemConfirm, removeItemConfirm };
});
