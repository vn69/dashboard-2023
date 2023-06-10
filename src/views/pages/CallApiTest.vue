<script setup>
import useFetchApi from '@/composables/useFetchApi.js';
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qs from 'qs';

const { data, error, loading, fetchData } = useFetchApi();
const route = useRoute();
const router = useRouter();

const fetchProduct = (query) => {
    const paramString = qs.stringify(query);
    const url = `https://dummyjson.com/products?${paramString}`;
    fetchData(url);
};

const query = reactive({
    limit: 10,
    page: 0,
    skip: 0
});
if (route.query && route.query.page) {
    query.page = +route.query.page;
    query.limit = +route.query.limit;
    query.skip = +route.query.skip;
}
fetchProduct(query);

watch(
    () => query,
    () => {
        router.push({ path: route.path, query });
    },
    { deep: true, immediate: true }
);

const updateQ = (params) => {
    query.page = params.page;
    query.limit = params.rows;
    query.skip = params.first;
};

const changePage = (event) => {
    updateQ(event);
    fetchProduct(query);
};
</script>

<template>
    <div className="grid">
        <div className="col-12">
            <div className="card">
                <h5>Products</h5>
                <DataTable :value="data?.products" :loading="loading" tableStyle="min-width: 50rem">
                    <Column field="id" header="id"></Column>
                    <Column field="title" header="title"></Column>
                    <Column field="category" header="category"></Column>
                    <Column field="stock" header="stock"></Column>
                </DataTable>
                <Paginator :first="query.skip" :rows="query.limit" :totalRecords="data?.total" :rowsPerPageOptions="[10, 20, 30]" @page="changePage"></Paginator>
            </div>
        </div>
    </div>
</template>
