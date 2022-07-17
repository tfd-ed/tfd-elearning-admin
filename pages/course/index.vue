<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Course</h1>
      </div>
    </header>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <client-only>
          <vue-good-table
            mode="remote"
            :line-numbers="true"
            :is-loading.sync="isLoading"
            theme="polar-bear"
            style-class="vgt-table condensed"
            :columns="columns"
            :rows="courses"
            :total-rows="totalRecord"
            :pagination-options="{
              enabled: true,
              position: 'bottom',
              dropdownAllowAll: false,
              perPageDropdown: [10, 20, 30, 40, 50, 100],
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
          >
            <template slot="table-row" slot-scope="props">
              <div v-if="props.column.field === 'createdDate'">
                {{ $moment(props.row.createdDate).format("YYYY-MM-DD") }}
              </div>
              <div v-else-if="props.column.field === 'title'">
                <nuxt-link :to="`/course/${props.row.id}`">
                  <p class="font-semibold hover:underline">
                    {{ props.row.title }}
                  </p>
                </nuxt-link>
              </div>
              <div v-else-if="props.column.field === 'price'">
                <p class="font-semibold text-red-600">${{ props.row.price }}</p>
              </div>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
            <template slot="loadingContent">
              <div
                class="flex flex-row justify-center w-3/4 md:w-2/5 mx-auto rounded-lg rounded-t-none"
              >
                <GeneralLoading text="loading" />
              </div>
            </template>
          </vue-good-table>
        </client-only>
      </div>
      <!-- /End replace -->
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { CourseColumn } from "@/static/table-columns/course";
import { createHelpers } from "vuex-map-fields";
import GeneralLoading from "~/components/loading/general-loading";
const { mapFields } = createHelpers({
  getterType: "course/getField",
  mutationType: "course/updateField",
});
export default {
  components: { GeneralLoading },
  layout: "home",
  data() {
    return {
      isLoading: false,
      columns: CourseColumn,
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
  computed: {
    ...mapFields(["courses", "totalRecord"]),
  },
  methods: {
    ...mapActions({
      fetchCourses: "course/fetchCourses",
    }),
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

    // load items is what brings back the rows from server
    async loadItems() {
      this.isLoading = true;
      await this.fetchCourses({ params: this.serverParams });
      this.isLoading = false;
      // getFromServer(this.serverParams).then((response) => {
      //   this.totalRecords = response.totalRecords;
      //   this.rows = response.rows;
      // });
    },
  },
};
</script>
