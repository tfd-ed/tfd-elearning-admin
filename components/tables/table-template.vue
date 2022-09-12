<template>
  <vue-good-table
    mode="remote"
    :line-numbers="true"
    :is-loading.sync="isLoading"
    theme="polar-bear"
    style-class="vgt-table condensed"
    :columns="columns"
    :rows="rows"
    :total-rows="totalRecord"
    :pagination-options="{
      enabled: true,
      position: 'bottom',
      dropdownAllowAll: false,
      perPageDropdown: [10, 20, 30, 40, 50, 100],
      nextLabel: $t('next'),
      prevLabel: $t('prev'),
      rowsPerPageLabel: $t('row_per_page'),
      ofLabel: $t('of'),
      pageLabel: $t('page'), // for 'pages' mode
      allLabel: $t('all'),
    }"
    :sort-options="{
      enabled: true,
      initialSortBy: { field: 'createdDate', type: 'desc' },
    }"
    :select-options="{ enabled: true }"
    @on-page-change="onPageChange"
    @on-sort-change="onSortChange"
    @on-column-filter="onColumnFilter"
    @on-per-page-change="onPerPageChange"
    @on-selected-rows-change="OnSelectedRowChanged"
  >
    <template #table-row="props">
      <slot :props="props" />
    </template>
    <template #loadingContent>
      <div
        class="flex flex-row justify-center w-3/4 md:w-2/5 mx-auto rounded-lg rounded-t-none"
      >
        <GeneralLoading text="loading" />
      </div>
    </template>
    <template #selected-row-actions>
      <slot name="selected-row-actions"></slot>
    </template>
  </vue-good-table>
</template>
<script>
import GeneralLoading from "@/components/loadings/general-loading";
export default {
  components: { GeneralLoading },
  props: {
    columns: {
      type: Object,
      default() {
        return {};
      },
    },
    rows: {
      type: Object,
      default() {
        return {};
      },
    },
    totalRecord: {
      type: Number,
      default: 0,
    },
  },
  emits: ["loaded", "onSelectedRowChanged"],
  data() {
    return {
      isLoading: false,
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        columnFilters: {},
        sort: [
          {
            field: "", // example: 'name'
            type: "", // 'asc' or 'desc'
          },
        ],

        page: 1, // what page I want to show
        perPage: 10, // how many items I'm showing per page
      },
    };
  },
  methods: {
    loadItems() {
      this.isLoading = true;
      this.$emit("loaded", { params: this.serverParams });
      this.isLoading = false;
    },
    OnSelectedRowChanged(param) {
      this.$emit("onSelectedRowChanged", param);
    },
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage });
      this.loadItems();
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage });
      this.loadItems();
    },

    onSortChange(params) {
      //console.log(this.columns[params.columnIndex]);
      // console.log(params[0]);
      this.updateParams({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      });
      this.loadItems();
    },

    onColumnFilter(params) {
      this.updateParams(params);
      this.loadItems();
    },
  },
};
</script>
