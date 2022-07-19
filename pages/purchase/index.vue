<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-row justify-between">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ $t("purchases") }}
          </h1>
          <div class="order-last">
            <label for="newPurchaseModal" class="m-1">
              <ShadowButton text="New Purchase" color="bg-red-600" />
            </label>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <TableTemplate
            :columns="columns"
            :rows="purchases"
            :total-record="totalRecord"
            @loaded="fetchPurchases"
            @onSelectedRowChanged="onSelected"
          >
            <template #default="props">
              <div v-for="(prop, index) in props" :key="index">
                <div v-if="prop.column.field === 'createdDate'">
                  {{ $moment(prop.row.createdDate).format("YYYY-MM-DD") }}
                </div>
                <div v-else-if="prop.column.field === 'course'">
                  <nuxt-link :to="`/course/${prop.row.course.id}`">
                    <p class="font-semibold hover:underline">
                      {{ prop.row.course.title }}
                    </p>
                  </nuxt-link>
                </div>
                <div v-else-if="prop.column.field === 'price'">
                  <p class="font-semibold text-red-600">
                    ${{ prop.row.price }}
                  </p>
                </div>
                <div v-else-if="prop.column.field === 'byUser'">
                  <nuxt-link :to="`/user/${prop.row.byUser.id}`">
                    <p class="font-semibold hover:underline">
                      {{ prop.row.byUser.username }}
                    </p>
                  </nuxt-link>
                </div>
                <span v-else>
                  {{ prop.formattedRow[prop.column.field] }}
                </span>
              </div>
            </template>
            <template #selected-row-actions>
              <ShadowButton
                class="m-1"
                text="Approve"
                color="bg-blue-600"
                @onClick="onApproved"
              />
            </template>
          </TableTemplate>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { createHelpers } from "vuex-map-fields";
import { PurchaseColumn } from "static/table-columns/purchase";
import ShadowButton from "@/components/button/shadow-button";
import TableTemplate from "@/components/table/table-template";
const { mapFields } = createHelpers({
  getterType: "purchase/getField",
  mutationType: "purchase/updateField",
});
export default {
  components: { TableTemplate, ShadowButton },
  layout: "home",
  data() {
    return {
      columns: PurchaseColumn,
      selected: [],
    };
  },
  computed: {
    ...mapFields(["purchases", "totalRecord"]),
  },
  methods: {
    ...mapActions({
      fetchPurchases: "purchase/fetchPurchases",
    }),
    ...mapMutations({
      verifyPurchase: "purchase/VERIFY_PURCHASE",
    }),
    onSelected(param) {
      this.selected = param.selectedRows;
    },
    async onApproved() {
      for (const select of this.selected) {
        try {
          const result = await this.$axios.$patch(`v1/purchase/${select.id}`, {
            status: "VERIFIED",
          });
          this.$toast.success(select.transaction + ": Approved", {
            duration: 3000,
          });
          this.verifyPurchase(select.id);
        } catch (e) {
          this.$toast.error(err.response.data.message, {
            duration: 3000,
          });
        }
      }
    },
  },
};
</script>
