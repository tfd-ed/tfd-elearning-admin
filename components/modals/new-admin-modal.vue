<template>
  <ModalTemplate
    id="newAdminModal"
    title="Create New Admin"
    :loading="loading"
    :loaded="loaded"
    :error="error"
  >
    <template #content>
      <div>
        <h2
          class="mt-6 text-center text-xl md:text-3xl font-bold text-black capitalize leading-relaxed"
        >
          {{ $t("new_admin") }}
        </h2>
      </div>
      <ValidationObserver
        ref="create_form"
        v-slot="{ handleSubmit }"
        class="p-6"
      >
        <form
          method="post"
          class="space-y-4"
          @submit.prevent="handleSubmit(submitAdmin)"
        >
          <SimpleValidatedInput
            id="admin_name"
            v-model="title"
            name="course_name"
            label="course_name"
            rules="required"
            :auto-complete="false"
          />
          <SimpleSelect
            id="course_category"
            v-model="category"
            name="course_category"
            label="course_category"
            route="categories"
            rules="required"
          />

          <SimpleSelect
            id="course_instructor"
            v-model="instructor"
            name="course_instructor"
            route="instructors"
            label="instructor"
            rules="required"
          />

          <SimpleValidatedTextArea
            id="short_course_description"
            v-model="shortDescription"
            name="short_course_description"
            label="short_course_description"
            rules="required"
          />
          <ValidatedRichTextArea
            id="course_description"
            v-model="description"
            name="course_description"
            label="course_description"
            rules="required"
          />
          <!--          <client-only>-->
          <!--            <VueEditor-->
          <!--              v-model="description"-->
          <!--              :editor-toolbar="customToolbar"-->
          <!--              class="mt-1 border-gray-200 rounded-lg"-->
          <!--            />-->
          <!--          </client-only>-->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SimpleValidatedInput
              id="course_price"
              v-model="price"
              name="course_price"
              label="course_price"
              rules="required|double"
            />
            <SimpleFileUpload
              id="course_tb"
              v-model="thumbnail"
              name="course_tb"
              label="course_tb"
              rules="required|mimes:image/jpeg,image/png,image/jpg|size:3000"
            />
          </div>

          <SimpleValidatedInput
            id="promotional_vimeo_link"
            v-model="promotional"
            name="promotional_vimeo_link"
            label="promotional_vimeo_link"
            rules="required"
          />

          <SimpleValidatedInput
            id="payment_link"
            v-model="paymentLink"
            name="payment_link"
            label="payment_link"
            rules="required"
          />

          <div class="mt-4 flex flex-row justify-center">
            <button type="submit">
              <ShadowButton text="submit" color="bg-gray-700" />
            </button>
          </div>
        </form>
      </ValidationObserver>
    </template>
  </ModalTemplate>
</template>
<script>
import ModalTemplate from "@/components/modals/modal-template";
import { ValidationObserver } from "vee-validate";
import SimpleValidatedInput from "@/components/inputs/simple-validated-input";
import SimpleSelect from "@/components/inputs/simple-select";
export default {
  components: {
    SimpleSelect,
    SimpleValidatedInput,
    ValidationObserver,
    ModalTemplate,
  },
  data() {
    return {
      loading: false,
      loaded: false,
      error: false,
    };
  },
  methods: {
    async submitAdmin() {},
  },
};
</script>
