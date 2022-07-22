<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ $t("users") }}</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <TableTemplate
            :columns="columns"
            :rows="users"
            :total-record="totalRecord"
            @loaded="fetchUsers"
          >
            <template #default="props">
              <div v-for="(prop, index) in props" :key="index">
                <div v-if="prop.column.field === 'createdDate'">
                  {{ $moment(prop.row.createdDate).format("YYYY-MM-DD") }}
                </div>
                <div v-else-if="prop.column.field === 'status'">
                  <span
                    class="flex items-center justify-center w-full space-x-1.5 rounded-full border-2 px-3 py-1 text-xs font-medium text-gray-800"
                    :class="
                      prop.row.status === 'ACTIVE'
                        ? 'border-green-500'
                        : 'animate-pulse border-red-400'
                    "
                  >
                    <span
                      class="-ml-0.5 h-2 w-2 shrink-0 rounded-full"
                      :class="
                        prop.row.status === 'ACTIVE'
                          ? 'bg-green-600 border-green-500'
                          : 'bg-red-500 border-red-400'
                      "
                    ></span>
                    <span class="capitalize">{{
                      $t(prop.row.status.toString().toLowerCase())
                    }}</span>
                  </span>
                </div>

                <div v-else-if="prop.column.field === 'username'">
                  <nuxt-link :to="`/user/${prop.row.id}`">
                    <p class="font-semibold hover:underline">
                      {{ prop.row.username }}
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
  getterType: "user/getField",
  mutationType: "user/updateField",
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
          label: this.$i18n.t("username"),
          field: "username",
          sortable: true,
          filterOptions: {
            enabled: true,
            trigger: "",
          },
        },
        {
          label: this.$i18n.t("email"),
          field: "email",
          sortable: true,
          filterOptions: {
            enabled: true,
            trigger: "",
          },
        },
        {
          label: this.$i18n.t("purchases"),
          field: "purchases",
          sortable: false,
        },
        {
          label: this.$i18n.t("status"),
          field: "status",
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
    ...mapFields(["users", "totalRecord"]),
  },
  methods: {
    ...mapActions({
      fetchUsers: "user/fetchUsers",
    }),
  },
};
</script>
