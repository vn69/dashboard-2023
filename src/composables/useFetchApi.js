import { ref } from 'vue';

export default function useFetchApi() {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);

    async function fetchData(url) {
        loading.value = true;

        try {
            const response = await fetch(url);
            data.value = await response.json();
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    return {
        data,
        error,
        loading,
        fetchData
    };
}
