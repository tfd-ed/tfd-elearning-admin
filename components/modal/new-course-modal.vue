<template>
  <ModalTemplate
    id="newCourseModal"
    title="Create New Course"
    :loading="loading"
    :loaded="loaded"
    :error="error"
  >
    <template #content>
      <ValidationObserver
        ref="create_form"
        v-slot="{ handleSubmit }"
        class="p-6"
      >
        <form
          method="post"
          class="space-y-4"
          @submit.prevent="handleSubmit(submitCourse)"
        >
          <SimpleValidatedInput
            id="course_name"
            v-model="title"
            name="course_name"
            label="course_name"
            rules="required"
            :auto-complete="false"
          />
          <CategorySelect
            id="course_category"
            v-model="category"
            name="course_category"
            label="course_category"
            rules="required"
          />

          <SimpleValidatedTextArea
            id="course_description"
            v-model="description"
            name="course_description"
            label="course_description"
            rules="required"
          />
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
            id="payment_link"
            v-model="paymentLink"
            name="payment_link"
            label="payment_link"
            rules="required"
          />

          <div class="mt-4">
            <button type="submit">
              <ShadowButton text="submit" color="bg-gray-700" />
            </button>
          </div>
        </form>
      </ValidationObserver>
    </template>
    <template #loaded> Your course is created! Let's add chapters </template>
  </ModalTemplate>
</template>
<script>
import { ValidationObserver } from "vee-validate";
import ModalTemplate from "~/components/modal/modal-template";
import ShadowButton from "@/components/button/shadow-button";
import SimpleValidatedInput from "@/components/input/simple-validated-input";
import SimpleValidatedTextArea from "@/components/input/simple-validated-text-area";
import CategorySelect from "@/components/input/category-select";
import "vue-select/dist/vue-select.css";
import { mapMutations } from "vuex";
import SimpleFileUpload from "@/components/input/simple-file-upload";
export default {
  components: {
    SimpleFileUpload,
    SimpleValidatedTextArea,
    ValidationObserver,
    SimpleValidatedInput,
    ShadowButton,
    ModalTemplate,
    CategorySelect,
  },
  data() {
    return {
      loading: false,
      loaded: false,
      error: false,
      title: "",
      description: "",
      price: "",
      instructor: "Smith.",
      category: "",
      paymentLink: "",
      thumbnail: "",
      chapters: [],
    };
  },
  methods: {
    ...mapMutations({
      addCourse: "course/ADD_COURSES",
    }),
    async submitCourse() {
      this.loading = true;
      try {
        /**
         * Create file
         */
        let formData = new FormData();
        formData.append("file", this.thumbnail, this.thumbnail.name);
        const file = await this.$axios.$post("/v1/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const course = await this.$axios.$post("/v1/course", {
          title: this.title,
          description: this.description,
          instructor: this.instructor,
          price: parseFloat(this.price),
          category: this.category.id,
          paymentLink: this.paymentLink,
          thumbnail: file.id,
        });
        console.log(course);
        this.loading = false;
        this.loaded = true;
        this.addCourse(course);
      } catch (e) {
        this.loading = false;
        console.log(e.response.data);
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
  },
};
</script>
