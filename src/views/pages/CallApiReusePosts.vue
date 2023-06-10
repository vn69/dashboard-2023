<script setup>
import useFetchApi from '@/composables/useFetchApi.js';
import useQuery from '@/composables/useQuery.js';
import qs from 'qs';

const { data, error, loading, fetchData } = useFetchApi();

const fetchProduct = (query) => {
    const paramString = qs.stringify(query);
    const url = `https://dummyjson.com/posts?${paramString}`;
    fetchData(url);
};

const { query } = useQuery({ limit: 10, page: 0, skip: 0 });
fetchProduct(query);

const changePage = (event) => {
    query.page = event.page;
    query.limit = event.rows;
    query.skip = event.first;
    fetchProduct(query);
};
</script>

<template>
    <div className="grid">
        <div className="col-12">
            <div className="card">
                <h5>Products</h5>
                <DataTable :value="data?.posts" :loading="loading" tableStyle="min-width: 50rem">
                    <Column field="id" header="id"></Column>
                    <Column field="title" header="title"></Column>
                    <Column field="body" header="body"></Column>
                    <Column field="reactions" header="reactions"></Column>
                </DataTable>
                <Paginator :first="data?.skip" :rows="+query?.limit" :totalRecords="data?.total" :rowsPerPageOptions="[10, 20, 30]" @page="changePage"></Paginator>
            </div>
        </div>
    </div>
</template>
