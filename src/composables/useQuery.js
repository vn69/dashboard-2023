import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default function useQuery(initData) {
    const route = useRoute();
    const router = useRouter();
    const query = reactive(initData);
    if (route.query && route.query.page) {
        Object.assign(query, route.query);
    }
    watch(
        () => query,
        () => {
            router.push({ path: route.path, query });
        },
        { deep: true, immediate: true }
    );

    return {
        query
    };
}
