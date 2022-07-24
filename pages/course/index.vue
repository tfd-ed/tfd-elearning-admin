<template>
  <div>
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-row justify-between">
          <h1 class="text-3xl font-bold text-gray-900">{{ $t("course") }}</h1>
          <label for="newCourseModal" class="m-1">
            <ShadowButton text="new_course" color="bg-red-600" />
          </label>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <TableTemplate
          :columns="columns"
          :rows="courses"
          :total-record="totalRecord"
          @loaded="fetchCourses"
          @onSelectedRowChanged="onSelected"
        >
          <template #default="slotProps">
            <div v-for="(prop, index) in slotProps" :key="index">
              <div v-if="prop.column.field === 'createdDate'">
                {{ $moment(prop.row.createdDate).format("YYYY-MM-DD") }}
              </div>
              <div v-else-if="prop.column.field === 'title'">
                <nuxt-link :to="localePath(`/course/${prop.row.id}`)">
                  <p class="font-semibold hover:underline">
                    {{ prop.row.title }}
                  </p>
                </nuxt-link>
              </div>
              <div v-else-if="prop.column.field === 'instructor'">
                <nuxt-link
                  :to="localePath(`/instructor/${prop.row.instructor.id}`)"
                >
                  <p class="font-semibold hover:underline">
                    {{ prop.row.instructor.name }}
                  </p>
                </nuxt-link>
              </div>
              <div v-else-if="prop.column.field === 'price'">
                <p class="font-semibold text-red-600">
                  ${{
                    $i18n.locale === "km"
                      ? $convertKhmerNumber(prop.row.price)
                      : prop.row.price
                  }}
                </p>
              </div>
              <div v-else-if="prop.column.field === 'status'">
                <span
                  class="flex items-center justify-center w-full space-x-1.5 rounded-full border-2 px-3 py-1 text-xs font-medium text-gray-800"
                  :class="
                    prop.row.status === 'PUBLISHED'
                      ? 'border-green-500'
                      : 'animate-pulse border-yellow-400'
                  "
                >
                  <span
                    class="-ml-0.5 h-2 w-2 shrink-0 rounded-full"
                    :class="
                      prop.row.status === 'PUBLISHED'
                        ? 'bg-green-600 border-green-500'
                        : 'bg-yellow-500 border-green-400'
                    "
                  ></span>
                  <span class="capitalize">{{
                    $t(prop.row.status.toString().toLowerCase())
                  }}</span>
                </span>
              </div>
              <div v-else-if="prop.column.field === 'purchases'">
                <p class="font-semibold text-blue-600">
                  {{
                    $i18n.locale === "km"
                      ? $convertKhmerNumber(prop.row.purchases)
                      : prop.row.purchases
                  }}
                </p>
              </div>
              <span v-else>
                {{ prop.formattedRow[prop.column.field] }}
              </span>
            </div>
          </template>
          <template #selected-row-actions>
            <ShadowButton
              class="m-1"
              text="approve"
              color="bg-blue-600"
              @onClick="onApproved"
            />
          </template>
        </TableTemplate>
      </div>
      <!-- /End replace -->
    </div>
    <NewCourseModal />
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import ShadowButton from "~/components/button/shadow-button";
import NewCourseModal from "~/components/modal/new-course-modal";
import TableTemplate from "@/components/table/table-template";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "course/getField",
  mutationType: "course/updateField",
});
export default {
  components: { TableTemplate, NewCourseModal, ShadowButton },
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
          label: this.$i18n.t("title"),
          field: "title",
          sortable: true,
          filterOptions: {
            enabled: true, // enable filter for this column
            trigger: "",
          },
        },
        {
          label: this.$i18n.t("instructor"),
          field: "instructor",
          sortable: false,
        },
        {
          label: this.$i18n.t("price"),
          field: "price",
          sortable: true,
        },
        {
          label: this.$i18n.t("status"),
          field: "status",
          sortable: true,
        },
        {
          label: this.$i18n.t("purchases"),
          field: "purchases",
          sortable: false,
        },
        {
          label: this.$i18n.t("created"),
          field: "createdDate",
          sortable: true,
        },
      ],
      selected: [],
    };
  },
  computed: {
    ...mapFields(["courses", "totalRecord"]),
  },
  methods: {
    ...mapActions({
      fetchCourses: "course/fetchCourses",
    }),
    ...mapMutations({
      publishCourse: "course/PUBLISHED_COURSE",
    }),
    onSelected(param) {
      this.selected = param.selectedRows;
    },
    async onApproved() {
      for (const select of this.selected) {
        try {
          const result = await this.$axios.$patch(
            `${this.$api.courses}/${select.id}`,
            {
              status: "PUBLISHED",
            }
          );
          this.publishCourse(select.id);
          this.$toast.success(select.title + ": " + this.$i18n.t("approve"), {
            duration: 3000,
          });
        } catch (e) {
          this.$toast.error(e.response.data.message, {
            duration: 3000,
          });
        }
      }
    },
  },
};
</script>
