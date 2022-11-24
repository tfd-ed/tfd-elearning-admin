<template>
  <ModalTemplate
    id="newCourseModal"
    title="Create New Course"
    :loading="loading"
    :loaded="loaded"
    :error="error"
  >
    <template #content>
      <div>
        <h2
          class="mt-6 text-center text-xl md:text-3xl font-bold text-black capitalize leading-relaxed"
        >
          {{ $t("new_course") }}
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
          <SimpleSelectLocal
            id="course_type"
            v-model="type"
            name="course_type"
            label="course_type"
            rules="required"
            :options="options"
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
              :disabled="type === 'FREE'"
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
import { ValidationObserver } from "vee-validate";
import ModalTemplate from "~/components/modals/modal-template";
import ShadowButton from "@/components/buttons/shadow-button";
import SimpleValidatedInput from "@/components/inputs/simple-validated-input";
import SimpleValidatedTextArea from "@/components/inputs/simple-validated-text-area";
import SimpleSelect from "@/components/inputs/simple-select";
import { mapMutations } from "vuex";
import SimpleFileUpload from "@/components/inputs/simple-file-upload";
import ValidatedRichTextArea from "@/components/inputs/validated-rich-text-area";
import SimpleSelectLocal from "@/components/inputs/simple-select-local";
import { CourseEnum } from "static/enums/course-enum";
export default {
  components: {
    SimpleSelectLocal,
    ValidatedRichTextArea,
    SimpleFileUpload,
    SimpleValidatedTextArea,
    ValidationObserver,
    SimpleValidatedInput,
    ShadowButton,
    ModalTemplate,
    SimpleSelect,
  },
  data() {
    return {
      loading: false,
      loaded: false,
      error: false,
      title: "",
      description: "",
      shortDescription: "",
      price: 0.0,
      category: "",
      instructor: "",
      paymentLink: "",
      promotional: "",
      thumbnail: "",
      type: "",
      chapters: [],
      options: CourseEnum,
      customToolbar: [
        [
          {
            header: [false, 1, 2, 3, 4, 5, 6],
          },
        ],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          {
            align: "",
          },
          {
            align: "center",
          },
          {
            align: "right",
          },
          {
            align: "justify",
          },
        ],
        ["blockquote", "code-block"],
        [
          {
            list: "ordered",
          },
          {
            list: "bullet",
          },
          {
            list: "check",
          },
        ],
        [
          {
            indent: "-1",
          },
          {
            indent: "+1",
          },
        ], // outdent/indent
        [
          {
            color: [],
          },
          {
            background: [],
          },
        ], // dropdown with defaults from theme
        ["link"],
        ["clean"], // remove formatting button
      ],
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
        let blob = await fetch(this.thumbnail.src).then((r) => r.blob());
        formData.append("file", blob, this.thumbnail.name);
        const file = await this.$axios.$post("/v1/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        /**
         * Release Object URL
         */
        URL.revokeObjectURL(this.thumbnail.src);

        const course = await this.$axios.$post(this.$api.courses, {
          title: this.title,
          description: this.description,
          shortDescription: this.shortDescription,
          price: parseFloat(this.price),
          category: this.category.id,
          type: this.type,
          instructor: this.instructor.id,
          paymentLink: this.paymentLink,
          promotionalVimeoLink: this.promotional,
          thumbnail: file.id,
        });
        this.loading = false;
        this.loaded = true;
        this.addCourse(course);
        await this.$router.push(this.localePath(`/course/${course.id}`));
      } catch (e) {
        this.loading = false;

        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
  },
};
</script>
