<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ $t("instructor") }}</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <TableTemplate
            :columns="columns"
            :rows="instructors"
            :total-record="totalRecord"
            @loaded="fetchInstructors"
          >
            <template #default="props">
              <div v-for="(prop, index) in props" :key="index">
                <div v-if="prop.column.field === 'createdDate'">
                  {{ $moment(prop.row.createdDate).format("YYYY-MM-DD") }}
                </div>

                <div v-else-if="prop.column.field === 'dateOfBirth'">
                  {{ $moment(prop.row.dateOfBirth).format("YYYY-MM-DD") }}
                </div>

                <div v-else-if="prop.column.field === 'name'">
                  <nuxt-link :to="localePath(`/instructor/${prop.row.id}`)">
                    <p class="font-semibold hover:underline">
                      {{ prop.row.name }}
                    </p>
                  </nuxt-link>
                </div>
                <span v-else>
                  {{ prop.formattedRow[prop.column.field] }}
                </span>
              </div>
            </template>
          </TableTemplate>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>
<script>
import TableTemplate from "@/components/table/table-template";
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";
const { mapFields } = createHelpers({
  getterType: "instructor/getField",
  mutationType: "instructor/updateField",
});
export default {
  components: { TableTemplate },
  layout: "home",
  middleware: "auth",
  data() {
    return {
      columns: [
        {
          field: "id",
          hidden: true,
        },
        {
          label: this.$i18n.t("name"),
          field: "name",
          sortable: true,
          filterOptions: {
            enabled: true,
            trigger: "",
          },
        },
        {
          label: this.$i18n.t("courses"),
          field: "courses",
          sortable: false,
        },
        {
          label: this.$i18n.t("dateOfBirth"),
          field: "dateOfBirth",
          sortable: true,
        },
        {
          label: this.$i18n.t("created"),
          field: "createdDate",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapFields(["instructors", "totalRecord"]),
  },
  methods: {
    ...mapActions({
      fetchInstructors: "instructor/fetchInstructors",
    }),
  },
};
</script>
